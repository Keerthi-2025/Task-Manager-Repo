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
                "assignedTo",
                "name email profileImageUrl"
            );
        }else{
            tasks = await Task.find({...filter, assisgnedTo: req.user_.id}).populate(
                 "assignedTo",
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

//status summary counts
const allTasks = await Task.countDocuments(
    req.user.role === "admin" ? { }: {assignedTo: req.user._id}
);


const pendingTasks = await Task.countDocuments(
    {...filter,
        status: "Pending",
        ...(req.user.role !== "admin" && {assignedTo: req.user._id})
    }
);

const inProgressTasks = await Task.countDocuments(
    {...filter,
        status: "In Progress",
        ...(req.user.role !== "admin" && {assignedTo: req.user._id})
        
    }
);

const completedTasks = await Task.countDocuments(
    {
        ...filter,
        status: "completed",
        ...(req.user.role !== "admin" && {assignedTo: req.user._id})
    }
)
        

res.json({
    tasks,
    statusSummary:{
        all:allTasks,
    pendingTasks,
    inProgressTasks,
    completedTasks,

    }
    
})
        
    } catch (error) {
        res.status(500).json({message:"Server error", error:error.message});
        
    }
};





//@desc get task by ID
//@route GET /api/tasks/:id
//@access Private(admin)
const getTasksById = async(req, res)=>{
    try {

        const task = await Task.findById(req.params.id).populate(
            "assignedTo",
            "name email profileImageUrl"
        );
        if(!task) return res.status(404).json({message:"Task not found"});
        

        res.json(task);


        
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

        const task = await Task.findById(req.params.id);

        if(!task) return res.status(404).json({message:" Task not found"});

        await task.deleteOne();
        res.json({message: "Task deleted succesfully"});
        
    } catch (error) {
        res.status(500).json({message:"Server error", error:error.message});
    }
};


//@desc update task status
//@route PUT /api/tasks/:id
//@access Private(admin)
const updateTaskStatus = async(req, res)=>{
    try {
        const task = await Task.findById(req.params.id);
        if(!task) return res.json(404).json({message:" Task not found"});
        // return res.status(404).json({ message: "Task not found" });


        // const isAssigned = task.assignedTo(
        //     (userId) => userId.toString() === req.user._id.toString()
        // );

        const isAssigned =
  task.assignedTo && task.assignedTo.toString() === req.user._id.toString();


         if(!isAssigned && req.user.role !=="admin"){
            return res.status(403).json({message:"Not authorized"});
         }

         task.status = req.body.status || task.status;

         if(task.status === "completed"){
            task.todoChecklist.forEach((item) =>  (item.completed = true));
            task.progress = 100;
         }

         await task.save();
         res.json({message:" Task updated successfully", task});
        
    } catch (error) {
     res.status(500).json({message:"Server error", error:error.message});

        
    }
};



//@desc update task checklist
//@route PUT /api/tasks/:id
//@access Private(admin)
const updateTaskChecklist = async(req, res)=>{
    try {
        const {todoChecklist} = req.body;
        const task = await Task.findById(req.params.id);

        if(!task) return res.status(404).json({message:"Task not found"});

        // if(!task.assignedTo.includes(req.user._id) && req.user.role !== "admin"){
        //     return res.status(403).json({message:" Not authorized to update checklist"});
        // }

        if(!task.assignedTo || (task.assignedTo.toString() !== req.user._id.toString() && req.user.role !== "admin")){
    return res.status(403).json({message:"Not authorized to update checklist"});
}


        task.todoChecklist = todoChecklist;     //replace with updated checklist

        //auto update progress based on checklist completion
        const completedCount = task.todoChecklist.filter(
            (item) => item.completed
        ).length;
        
        const tottalItems = task.todoChecklist.length;
        task.progress = tottalItems > 0 ? Math.round((completedCount / tottalItems) * 100) : 0;

        //auto amrk task as completed if all items are checked
        if(task.progress === 100){
            task.status = "Completed";
        }else if(task.progress > 0){
            task.status = "In Progress";
        }else{
            task.status = "Pending";
        }

        await task.save();
        const updatedTask = await Task.findById(req.params.id).populate(
            "assignedTo",
            "name email profileImageUrl"
        )

        res.json({message:"Task checklist updated", task:updatedTask});
    } catch (error) {
        res.status(500).json({message:"Server error", error:error.message});

        
    }
};


//@desc Dashboard data, admin only
//@route GET /api/tasks/dashboard-data"
//@access Private(admin)
const getDashboardData = async(req, res)=>{
    try {

        //fetch statics
        const totalTasks = await Task.countDocuments();
        const pendingTasks = await Task.countDocuments({status:"Pending"});
        const completedTasks = await Task.countDocuments({status:"Completed"});
        const overdueTasks = await Task.countDocuments({status:{$ne:"Completed"},dueDate:{$lt:new Date() }});

        //ensure all status are included
        const taskStatus = ["Pending", "In Progress", "Completed"];
        const taskDistributionRaw = await Task.aggregate([
            {
                $group:{
                    _id: "$status",
                    count: {$sum: 1},
                },
            },
        ]);

        const taskDistribution = taskStatus.reduce((acc, status) =>{
            const formattedKey = status.replace(/\s+/g,"");   //remove spaces for sequence keys
            acc[formattedKey] = taskDistributionRaw.find((item) => item._id === status) ?. count || 0;
            return acc;
        }, {});
        taskDistribution["All"] = totalTasks;         //add total count to distribution


        //ensure all priority levels are included
        const taskPriorities = ["Low", "High", "Medium"];
        const taskPriorityLevelsRaw = await Task.aggregate([
            {
                $group:{
                    _id: "$priority",
                    count: {$sum:1},
                },
            },

        ]);

        const taskPriorityLevels = taskPriorities.reduce((acc, priority) =>{
        acc[priority] = taskPriorityLevelsRaw.find((item) => item._id === priority)?.count || 0;
            return acc;
        }, {});

        //fetch recent 10 tasks
        // const recentTasks = await Task.find()
        // .sort({createdAt: -1}
        //     .limit(10)
        //     .select("title status priority dueDate createdAt")
        // )

        const recentTasks = await Task.find()
    .sort({ createdAt: -1 }) // close sort() properly
    .limit(10)
    .select("title status priority dueDate createdAt");


        res.status(200).json({
            statistics:{
                totalTasks,
                pendingTasks,
                completedTasks,
                overdueTasks
            },
            charts:{
                taskDistribution,
                taskPriorityLevels
            },
            recentTasks
        })
        
        
    } catch (error) {
        res.status(500).json({message:"Server error", error:error.message});
 
        
    }
};


//@desc Dashboard data, user specific
//@route GET /api/tasks/user-dashboard-data
//@access Private(admin)
const getUserDashboardData = async(req, res)=>{
    try {

        const userId = req.user._id;     //only fecth the logged in user



        //fetch statistics for user specific tasks
        const tottalTasks = await Task.countDocuments({assignedTo: userId});
        const pendingTasks = await Task.countDocuments({assignedTo:userId, status: "Pending"});
        const completedTasks = await Task.countDocuments({assignedTo:userId, status: "Completed"});
        const overdueTasks = await Task.countDocuments({assignedTo:userId, status:{$ne:"Completed"}, dueDate:{$lt: new Date()}});

        
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
