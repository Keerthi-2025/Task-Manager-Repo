const Task = require("../models/Task");


//@desc get all tasks, admin:all, user:assigned
//@route GET /api/tasks
//@access Private(admin)
const getTasks = async(req, res)=>{

    try {
        
    } catch (error) {
        res.status(500).json({message:"Server error", error:error.message});
        
    }
};



//@desc get task by ID
//@route GET /api/tasks/:id
//@access Private(admin)
const getTasksById = async(req, res)=>{
    try {
        
    } catch (error) {
     res.status(500).json({message:"Server error", error:error.message});

        
    }
};



//@desc create tasks, admin only
//@route POST /api/tasks
//@access Private(admin)
const createTask = async(req, res)=>{
    try {
        const{
            title,
           description,
            priority,
            dueDate,
            assignedTo,
            attachements,
            todoChecklist
        }=req.body;

        if(!Array.isArray(assignedTo)){
            return res.json({message:"assignedTo must be an array of users ID's"})
        }

        const task = await Task.create({
            title,
           description,
            priority,
            dueDate,
            assignedTo,
            createdBy: req.user._id,
            todoChecklist,
            attachements,
        });
        res.status(201).json({message:"Task created successfully", task});
        

    } catch (error) {
      res.status(500).json({message:"Server error", error:error.message});

        
    }
};


//@desc update task details
//@route PUT /api/tasks/:id
//@access Private(admin)
const updateTask = async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({message:"Server error", error:error.message});

        
    }
};



//@desc delete task, admin only
//@route DELETE /api/tasks/:id
//@access Private(admin)
const deleteTask = async(req, res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({message:"Server error", error:error.message});

        
    }
};


//@desc update task status
//@route PUT /api/tasks/:id
//@access Private(admin)
const updateTaskStatus = async(req, res)=>{
    try {
        
    } catch (error) {
     res.status(500).json({message:"Server error", error:error.message});

        
    }
};



//@desc update task checklist
//@route PUT /api/tasks/:id
//@access Private(admin)
const updateTaskChecklist = async(req, res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({message:"Server error", error:error.message});

        
    }
};


//@desc Dashboard data, admin only
//@route GET /api/tasks/dashboard-data"
//@access Private(admin)
const getDashboardData = async(req, res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({message:"Server error", error:error.message});
 
        
    }
};


//@desc Dashboard data, user specific
//@route GET /api/tasks/user-dashboard-data
//@access Private(admin)
const getUserDashboardData = async(req, res)=>{
    try {
        
    } catch (error) {
         res.status(500).json({message:"Server error", error:error.message});
  
        
    }
};

module.exports={
    getTasks,
    getTasksById,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    updateTaskChecklist,
    getDashboardData,
    getUserDashboardData

};
