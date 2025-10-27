const CustomPackage = require("../models/CustomPackage");

// ✅ Create a new custom package request
const createRequest = async (req, res) => {
  try {
    const request = new CustomPackage(req.body);
    await request.save();
    res.status(201).json({ success: true, message: "Request submitted successfully!" });
  } catch (err) {
    console.error("Error creating custom package:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Get all requests (for admin panel)
const getAllRequests = async (req, res) => {
  try {
    const requests = await CustomPackage.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    console.error("Error fetching requests:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Mark as read
const markAsRead = async (req, res) => {
  try {
    const request = await CustomPackage.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!request) return res.status(404).json({ message: "Request not found" });
    res.json({ success: true, message: "Marked as read", request });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Mark as unread
const markAsUnread = async (req, res) => {
  try {
    const request = await CustomPackage.findByIdAndUpdate(
      req.params.id,
      { isRead: false },
      { new: true }
    );
    if (!request) return res.status(404).json({ message: "Request not found" });
    res.json({ success: true, message: "Marked as unread", request });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  createRequest,
  getAllRequests,
  markAsRead,
  markAsUnread,
};
