const express = require("express");
const {
  createPopup,
  getPopups,
  markAsRead,
  deletePopup,
} = require("../controllers/popupController");

const router = express.Router();

// Create a new popup
router.post("/", createPopup);

// Get all popups
router.get("/", getPopups);

// Mark as read/unread
router.patch("/:id/read", markAsRead);

// Delete a popup
router.delete("/:id", deletePopup);

module.exports = router;
