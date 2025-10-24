const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  comment: { type: String, required: true },
  package: { type: mongoose.Schema.Types.ObjectId, ref: "Package", default: null }, // null = overall review
  status: { type: String, enum: ["pending", "approved", "deleted"], default: "pending" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", reviewSchema);
