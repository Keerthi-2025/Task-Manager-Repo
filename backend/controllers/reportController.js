const express = require("express");
const { adminOnly, protect } = require("../middlewares/authMiddleware");


const router = express.Router();

router.get("/export/tasks", protect, adminOnly, exportTasksReport);    //eport all tasks as Excel/PDF
router.get("/export/users", protect, adminOnly, exportUserReport);   // export  user-task report

module.exports = router;