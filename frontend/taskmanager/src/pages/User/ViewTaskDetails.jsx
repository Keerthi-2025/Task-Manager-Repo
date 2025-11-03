import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import DashBoardLayout from '../../components/layouts/DashBoardLayout';

function ViewTaskDetails() {

  const {id} = useParams (null);
  const[task, setTask] = useState(null);

  const getStatusTagColor = (status)=>{
    switch(status){
      case "In Progress":
      return "text-cyan-500 bg-cyan-50 border border-cyan-500";

      case "Completed":
      return "text-indigo-500 bg-indigo-50 border border-indigo-500";

     default:
     return "text-violet-500 bg-violet-50 border border-violet-500";
        
    }
  };

  //get task info by ID
  const getTaskDetaisByID = async () =>{
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(id));

      if(response.data){
        const TaskInfo = response.data;
        setTask(TaskInfo);
      }
      
    } catch (error) {
      console.log("Error fetching users", error);
      
    }
  };

  //handle todo cheklist
  const updateTodoChecklist = async () =>{};

  //handle attachment link Click
  const handleLinkClick = (link) =>{
    window.open(link, "_blank");
  };

  useEffect(() => {
    if(id){
      getTaskDetaisByID();
    }
  
    return () => {}
  }, [id]);


  
  return (
    <DashBoardLayout activeMenu="My Tasks">
      <div className='mt-5'>
       { task && (<div className='grid grid-cols-1 md:grid-cols-4 mt-4'>
          <div className='form-card col-span-3'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl md:text-xl font-medium'>{task?.title}</h2>

              <div className={`text-[13px] font-medium ${getStatusTagColor(task?.status)} px-4 py-0.5 rounded`}>
                {task?.status}
              </div>

              <div className='mt-4'>
                <InfoBox label = "Description" value={task?.description}/> 
              </div>
            </div>
          </div>
        </div>)}
      </div>
    </DashBoardLayout>
  )
}

export default ViewTaskDetails;

const InfoBox = ({label, value})=>{
  return 
}