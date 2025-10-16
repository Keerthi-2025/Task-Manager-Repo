import React, {createContext, useState, useEffect, Children} from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import axios from "axios";

export const userContext = createContext();

const UserProvider = ({ children }) => {

    const [user, setuser] = useState(null);
    const [loading, setloading] = useState(true);       //new state to track loading

    useEffect(()=>{
        if(user) return;

        const accessToken = localStorage.getItem("token");
        if(!localStorage){
            setloading(false);
            return;
        }

        const fetchUser = async () =>{
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
                setuser(response.data);
            } catch (error) {
                console.log("User not authenticated", error);
                clearUser();
            }finally{
                setloading(false);
            }
                
            
        };
        fetchUser();
    }, []);

    const updateUser = (userData) =>{
        setuser(userData);
        localStorage.setItem("token", userData.token);      //save token
        setloading(false);
    }

    const clearUser = () =>{
        setuser(null);
        localStorage.removeItem("token");
    }
    return(
        <userContext.Provider value={{user, loading, updateUser, clearUser}}>
            {Children}
        </userContext.Provider>
    );

}

export default UserProvider;