const mongoose = require("mongoose");

const homeContentSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  headline: { type: String, required: true },
  subHeadline: { type: String, required: true },
  buttonText: { type: String, required: true },
  buttonLink: { type: String, required: true },

  // 🟢 Newly added fields for color customization
  headlineColor: { type: String, default: "#000000" },     // default black
  subHeadlineColor: { type: String, default: "#333333" },  // default dark gray

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("HomeContent", homeContentSchema);
