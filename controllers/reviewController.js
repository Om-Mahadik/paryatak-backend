const Review = require("../models/Review");

// ----------------- Public -----------------
exports.createReview = async (req, res) => {
  try {
    const { name, rating, comment, packageId } = req.body;
    const review = new Review({
      name,
      rating,
      comment,
      package: packageId || null, // null = overall
    });
    await review.save();
    res.status(201).json({ message: "Review submitted for approval", review });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getApprovedReviewsForPackage = async (req, res) => {
  try {
    const reviews = await Review.find({
      package: req.params.packageId,
      status: "approved",
    });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOverallApprovedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ package: null, status: "approved" });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ----------------- Admin -----------------
exports.getPendingReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ status: "pending" }).populate("package");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.approveReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    review.status = "approved";
    await review.save();
    res.json({ message: "Review approved", review });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    review.status = "deleted";
    await review.save();
    res.json({ message: "Review deleted", review });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
