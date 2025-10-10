const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { getDashboardData, getUserDashboardData, getTasks, getTasksById, createTask, updateTask, deleteTask, updateTaskStatus, updateTaskChecklist } = require("../controllers/taskController");

const router = express.Router();

//task management routes
router.get("/dashboard-data", protect, getDashboardData);
router.get("/user-dashboard-data", protect, getUserDashboardData);
router.get("/", protect, getTasks);   //get all tasks, admin:all, user:assigned
router.get("/:id", protect, getTasksById); //get task by ID;
router.get("/", protect, adminOnly, createTask);   // create tasks, admin only
router.get("/:id", protect, updateTask);   //update task details
router.get("/:id", adminOnly, deleteTask);  //delete task, admin only
router.get("/:id/status", protect,updateTaskStatus);   //update task status
router.get("/:id/todo", protect, updateTaskChecklist); // update task checklist

module.exports = router;