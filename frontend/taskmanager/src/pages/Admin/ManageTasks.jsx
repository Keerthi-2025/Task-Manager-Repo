import React, { useEffect, useState } from 'react'
import DashBoardLayout from '../../components/layouts/DashBoardLayout'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';

function ManageTasks() {

  const [allTasks, setAllTasks]= useState([]);
  const [tabs, setabs] = useState([]);
  const [filtersStatus, setFiltersStatus] = useState("All");

  const navigate = useNavigate();

  const getAllTasks = async()=>{

    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS,{
        params:{
        status: filtersStatus === "All" ? "" : filtersStatus
      },
      });
      
      setAllTasks(response.data?.tasks?.length > 0 ? response.data.tasks:[])

      //map statussummary data with fixed labels and order
      const statussummary = response.data?.statussummary || {};

      const statusArray = [
        {label:"All", count: statussummary.all || 0},
        {label:"Pending", count:statussummary.pendingTasks || 0},
        {label:"Completed", count:statussummary.CompletedTasks || 0},
        {label:"In Progress", count:statussummary.inProgressTasks || 0},
      ];

      setabs(statusArray);
      console.log("Error fetching users", error);
    } catch (error) {
      
    }

  }

  const handleClick = (taskData)=>{
    navigate(`/admin/create-task`, {state:{taskId: taskData._id}})
  }


  //download task report
  const handleDownloadReport = async () =>{};

useEffect(() => {
  getAllTasks(filtersStatus);

  return () => {}
  
}, [filtersStatus]);

  return (
    
    <DashBoardLayout activeMenu={ManageTasks}>
      <div className='my-5'>
        <div className=''>
          <div className=''>
            <h2 className=''>My Tasks</h2>

            <button
            className=''
            onClick={handleDownloadReport}>Download Report</button>
          </div>
        </div>
      </div>
    </DashBoardLayout>
  )
}

export default ManageTasks