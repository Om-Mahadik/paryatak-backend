// models/Popup.js
const mongoose = require("mongoose");

const popupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true } // automatically adds createdAt & updatedAt
);

module.exports = mongoose.model("Popup", popupSchema);
