const express = require("express");
const { adminOnly, protect } = require("../middlewares/authMiddleware");
const { getUsers, getUserById, deleteUser } = require("../controllers/userController");

const router = express.Router();

//user management Routes
router.get("/", protect, adminOnly, getUsers);   //get all users - admin only
router.get("/:id", getUserById);   //get user by specific id    //if i remove protect then only i get user by their id
// router.delete("/:id", protect, adminOnly, deleteUser);  // delete user by id for admin only

module.exports = router;