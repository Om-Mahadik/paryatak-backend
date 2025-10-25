const mongoose = require("mongoose");

const DailyStatSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true }, // "YYYY-MM-DD"
  visits: { type: Number, default: 0 },
});

module.exports = mongoose.model("DailyStat", DailyStatSchema);
