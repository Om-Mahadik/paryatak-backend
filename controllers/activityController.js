// controllers/activityController.js
const Popup = require("../models/Popup");
const Contact = require("../models/Contact");
const Review = require("../models/Review");

exports.getTodaysActivity = async (req, res) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    // Count today's entries
    const popups = await Popup.countDocuments({ createdAt: { $gte: startOfToday } });
    const contacts = await Contact.countDocuments({ createdAt: { $gte: startOfToday } });
    const reviews = await Review.countDocuments({ createdAt: { $gte: startOfToday } });

    res.json({ popups, contacts, reviews });
  } catch (err) {
    console.error("Error fetching today's activity:", err);
    res.status(500).json({ message: "Server error fetching today's activity" });
  }
};
