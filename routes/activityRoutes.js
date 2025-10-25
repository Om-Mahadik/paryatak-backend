// routes/activityRoutes.js
const express = require("express");
const { getTodaysActivity } = require("../controllers/activityController");

const router = express.Router();

router.get("/today", getTodaysActivity);

module.exports = router; // ✅ CommonJS export
