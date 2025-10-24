// controllers/contactController.js
const Contact = require("../models/Contact");

// Create a new contact entry
exports.createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;
    const contact = await Contact.create({ firstName, lastName, email, phone, message });
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ message: "Failed to create contact", error: err.message });
  }
};

// Get all contacts
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch contacts", error: err.message });
  }
};

// Mark contact as read/unread
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const { isRead } = req.body; // expects true/false
    const contact = await Contact.findByIdAndUpdate(id, { isRead }, { new: true });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: "Failed to update contact", error: err.message });
  }
};

// Delete a contact
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    res.json({ message: "Contact deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete contact", error: err.message });
  }
};
