import Popup from "../models/Popup.js";

// Create popup
export const createPopup = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const popup = await Popup.create({ name, phone });
    res.status(201).json(popup);
  } catch (err) {
    res.status(500).json({ message: "Failed to create popup", error: err.message });
  }
};

// Get all popups
export const getPopups = async (req, res) => {
  try {
    const popups = await Popup.find().sort({ createdAt: -1 });
    res.json(popups);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch popups", error: err.message });
  }
};

// Mark as read/unread
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const { isRead } = req.body; // true/false
    const popup = await Popup.findByIdAndUpdate(id, { isRead }, { new: true });
    res.json(popup);
  } catch (err) {
    res.status(500).json({ message: "Failed to update read status", error: err.message });
  }
};

// Delete popup
export const deletePopup = async (req, res) => {
  try {
    const { id } = req.params;
    await Popup.findByIdAndDelete(id);
    res.json({ message: "Popup deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete popup", error: err.message });
  }
};
