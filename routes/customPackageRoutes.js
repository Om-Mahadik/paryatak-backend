const express = require("express");
const {
  createRequest,
  getAllRequests,
  markAsRead,
  markAsUnread,
  deleteRequest
} = require("../controllers/customPackageController");

const router = express.Router();

router.post("/", createRequest);         // Submit form
router.get("/", getAllRequests);         // Admin view
router.patch("/:id/read", markAsRead);   // Mark as read
router.patch("/:id/unread", markAsUnread); // Mark as unread
router.delete("/:id", deleteRequest); // Delete a request

module.exports = router;
