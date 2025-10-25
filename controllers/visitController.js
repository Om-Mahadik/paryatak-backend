const Visit = require("../models/Visit");

// Log a new visit
exports.addVisit = async (req, res) => {
  try {
    const visit = await Visit.create({ ip: req.ip });
    res.status(201).json({ success: true, visit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to log visit" });
  }
};

// Get visit stats
exports.getStats = async (req, res) => {
  try {
    const now = new Date();

    // Today
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayCount = await Visit.countDocuments({ createdAt: { $gte: startOfDay } });

    // This week (Monday start)
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + 1);
    startOfWeek.setHours(0, 0, 0, 0);
    const weekCount = await Visit.countDocuments({ createdAt: { $gte: startOfWeek } });

    // This month
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthCount = await Visit.countDocuments({ createdAt: { $gte: startOfMonth } });

    // Live visitors (last 5 mins)
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    const liveCount = await Visit.countDocuments({ createdAt: { $gte: fiveMinutesAgo } });

    res.status(200).json({ liveCount, todayCount, weekCount, monthCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch stats" });
  }
};
