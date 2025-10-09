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
        const{name, email, password, profileImageUrl,adminInviteToken}= req.body;


        //check if user alredy exists
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message:"User already exists"});
        }


        //determine user role: admin if token provied is correct, else member 
        let role = "member";
        if(adminInviteToken && adminInviteToken == process.env.ADMIN_INVITE_TOKEN){
            role="admin";
        }
        

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);


        //create new user
        const user = await User.create({
            name, email, password:hashedPassword, profileImageUrl, role
        })


        //return user details with JWT
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email:user.email,
            role:user.role,
            profileImageUrl:user.profileImageUrl,
            token:generateToken(user._id)
        })

    } catch (error) {
        res.status(500).json({message:"Server error", error:error.message});
    }
};



//@desc  Login User
//@route  POST  /api/auth/login
//@access Public
const loginUser = async(req,res) =>{
    try {

        const{email, password} = req.body;

        //check if user alredy exists
        const user = await User.findOne({email});
        if(!user){
           return  res.status(401).json({message:"Invalid email or password"});
        }
        

        //compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({message: "Invalid email or password"});
        }


        //return user details with JWT
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            profileImageUrl:user.profileImageUrl,
            token:generateToken(user._id)
        })

    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
        
    }
};



//@description Get User Profile
//@route  GET / api/auth/profile
//@acess Private(Requires JWT)
const getUserProfile = async(req,res) =>{
    try{
        const user = await User.findById(req.user.id).select("-password");
        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        res.json(user);

    }catch(error){
        res.status(500).json({message:"Server error", error:error.message});
    }
};



//@description  Updates User Profile
//@rote  POST / api/auth/profile
//@acess Private(Requires JWT)
const updateUserProfile = async(req,res) =>{
    try{
         //checks if user exists
        const user = await User.findById(req.user.id);

        if(!user){
            return res.status(404).json({message: "User nor found"});
        }


        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            user.password= await bcrypt.hash(req.body.password, salt);
        }

        const updateUser = await user.save();

        res.json({
            _id:updateUser._id,
            name:updateUser.name,
            email:updateUser.email,
            role:updateUser.role,
            token:generateToken(updateUser._id),
        })

    }catch(error){
        res.status(500).json({message:"Server error", error:error.message})
    }
};


module.exports = {registeruser, loginUser, getUserProfile, updateUserProfile};
