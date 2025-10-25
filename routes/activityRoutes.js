const express = require("express");
const router = express.Router();
const { getTodaysActivity } = require("../controllers/activityController");

router.get("/today", getTodaysActivity);

module.exports = router;
