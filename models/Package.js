const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema({
  day: Number,
  title: String,
  description: String,
  photo: String,
});

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  comment: { type: String, required: true },
  package: { type: mongoose.Schema.Types.ObjectId, ref: "Package", default: null }, // null = overall review
  status: { type: String, enum: ["pending", "approved", "deleted"], default: "pending" },
  date: { type: Date, default: Date.now },
});


const groupDateSchema = new mongoose.Schema({
  group: String,
  startDate: Date,
  endDate: Date,
});

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  country: String,
  duration: String,
  days: Number,
  nights: Number,
  price: Number,
  discountPrice: Number,
  mainImage: String,
  galleryImages: [String],
  overview: String,
  highlights: [String],
  inclusions: [String],
  exclusions: [String],
  itinerary: [itinerarySchema],
  reviews: [reviewSchema],
  groupDates: [groupDateSchema],
  brochure: String,
  rating: {
    stars: Number,
    reviews: Number,
  },
  isInternational: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

// ✅ Make sure to use module.exports
module.exports = mongoose.model("Package", packageSchema);
