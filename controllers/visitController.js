const Visit = require("../models/Visit");
const DailyStat = require("../models/DailyStat");

// ---------------------------
// Log a new visit
// ---------------------------
exports.addVisit = async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // Only create a new visit if none exists from this IP in last 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const existingVisit = await Visit.findOne({
      ip,
      createdAt: { $gte: fiveMinutesAgo },
    });

    if (!existingVisit) {
      await Visit.create({ ip });

      // Update DailyStat for today
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const dailyStat = await DailyStat.findOneAndUpdate(
        { date: today },
        { $inc: { visits: 1 } },
        { upsert: true, new: true }
      );

      return res.status(201).json({ success: true, message: "Visit logged" });
    }

    res.status(200).json({ success: true, message: "Visit already counted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to log visit" });
  }
};

// ---------------------------
// Fetch stats: live, today, week, month
// ---------------------------
exports.getStats = async (req, res) => {
  try {
    const now = new Date();

    // Live visitors: last 30 seconds
    const thirtySecondsAgo = new Date(now.getTime() - 30 * 1000);
    const liveCount = await Visit.countDocuments({ createdAt: { $gte: thirtySecondsAgo } });

    // Today
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayDoc = await DailyStat.findOne({ date: startOfDay });
    const todayCount = todayDoc ? todayDoc.visits : 0;

    // This week (Monday start)
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + 1);
    startOfWeek.setHours(0, 0, 0, 0);
    const weekStats = await DailyStat.find({ date: { $gte: startOfWeek } });
    const weekCount = weekStats.reduce((sum, doc) => sum + doc.visits, 0);

    // This month
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthStats = await DailyStat.find({ date: { $gte: startOfMonth } });
    const monthCount = monthStats.reduce((sum, doc) => sum + doc.visits, 0);

    res.status(200).json({ liveCount, todayCount, weekCount, monthCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch stats" });
  }
};
