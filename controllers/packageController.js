const Package = require("../models/Package");

// ==============================
// 🔹 Get all packages
// ==============================
exports.getPackages = async (req, res) => {
  try {
    const packages = await Package.find().sort({ createdAt: -1 });
    res.status(200).json(packages);
  } catch (err) {
    res.status(500).json({ message: "Error fetching packages", error: err.message });
  }
};

// ==============================
// 🔹 Get national packages
// ==============================
exports.getNationalPackages = async (req, res) => {
  try {
    const packages = await Package.find({ isInternational: false }).sort({ createdAt: -1 });
    res.status(200).json(packages);
  } catch (err) {
    res.status(500).json({ message: "Error fetching national packages", error: err.message });
  }
};

// ==============================
// 🔹 Get international packages
// ==============================
exports.getInternationalPackages = async (req, res) => {
  try {
    const packages = await Package.find({ isInternational: true }).sort({ createdAt: -1 });
    res.status(200).json(packages);
  } catch (err) {
    res.status(500).json({ message: "Error fetching international packages", error: err.message });
  }
};

// ==============================
// 🔹 Get featured packages
// ==============================
exports.getFeaturedPackages = async (req, res) => {
  try {
    const packages = await Package.find({ featured: true }).sort({ createdAt: -1 });
    res.status(200).json(packages);
  } catch (err) {
    res.status(500).json({ message: "Error fetching featured packages", error: err.message });
  }
};


// ==============================
// 🔹 Get single package by ID
// ==============================
exports.getPackageById = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) return res.status(404).json({ message: "Package not found" });
    res.status(200).json(pkg);
  } catch (err) {
    res.status(500).json({ message: "Error fetching package", error: err.message });
  }
};

// ==============================
// 🔹 Create new package
// ==============================
exports.createPackage = async (req, res) => {
  try {
    const pkg = new Package(req.body);
    await pkg.save();
    res.status(201).json({ message: "Package created successfully", package: pkg });
  } catch (err) {
    res.status(400).json({ message: "Error creating package", error: err.message });
  }
};

// ==============================
// 🔹 Update existing package
// ==============================
exports.updatePackage = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pkg) return res.status(404).json({ message: "Package not found" });
    res.status(200).json({ message: "Package updated successfully", package: pkg });
  } catch (err) {
    res.status(400).json({ message: "Error updating package", error: err.message });
  }
};

// ==============================
// 🔹 Delete package
// ==============================
exports.deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id);
    if (!pkg) return res.status(404).json({ message: "Package not found" });
    res.status(200).json({ message: "Package deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting package", error: err.message });
  }
};




// Get package by slug
exports.getPackageBySlug = async (req, res) => {
  try {
    const pkg = await Package.findOne({ slug: req.params.slug });
    if (!pkg) return res.status(404).json({ message: "Package not found" });
    res.status(200).json(pkg);
  } catch (err) {
    res.status(500).json({ message: "Error fetching package", error: err.message });
  }
};
