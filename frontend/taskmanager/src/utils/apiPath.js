export const BASE_URL="http://localhost:8000";

//utils/apiPaths.js
export const API_PATHS = {

    AUTH:{
    REGISTER: "/api/auth/register",      //register new user(admin or member)
    LOGIN:"/api/auth/login",            //authenticate user amd return JWT token
    GET_PROFILE: "/api/auth/profile",   //get logged in user details
},

USERS:{
    
}

};