const Task = require("../models/Task");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//@desc get all users for admin only
//@route GET /api/users
//@access Private(admin)

const getUsers = async (req, res) =>{
    try {
        
    } catch (error) {
        res.status(500).json({message:"Server error", error:error.message});
        
    }
};



//@desc get users by id 
//@route GET /api/users:id
//@access Private
const getUserById = async (req, res) =>{
    try {
        
    } catch (error) {
        res.status(500).json({message:"Server error", error:error.message});
        
    }
};



//@desc delete a users for admin only
//@route GET /api/users/:id
//@access Private(admin)
const deleteUser = async (req, res) =>{
    try {
        
    } catch (error) {
        res.status(500).json({message:"Server error", error:error.message});
        
    }
};

module.exports = {getUsers, getUserById, deleteUser};