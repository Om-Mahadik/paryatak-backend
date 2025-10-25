// models/Visit.js
const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
  ip: { type: String, required: true }, // store visitor IP
  createdAt: { type: Date, default: Date.now, index: { expires: 300 } }, // TTL: 5 minutes
});

// Optional: ensure index exists in DB
visitSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

module.exports = mongoose.model("Visit", visitSchema);
