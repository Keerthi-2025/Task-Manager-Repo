const express = require("express");

const { registeruser, loginUser, getUserProfile, updateUserProfile } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const { upload } = require("../middlewares/uploadMiddleware");

const router = express.Router();


//Auth Routes
router.post("/register", registeruser);
router.post("/login", loginUser);
router.get("/profile",protect, getUserProfile);
router.post("/profile", protect, updateUserProfile);

router.post("/upload-image", upload.single("image"), (req,res)=>{
    if(!req.file){
        return res.status(404).json({message: "No file uploaded."});
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({imageUrl});
})

module.exports= router;
