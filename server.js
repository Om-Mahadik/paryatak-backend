// server/server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const packageRoutes = require("./routes/packageRoutes");
const blogRoutes = require("./routes/blogRoutes");
const popupRoutes = require("./routes/popupRoutes");
const contactRoutes = require("./routes/contactRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Package routes
app.use("/api/packages", packageRoutes);

// Blog routes
app.use("/api/blogs", blogRoutes);

// Popup routes
app.use("/api/popups", popupRoutes);

// Contact routes
app.use("/api/contacts", contactRoutes);

// Contact routes
app.use("/api/reviews", reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT} 🚀`));

