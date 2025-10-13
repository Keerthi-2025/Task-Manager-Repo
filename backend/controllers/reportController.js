const Task = require("../models/Task");
const User = require("../models/User");
const excelJS = require("exceljs");



//desc Export all tasks as an Excel file
// @route   GET   /api/reports/export/tasks
//@acess  private  (Admin)
const exportTasksReport = async(req,res) =>{
    try {
        const tasks = await Task.find().populate("assignedTo", "name email")

        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet("Task Report");

        worksheet.columns =[

            {header: "Task ID", key: "_id", width:25},
            {header: "Title", key: "title", width:30},
            {header: "Task ID", key: "_id", width:25},
            {header: "Description", key: "description", width:50},
            {header: "Task ID", key: "_id", width:25},
            {header: "Priority", key: "priority", width:20},
            {header: "Status", key: "status", width:20},
            {header: "Due Date", key: "dueDate", width:20},
            {header: "Assigned To", key: "assignedTo", width:30},
        ];

        tasks.forEach((task) =>{
            const assignedTo = task.assignedTo.map((user)=> `${user.name} (${user.email})`).join(",");
            worksheet.addRow({
                _id: task._id,
                title:task.title,
                description:task.description,
                priority: task.priority,
                status: task.status,
                dueDate: task.dueDate.toISOString().split("T")[0],
                assignedTo: assignedTo || "Unassigned"
            });
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformates-officedocument.spreadsheetml.sheet"
        );

        res.setHeader(
             "Content-Disposition",
        'attachment; filename="tasks_report.xlsx"'

        );

        return workbook.xlsx.write(res).then(()=>{
            res.end();
        });
       
            

        
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

