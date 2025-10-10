const express = require("express");
const { adminOnly, protect } = require("../middlewares/authMiddleware");

const router = express.Router();

//user management Routes
router.get("/", protect, adminOnly, getUsers);   //get all users - admin only
router.get("/:id", protect, getUserById);   //get user by specific id
router.delete("/:id", protect, adminOnly, deleteUser);  // delete user by id for admin only

module.exports = router;