const Blog = require("../models/Blog");

// ------------------------ GET ALL BLOGS ------------------------
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ------------------------ GET BLOG BY ID ------------------------
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ------------------------ CREATE BLOG ------------------------
const createBlog = async (req, res) => {
  const {
    title,
    content,
    headImg, // <-- change here
    duration,
    views,
    uploadDate,
    link,
  } = req.body;

  try {
    const blog = new Blog({
      title,
      content,
      headImg, // <-- use schema field name
      duration,
      views: views || 0,
      uploadDate: uploadDate || new Date(),
      link,
    });

    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ------------------------ UPDATE BLOG ------------------------
const updateBlog = async (req, res) => {
  const {
    title,
    content,
    thumbnail,
    duration,
    views,
    uploadDate,
    link,
  } = req.body;

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.thumbnail = thumbnail || blog.thumbnail;
    blog.duration = duration ?? blog.duration;
    blog.views = views ?? blog.views;
    blog.uploadDate = uploadDate || blog.uploadDate;
    blog.link = link || blog.link;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ------------------------ DELETE BLOG ------------------------
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    await blog.deleteOne();
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
