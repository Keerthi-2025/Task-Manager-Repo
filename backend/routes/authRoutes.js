const express = require("express");

const { registeruser, loginUser, getUserProfile, updateUserProfile } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();


//Auth Routes
router.post("/register", registeruser);
router.post("/login", loginUser);
router.get("/profile",protect, getUserProfile);
router.post("/profile", protect, updateUserProfile);

module.exports= router;
