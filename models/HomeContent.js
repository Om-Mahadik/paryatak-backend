const mongoose = require("mongoose");

const homeContentSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  headline: { type: String, required: true },
  subHeadline: { type: String, required: true },
  buttonText: { type: String, required: true },
  buttonLink: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("HomeContent", homeContentSchema);
