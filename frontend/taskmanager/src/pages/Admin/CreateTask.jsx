import React, { useState } from 'react'

import {PRIORITY_DATA} from "../../utils/data"
import axiosInstance  from "../../utils/axiosInstance";
import { API_PATHS } from '../../utils/apiPath';
import toast from "react-hot-toast"
import {useLocation, useNavigate} from 'react-router-dom'
import moment from "moment";
import { LuTrash2 } from 'react-icons/lu';


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

  
  return (
    <div>CreateTask</div>
  )
}

export default CreateTask