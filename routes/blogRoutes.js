const express = require("express");
const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const router = express.Router();

// ----------- Public Routes -----------
router.get("/", getBlogs);           // Get all blogs
router.get("/:id", getBlogById);     // Get single blog by ID

// ----------- Admin Routes -----------
router.post("/", createBlog);        // Create a new blog
router.put("/:id", updateBlog);      // Update existing blog
router.delete("/:id", deleteBlog);   // Delete blog

module.exports = router;
