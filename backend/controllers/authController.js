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
const registeruser = async(req,res) =>{};



//@desc  Login User
//@route  POST  /api/auth/login
//@access Public
const loginUser = async(req,res) =>{};



//@description Get User Profile
//@route  GET / api/auth/profile
//@acess Private(Requires JWT)
const getUserProfile = async(req,res) =>{};



//@description  Updates User Profile
//@rote  POST / api/auth/profile
//@acess Private(Requires JWT)
const updateUserProfile = async(req,res) =>{};


module.exports = {registeruser, loginUser, getUserProfile, updateUserProfile};
