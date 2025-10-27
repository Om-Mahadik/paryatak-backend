const mongoose = require("mongoose");

const customPackageSchema = new mongoose.Schema(
  {
    destination: { type: String, required: true },
    adults: { type: Number, required: true },
    children: { type: Number, default: 0 },
    duration: { type: String, required: true },
    startDate: { type: Date, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    message: { type: String },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CustomPackage", customPackageSchema);
