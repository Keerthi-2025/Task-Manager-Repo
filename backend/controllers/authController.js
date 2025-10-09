const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//web token generation
const generateToken = (userId) =>{
    return jwt.sign({id:userId}, process.env.JWT_SECRET, {expiresIn:"7d"});
};


//@desc  Register a new User
//@route  POST  /api/auth/register
//@access  Public
const registeruser = async(req,res) =>{
    try {
        
    } catch (error) {
        res.status(500).json({message:"Server error", error:error.message});
    }
};



//@desc  Login User
//@route  POST  /api/auth/login
//@access Public
const loginUser = async(req,res) =>{
    try {
        
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
        
    }
};



//@description Get User Profile
//@route  GET / api/auth/profile
//@acess Private(Requires JWT)
const getUserProfile = async(req,res) =>{
    try{

    }catch(error){
        res.status(500).json({message:"Server error", error:error.message});
    }
};



//@description  Updates User Profile
//@rote  POST / api/auth/profile
//@acess Private(Requires JWT)
const updateUserProfile = async(req,res) =>{
    try{

    }catch(error){
        res.status(500).json({message:"Server error", error:error.message})
    }
};


module.exports = {registeruser, loginUser, getUserProfile, updateUserProfile};
