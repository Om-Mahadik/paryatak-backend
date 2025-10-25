const mongoose = require("mongoose");

const DailyStatSchema = new mongoose.Schema({
  date: { type: Date, required: true, unique: true },
  visits: { type: Number, default: 0 },
});

module.exports = mongoose.model("DailyStat", DailyStatSchema);
