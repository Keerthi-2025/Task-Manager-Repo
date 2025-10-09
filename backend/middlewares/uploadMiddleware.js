const multer = require("multer");
const { off } = require("../models/Task");

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null, 'uploads/');
    },

    filename:(req,file,cb) =>{
        cb(null, `${Date.now()} -${file.originalname}`);
    },
});



//File filter
const fileFilter = (req, file, cb)=>{
    const allowedTypes =['image/jpeg', 'image/png', 'image/jpg'];
    if(allowedTypes.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(new Error('Only .jpeg, .png and jpg formats are allowed'), false);
    }
}


// Create the multer upload middleware using the given storage and fileFilter settings
const upload = multer({storage, fileFilter});

// Export only the ready-to-use upload middleware
module.exports={upload};

//module.exports={storage, fileFilter};   (Alternate way) Export just the settings, not the actual uploader,  so use the above 2 lines
