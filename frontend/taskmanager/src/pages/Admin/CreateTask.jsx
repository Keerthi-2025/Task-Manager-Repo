import React, { useState } from 'react'

import {PRIORITY_DATA} from "../../utils/data"
import axiosInstance  from "../../utils/axiosInstance";
import { API_PATHS } from '../../utils/apiPath';
import toast from "react-hot-toast"
import {useLocation, useNavigate} from 'react-router-dom'
import moment from "moment";
import { LuTrash2 } from 'react-icons/lu';
import DashBoardLayout from "../../components/layouts/DashBoardLayout"


function CreateTask() {

  const location = useLocation();
  const {taskId} = location.state || {};
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title:"",
    description:"",
    priority:"",
    dueDate:"",
    assignedTo:"",
    todoChecklist:[],
    attachments:[],
  });

  const [currentTask, setCurrentTask] = useState(null);
  const[error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const[openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleValueChange = (key, value) =>{
    setTaskData((prevData)=>({...prevData, [key]:value}));
  };


  const clearData = () =>{
    //reset form
    setTaskData({
       title:"",
    description:"",
    priority:"Low",
    dueDate:null,
    assignedTo:"",
    todoChecklist:[],
    attachments:[],
    });
  };


  //create Task
  const CreateTask = async () =>{};

  //update Task
  const updateTask = async () => {};

  //get task info by id
  const getTaskDetailsByID = async () =>{};

  //delete Task
  const deleteTask = async () =>{};

  const handleSubmit = async () =>{};





  return (
    <DashBoardLayout activeMenu="Create Task">
      <div className='mt-5'>
        <div className='grid grid-cols-1 md:grid-cols-4 mt-4'>
          <div className='form-card col-span-3'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl md:text-xl font-medium'>{taskId ? "Update Task" : "Create Task"}</h2>

              {taskId && (
                <button className='flex items-center gap-1.5 text-2xl font-medium text-rose-500 bg-rose-400 rounded-full px-3 py-1 border border-rose-100
                hover:border-rose-300 cursor-pointer' onClick={()=> setOpenDeleteAlert(true)}>

                  <LuTrash2 className='text-base'/>Delete

                </button>
              )}
            </div>

            <div>
              <label className='text-xs font-medium text-slate-600'>Task Title</label>

              <input
              placeholder='Create App UI'
              className='form-input'
              value={taskData.title}
              onChange={({target})=> handleValueChange("title", target.value)}/>
            </div>
          </div>
        </div>
      </div>
    </DashBoardLayout>
    
  )
}

export default CreateTask