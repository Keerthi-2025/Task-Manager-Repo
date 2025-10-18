import { useContext, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../components/context/useContext";


export const useUserAuth = () =>{
    const {user, loadimg, clearUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(()=>{
        if(loadimg) return;
        if(user) return;

        if(!user){
            clearUser();
            navigate("/login");
        }
    },  [user, loadimg, navigate]);
};