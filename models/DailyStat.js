const mongoose = require("mongoose");

const DailyStatSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true }, // store as "2025-10-25"
  visits: { type: Number, default: 0 },
});

module.exports = mongoose.model("DailyStat", DailyStatSchema);
