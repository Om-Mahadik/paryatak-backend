// models/Visit.js
const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
  ip: String, // optional, or userId if logged in
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Visit", visitSchema);
