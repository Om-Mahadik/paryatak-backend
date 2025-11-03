const express = require("express");
const {
  getHomeContent,
  updateHomeContent,
} = require("../controllers/homeContentController");

const router = express.Router();

// Public route — fetch content for homepage
router.get("/", getHomeContent);

// Admin-only route — update content
router.post("/", updateHomeContent);

module.exports = router;
