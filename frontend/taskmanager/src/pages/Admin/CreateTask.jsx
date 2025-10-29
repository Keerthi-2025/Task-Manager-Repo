import React, { useState } from 'react'

import {PRIORITY_DATA} from "../../utils/data"
import axiosInstance  from "../../utils/axiosInstance";
import { API_PATHS } from '../../utils/apiPath';
import toast from "react-hot-toast"
import {useLocation, useNavigate} from 'react-router-dom'
import moment from "moment";
import { LuTrash2 } from 'react-icons/lu';
import DashBoardLayout from "../../components/layouts/DashBoardLayout"
import SelectDropdown from '../../components/layouts/SelectDropdown';
import SelectUsers from '../../components/layouts/SelectUsers';
import TodoInputList from '../../components/Input/TodoInputList';
import AddAttachmentsInput from '../../components/Input/AddAttachmentsInput';


function CreateTask() {

  const location = useLocation();
  const {taskId} = location.state || {};
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title:"",
    description:"",
    priority:"",
    dueDate:"",
    assignedTo:[],
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
  const CreateTask = async () =>{
    setLoading(true);

    try {
      const todolist = taskData.todoChecklist?.map((item)=>({
        text:item,
        completed:false,
      }));

      const  response = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK,{
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist:todolist,
      });
      
      toast.success("Task created successfully");

      clearData();

      
    } catch (error) {
      console.log("Error craeting the Task", error);
      setLoading(false);
    }finally{
      setLoading(false);
    }
  };

  //update Task
  const updateTask = async () => {};

  //get task info by id
  const getTaskDetailsByID = async () =>{};

  //delete Task
  const deleteTask = async () =>{};

  const handleSubmit = async () =>{
    setError(null);
  

  //input validation
  if(!taskData.title.trim()){
    setError("Title is required");
    return;
  }

  if(!taskData.description.trim()){
    setError("Description is required");
}

if(!taskData.dueDate){
    setError("Due Date is required");
    return;
}

if(taskData.assignedTo?.length === 0){
  setError("Task not assigned to any member");
  return;
}

if(taskData.todoChecklist?. length === 0){
  setError("Add atleast one todo Task");
  return;
}

if(taskId){
  updateTask();
  return;
}

CreateTask();
}


  





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

            <div className='mt-3'>
              <label className='text-xs font-medium text-slate-600'>Description</label>
            </div>

            <textarea placeholder='Describe Task' className='form-input' rows={4} value={taskData.description} onChange={({target})=> handleValueChange("description", target.value)}/>


               <label>Priority</label>

            <SelectDropdown options={PRIORITY_DATA} value={taskData.priority} onChange={(value)=> handleValueChange("priority", value)}
            placeholder="Select Priority"/>

             <div className='col-span-6 md:col-span-4'>
            <label className='text-xs font-medium text-slate-600'>Due Date</label>
          </div>

          <input
          placeholder='Create App UI'
          className='form-input'
          value={taskData.dueDate}
          onChange={({target})=> handleValueChange("dueDate", target.value)} 
          type='date'/>

           <div className='col-span-12 md:col-span-3'>
            <label className='text-xs font-medium text-slate-600'>Assign To</label>

            <SelectUsers
            selectedUsers = {taskData.assignedTo}
            setSelectedUsers= {(value)=>{handleValueChange("assignedTo", value);
              
            }}/>

            <div className='mt-3'>
              <label className='text-xs font-medium text-slate-600'>ToDO Checklist</label>

              <TodoInputList 
              todoChecklist={taskData?. todoChecklist}
              setToDOList={(value)=> handleValueChange("todoChecklist", value)}/>

              <div className='mt-3'>
                <label className='text-xs font-medium text-slate-600'>Add Attachments</label>
              </div>

              <AddAttachmentsInput
              attachments={taskData?.attachments}
              setAttachments={(value)=> handleValueChange("attachments", value)}/>

            </div>
          </div>

          {error && (
            <p className='text-xs font-medium text-red-500'>{error}</p>
          )}

          <div className='flex justify- mt-7'>
            <button className='add-btn'
            onClick={handleSubmit}
            disabled={loading}
            >
              {taskId ? "UPDATE TASK" : "CREATE TASK"}
            </button>
          </div>

          </div>

          
        </div>
      </div>
    </DashBoardLayout>
    
  )
}

export default CreateTask