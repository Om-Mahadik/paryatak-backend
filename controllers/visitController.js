const Visit = require("../models/Visit");

// ---------------------------
// Log a new visit
// ---------------------------
exports.addVisit = async (req, res) => {
  try {
    // Get visitor IP (works behind proxies too)
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // Only create a new visit if none exists from this IP in last 30 seconds (for testing)
    const thirtySecondsAgo = new Date(Date.now() - 30 * 1000);

    const existingVisit = await Visit.findOne({
      ip,
      createdAt: { $gte: thirtySecondsAgo }
    });

    if (!existingVisit) {
      await Visit.create({ ip }); // now cooldown is 30 sec
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

    // Live visitors: last 30 seconds (for testing)
    const thirtySecondsAgo = new Date(now.getTime() - 30 * 1000);
    const liveCount = await Visit.countDocuments({ createdAt: { $gte: thirtySecondsAgo } });

    // Today
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayCount = await Visit.countDocuments({ createdAt: { $gte: startOfDay } });

    // This week (Monday start)
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Monday
    startOfWeek.setHours(0, 0, 0, 0);
    const weekCount = await Visit.countDocuments({ createdAt: { $gte: startOfWeek } });

    // This month
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthCount = await Visit.countDocuments({ createdAt: { $gte: startOfMonth } });

    res.status(200).json({ liveCount, todayCount, weekCount, monthCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch stats" });
  }
};
