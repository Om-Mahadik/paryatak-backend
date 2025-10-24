const express = require("express");
const router = express.Router();
const packageController = require("../controllers/packageController");

// -------------------------------
// 🔹 Public routes (for frontend)
// -------------------------------

// Get all packages
router.get("/", packageController.getPackages);

// Get only National packages
router.get("/national", packageController.getNationalPackages);

// Get only International packages
router.get("/international", packageController.getInternationalPackages);

// Get only Featured packages
router.get("/featured", packageController.getFeaturedPackages);

// Get single package by ID
router.get("/:id", packageController.getPackageById);

// Get single package by slug
router.get("/slug/:slug", packageController.getPackageBySlug);


// -------------------------------
// 🔹 Admin routes (CRUD operations)
// -------------------------------

// Create new package
router.post("/", packageController.createPackage);

// Update existing package
router.put("/:id", packageController.updatePackage);

// Delete package
router.delete("/:id", packageController.deletePackage);

module.exports = router;
