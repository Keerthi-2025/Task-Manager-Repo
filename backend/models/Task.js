const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
    {
        text:{type:String, required:true},
        completed:{type:Boolean, default:false}
    }
);


const taskSchema = new mongoose.Schema(
    {
        title:{type:String, required:true},
        decsription:{type:String, required:true},
        priority:{type:String, enum:["high", "low", "medium"], default:"medium"},
        status:{type:String, enum:["Pending", "In Progress", "Completed"], default:"Pending"},
        dueDate:{type:Date, required:true},
        attachements:{type:String},
        assignedTo:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
        createdBy:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
        todoChecklist:[todoSchema],
        progress:{type:Number, default:0}

    },
    {timestamps:true}
)

// module.exports = mongoose.model("User", taskSchema);
module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
