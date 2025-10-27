import React, { useEffect, useId, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import { LuUser } from 'react-icons/lu';
import Model from '../Model';

function SelectUsers({selectedUsers, setSelectedUsers}) {
  const[allUsers, setAllUsers]= useState([]);
  const[isModalOpen, setIsModalOpen] = useState(true);
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
  }, []);

  useEffect(() => {
    if(selectedUsers.length === 0){
      setTempSelectedUsers([]);
    }
  
    return () => {}
  }, [selectedUsers]);
  
  
  return (
    <div className='space-y-4 mt-2'>
      {selectedUserAvatars.length === 0 && (
        <button className='card-btn' onClick={()=> setIsModalOpen(true)}><LuUser className='text-sm'/>Add Members</button>
      )}

      <Model
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title = "selected Users"
      >
        <div className='space-y-4 h-[60vh] overflow-y-auto'>
          {allUsers.map((user)=>(
            <div key={user._id}
            className='flex items-center gap-4 p-3 border-b border-gray-200'>
              {/* <img
              src={user.profileImageUrl}
              alt={user.name}
              className='w-10 h-10 rounded-lg'/> */}

              {user.profileImageUrl ? (
  <img
    src={user.profileImageUrl}
    alt={user.name}
    className='w-10 h-10 rounded-lg'
  />
) : (
  <div className='w-10 h-10 rounded-lg bg-gray-300 flex items-center justify-center text-gray-600'>
    {user.name[0]?.toUpperCase() || "?"}
  </div>
)}



              <div className='flex-1'>
                <p className='font-medium text-gray-800 dark:text-white'>{user.name}</p>
                <p className='text-sm text-gray-50'>{user.email}</p>
              </div>

              <input
              type='checkbox'
              checked={tempSelectedUsers.includes(user._id)}
              onChange={()=>toggleUserSelection(user._id)}
              className='w-4 h-4 text-blue-700 bg-gray-100 border-gray-300 rounded-sm outline-none'/>
              </div>
          ))}

        </div>

      </Model>
    </div>
  )
}

export default SelectUsers