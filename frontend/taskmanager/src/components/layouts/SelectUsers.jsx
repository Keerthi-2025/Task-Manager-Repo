import React, { useEffect, useId, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';

function SelectUsers({selectedUsers, setSelectedUsers}) {
  const[allUsers, setAllUsers]= useState([]);
  const[isModalOpen, setIsModalOpen] = useState(false);
  const[tempSelectedUsers, setTempSelectedUsers]= useState([]);

  const getAllUsers = async () =>{
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      if(response.data?.length >0){
        setAllUsers(response.data);
      }
      
    } catch (error) {
      console.log("Error fetching users", error);
      
    }
  };

  const toggleUserSelection = (userId) =>{
    setTempSelectedUsers((prev)=>
    prev.includes(userId)? prev.filter((id)=> id!== userId): [...prev, userId]);
  };

  const handleAssign = () =>{
    setSelectedUsers(tempSelectedUsers);
    setIsModalOpen(false);
  };

  const selectedUserAvatars = allUsers
  .filter((user) =>selectedUsers.includes(user._id))
  .map((user)=>user.profileImageUrl);

  useEffect(() => {
    getAllUsers();
  }, [])
  
  return (
    <div>Users</div>
  )
}

export default SelectUsers