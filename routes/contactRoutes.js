// routes/contactRoutes.js
const express = require("express");
const {
  createContact,
  getContacts,
  markAsRead,
  deleteContact,
} = require("../controllers/contactController");

const router = express.Router();

router.post("/", createContact);
router.get("/", getContacts);
router.patch("/:id/read", markAsRead);
router.delete("/:id", deleteContact);

module.exports = router;
