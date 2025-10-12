const Task = require("../models/Task");
const User = require("../models/User");
const excelJS = require("exceljs");



//desc Export all tasks as an Excel file
// @route   GET   /api/reports/export/tasks
//@acess  private  (Admin)
const exportTasksReport = async(req,res) =>{
    try {
        
    } catch (error) {
        
    }
};


//desc Export user-task report as an Excel file
// @route   GET   /api/reports/export/users
//@acess  private  (Admin)
const exportUserReport = async(req,res) =>{
    try {
        
    } catch (error) {
        
    }
};

module.exports = {
    exportTasksReport,
    exportUserReport
};

