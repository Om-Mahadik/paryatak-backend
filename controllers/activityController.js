const Popup = require("../models/Popup");
const Contact = require("../models/Contact");
const Review = require("../models/Review");

exports.getTodaysActivity = async (req, res) => {
  try {
    // Start of today (midnight)
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    // Count documents created today
    const [popupsCount, contactsCount, reviewsCount] = await Promise.all([
      Popup.countDocuments({ createdAt: { $gte: startOfToday } }),
      Contact.countDocuments({ createdAt: { $gte: startOfToday } }),
      Review.countDocuments({ createdAt: { $gte: startOfToday } })
    ]);

    res.json({
      popupsSubmitted: popupsCount,
      peopleContacted: contactsCount,
      reviewsReceived: reviewsCount
    });
  } catch (err) {
    console.error("Error fetching today's activity:", err);
    res.status(500).json({ message: "Server error fetching today's activity" });
  }
};
