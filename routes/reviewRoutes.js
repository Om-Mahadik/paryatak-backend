const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

// -------------------------------
// 🔹 Public routes
// -------------------------------

// Submit a review (pending by default)
router.post("/", reviewController.createReview);

// Get approved reviews for a specific package
router.get("/package/:packageId", reviewController.getApprovedReviewsForPackage);

// Get overall approved reviews
router.get("/overall", reviewController.getOverallApprovedReviews);

// -------------------------------
// 🔹 Admin routes
// -------------------------------

// Get all pending reviews
router.get("/admin/pending", reviewController.getPendingReviews);

// Approve a review
router.put("/admin/approve/:id", reviewController.approveReview);

// Delete a review
router.delete("/admin/delete/:id", reviewController.deleteReview);

module.exports = router;
