// import React, { useEffect, useState } from 'react'
// import DashBoardLayout from '../../components/layouts/DashBoardLayout'
// import axios from 'axios';
// import axiosInstance from '../../utils/axiosInstance';
// import { API_PATHS } from '../../utils/apiPath';
// import { LuFileSpreadsheet } from 'react-icons/lu';
// import UserCard from '../../components/context/Cards/UserCard';

// function ManageUsers() {

//   const[allUsers, setAllUsers] = useState([]);

//   const getAllUsers = async () =>{
//     try {
//       const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
//       if(response.data?.length > 0){
//         setAllUsers(response.data);
//       }
//     } catch (error) {
      
//       console.log("Error fetching users", error);
      
//     }
//   };

//   //download task report
//   const handleDownloadReport = async () =>{}

//   useEffect(() => {
//     getAllUsers();
  
//     return () => {}
//   }, [])
  
//   return (
//     <DashBoardLayout activeMenu="Team Members">
//       <div className='mt-5 mb-10'>
//         <div className='flex md:flex-row md:items-center justify-between'>
//           <h2 className='text-xl font-medium md:text-xl'>Team Members</h2>

//           <button className='flex md:flex download-btn' onClick={handleDownloadReport}>
//             <LuFileSpreadsheet className=' text-lg'/>Download Report</button>
//         </div>

//         <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
//           {allUsers?.map((user)=>{
//             <UserCard key={user._id} userInfo={user}/>
//           })}
//         </div>
//       </div>
//     </DashBoardLayout>
//   )
// }

// export default ManageUsers

import React, { useEffect, useState } from "react";
import DashBoardLayout from "../../components/layouts/DashBoardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { LuFileSpreadsheet } from "react-icons/lu";
import UserCard from "../../components/context/Cards/UserCard";
import toast from "react-hot-toast";

function ManageUsers() {
  const [allUsers, setAllUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      if (response.data?.length > 0) {
        setAllUsers(response.data);
      } else {
        setAllUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch users (unauthorized)"
      );
    }
  };

  const handleDownloadReport = async () => {

    try {
      const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_UERS,{
        responseType:"blob",
      });

      //create URL for the blob
      const url =
      
    } catch (error) {
      
    }


    // toast("Download feature coming soon!");
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <DashBoardLayout activeMenu="Team Members">
      <div className="mt-5 mb-10">
        <div className="flex md:flex-row md:items-center justify-between">
          <h2 className="text-xl font-medium md:text-xl">Team Members</h2>

          <button
            className="flex md:flex download-btn"
            onClick={handleDownloadReport}
          >
            <LuFileSpreadsheet className="text-lg" /> Download Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {allUsers.length > 0 ? (
            allUsers.map((user) => (
              <UserCard key={user._id} userInfo={user} />
            ))
          ) : (
            <p className="text-sm text-slate-500">No users found.</p>
          )}
        </div>
      </div>
    </DashBoardLayout>
  );
}

export default ManageUsers;
