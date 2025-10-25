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
      <div className=''>
        <div className=''>
          <div className=''>
            <div className=''>
              <h2 className=''>{taskId ? "Update Task" : "Create Task"}</h2>

              {taskId && (
                <button className='' onClick={()=> setOpenDeleteAlert(true)}>

                  <LuTrash2 className=''/>Delete

                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashBoardLayout>
    
  )
}

export default CreateTask