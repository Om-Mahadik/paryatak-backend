const express = require("express");
const {
  getHomeContent,
  addHomeContent,
  updateHomeContent,
  deleteHomeContent,
} = require("../controllers/homeContentController");

const router = express.Router();

// Public route — fetch all homepage hero sections
router.get("/", getHomeContent);

// Admin routes — CRUD operations
router.post("/", addHomeContent);          // Add new hero
router.put("/:id", updateHomeContent);     // Edit existing hero
router.delete("/:id", deleteHomeContent);  // Delete hero

module.exports = router;
