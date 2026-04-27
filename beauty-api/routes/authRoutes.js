const express = require("express");
const router = express.Router();
const {
  register,
  login,
  createAdmin,
} = require("../controllers/authController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

router.post("/register", register); // public
router.post("/login", login); // public
router.post("/create-admin", protect, adminOnly, createAdmin); // 🔒 admin only

module.exports = router;
