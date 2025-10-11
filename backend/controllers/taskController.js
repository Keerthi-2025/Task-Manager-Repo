const Task = require("../models/Task");


//@desc get all tasks, admin:all, user:assigned
//@route GET /api/tasks
//@access Private(admin)
const getTasks = async(req, res)=>{
    try {
        const {status} = req.query;
        let filter ={};

        if(status){
            filter.status = status;
        }

        let tasks;

        if(req.user.role === 'admin'){
            tasks = await Task.find(filter).populate(
                "assisgnedTo",
                "name email profileImageUrl"
            );
        }else{
            tasks = await Task.find({...filter, assisgnedTo: req.user_.id}).populate(
                 "assisgnedTo",
                "name email profileImageUrl"
            )
        }

        //add completed todocgecklist count to each task
        tasks = await Promise.all(
            tasks.map(async(task) =>{
                const completedCount = task.todoChecklist.filter(
                    (item) =>item.completed
                ).length;
                return {...task._doc, completedTodoCount: completedCount};    
            })
        );


        
        
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
        const task = await Task.findById(req.params.id);
        if(!task) return res.status(404).json({message:"Task not found"});

        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.priority = req.body.priority || task.priority;
        task.dueDate = req.body.dueDate || task.dueDate;
        task.todoChecklist = req.body.todoChecklist || task.todoChecklist;
        task.attachements = req.body.attachements || task.attachements;

        if(req.body.assignedTo){
            if(!Array.isArray(req.body.assignedTo)){
                return res.json(400).json({message:"assignedTo must be array of user ID's"})
            }

            task.assignedTo =req.body.assignedTo;
        }
        
        const updatedTask = await task.save();
        res.json({message:"Task updated successfully", updatedTask});

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
