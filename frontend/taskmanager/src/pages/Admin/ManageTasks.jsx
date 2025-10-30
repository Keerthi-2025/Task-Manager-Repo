import React, { useEffect, useState } from 'react'
import DashBoardLayout from '../../components/layouts/DashBoardLayout'
import { useNavigate } from 'react-router-dom';

function ManageTasks() {

  const [allTasks, setAllTasks]= useState([]);
  const [tabs, setabs] = useState([]);
  const [filtersStatus, setFiltersStatus] = useState("All");

  const navigate = useNavigate();

  const getAllTasks = async()=>{

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
      <div className='my-5'></div>
    </DashBoardLayout>
  )
}

export default ManageTasks