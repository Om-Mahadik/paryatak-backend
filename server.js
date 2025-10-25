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
const visitRoutes = require("./routes/visitRoutes");
const activityRoutes = require("./routes/activityRoutes");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ⚡ CORS setup
// Allows any origin (for development). For production, replace "*" with your frontend URL
app.use(cors({ origin: "*" }));

// Body parser
app.use(express.json());

// --------------------
// Test route
// --------------------
app.get("/", (req, res) => {
  res.send("API is running...");
});

// --------------------
// API routes
// --------------------
app.use("/api/packages", packageRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/popups", popupRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/visits", visitRoutes);
app.use("/api/activity", activityRoutes);

// --------------------
// Start server
// --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT} 🚀`)
);

module.exports = app; // Optional: for testing or serverless adapters
