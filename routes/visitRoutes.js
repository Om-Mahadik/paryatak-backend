const express = require("express");
const router = express.Router();
const { addVisit, getStats } = require("../controllers/visitController");

// POST: log new visit
router.post("/", addVisit);

// GET: fetch stats
router.get("/stats", getStats);

module.exports = router;
