import React, { useEffect, useState } from 'react'
import DashBoardLayout from '../../components/layouts/DashBoardLayout'
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';

function ManageUsers() {

  const[allUsers, setAllUsers] = useState([]);

  const getAllUsers = async () =>{
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      if(response.data?.length > 0){
        setAllUsers(response.data);
      }
    } catch (error) {
      
      console.log("Error fetching users", error);
      
    }
  };

  //download task report
  const handleDownloadReport = async () =>{}

  useEffect(() => {
    getAllUsers();
  
    return () => {}
  }, [])
  
  return (
    <DashBoardLayout activeMenu="Team Members">ManageUsers</DashBoardLayout>
  )
}

export default ManageUsers