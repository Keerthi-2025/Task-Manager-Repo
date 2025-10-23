export const BASE_URL="http://localhost:8000";

//utils/apiPaths.js
export const API_PATHS = {

    AUTH:{
    REGISTER: "/api/auth/register",      //register new user(admin or member)
    LOGIN:"/api/auth/login",            //authenticate user amd return JWT token
    GET_PROFILE: "/api/auth/profile",   //get logged in user details
},

USERS:{
    GET_ALL_USERS: "/api/users",            //get all users (admin only)
    GET_USER_BY_ID: (userId) => `/api/users/${userId}`,  //get user by ID
    CREATE_USER: "/api/users",              //create new user (admin only)
    UPDATE_USER: (userId) => `/api/users/${userId}`,  //update user details
    DELETE_USER: (userId) => `/api/users/${userId}`,  //delete user 
},

TASKS:{
    GET_DASHBOARD_DATA: "/api/tasks/dashboard-data",        //get Dashboard Data
    GET_USER_DASHBOARD_DATA: "/api/tasks/user-dashboard-data",      //get User Dashboard Data
    GET_ALL_TASKS: "/api/tasks",        //get asll tasks (admin:all, user: only assigned tasks)
    GET_TASK_BY_ID: (taskId) => `/api/tasks/${taskId}`,         //get all task by ID
    CREATE_TASK: "/api/tasks",                              //Create new Task (admin only)
    UPDATE_TASK: (taskId) => `/api/tasks/${taskId}`,       //update task details
    DELETE_TASK: (taskId) => `/api/tasks/${taskId}`  ,      //Delete Task (Admin only)

    UPDATE_TASK_STATUS: (taskId) => `/api/tasks/${taskId}/status`,      //update task status
    UPDATE_TODO_CHECKLIST: (taskId) => `/api/tasks/${taskId}/todo`,     //update Todo checklist
},


};