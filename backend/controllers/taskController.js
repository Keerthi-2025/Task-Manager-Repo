const Task = require("../models/Task");


//@desc get all tasks, admin:all, user:assigned
//@route GET /api/tasks
//@access Private(admin)
const getTasks = async(req, res)=>{

    try {
        
    } catch (error) {
        
    }
};



//@desc get task by ID
//@route GET /api/tasks/:id
//@access Private(admin)
const getTasksById = async(req, res)=>{
    try {
        
    } catch (error) {
        
    }
};



//@desc create tasks, admin only
//@route POST /api/tasks/
//@access Private(admin)
const createTask = async(req, res)=>{
    try {
        
    } catch (error) {
        
    }
};


//@desc update task details
//@route PUT /api/tasks/:id
//@access Private(admin)
const updateTask = async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
};



//@desc delete task, admin only
//@route DELETE /api/tasks/:id
//@access Private(admin)
const deleteTask = async(req, res)=>{
    try {
        
    } catch (error) {
        
    }
};


//@desc update task status
//@route PUT /api/tasks/:id
//@access Private(admin)
const updateTaskStatus = async(req, res)=>{
    try {
        
    } catch (error) {
        
    }
};



//@desc update task checklist
//@route PUT /api/tasks/:id
//@access Private(admin)
const updateTaskChecklist = async(req, res)=>{
    try {
        
    } catch (error) {
        
    }
};


//@desc Dashboard data, admin only
//@route GET /api/tasks/dashboard-data"
//@access Private(admin)
const getDashboardData = async(req, res)=>{
    try {
        
    } catch (error) {
        
    }
};


//@desc Dashboard data, user specific
//@route GET /api/tasks/user-dashboard-data
//@access Private(admin)
const getUserDashboardData = async(req, res)=>{
    try {
        
    } catch (error) {
        
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
