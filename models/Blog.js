const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: Number,
  views: Number,
  uploadDate: Date,
  link: String,
  headImg: String,
  content: String,
}, { timestamps: true });

// ✅ Make sure to use module.exports
module.exports = mongoose.model("Blog", blogSchema);
