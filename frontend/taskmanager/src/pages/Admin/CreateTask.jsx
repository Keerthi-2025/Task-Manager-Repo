// import  { useEffect, useState } from 'react'

// import {PRIORITY_DATA} from "../../utils/data"
// import axiosInstance  from "../../utils/axiosInstance";
// import { API_PATHS } from '../../utils/apiPath';
// import toast from "react-hot-toast"
// import {useLocation, useNavigate} from 'react-router-dom'
// import moment from "moment";
// import { LuTrash2 } from 'react-icons/lu';
// import DashBoardLayout from "../../components/layouts/DashBoardLayout"
// import SelectDropdown from '../../components/layouts/SelectDropdown';
// import SelectUsers from '../../components/layouts/SelectUsers';
// import TodoInputList from '../../components/Input/TodoInputList';
// import AddAttachmentsInput from '../../components/Input/AddAttachmentsInput';
// import DeleteAlert from '../../components/DeleteAlert';
// import Model from '../../components/Model';


// function CreateTask() {

//   const location = useLocation();
//   const {taskId} = location.state || {};
//   const navigate = useNavigate();

//   const [taskData, setTaskData] = useState({
//     title:"",
//     description:"",
//     priority:"Low",
//     dueDate:"",
//     assignedTo:"",
//     todoChecklist:[],
//     attachments:[],
//   });

//   const [currentTask, setCurrentTask] = useState(null);
//   const[error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const[openDeleteAlert, setOpenDeleteAlert] = useState(false);

//   const handleValueChange = (key, value) =>{
//     setTaskData((prevData)=>({...prevData, [key]:value}));
//   };


//   const clearData = () =>{
//     //reset form
//     setTaskData({
//        title:"",
//     description:"",
//     priority:"Low",
//     dueDate:null,
//     assignedTo:"",
//     todoChecklist:[],
//     attachments:[],
//     });
//   };


//   //create Task
//   const CreateTask = async () =>{
//     setLoading(true);

//     try {
//       const todolist = taskData.todoChecklist?.map((item)=>({
//         text:item,
//         completed:false,
//       }));

//       const  response = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK,{
//         ...taskData,
//        dueDate: taskData.dueDate ? new Date(taskData.dueDate).toISOString() : null,     // dueDate: new Date(taskData.dueDate).toISOString(),
 

//         todoChecklist:todolist,
//       });
      
//       toast.success("Task created successfully");

//       clearData();

      
//     } catch (error) {
//       console.log("Error craeting the Task", error);
//       setLoading(false);
//     }finally{
//       setLoading(false);
//     }
//   };

//   //update Task
//   const updateTask = async () => {
//     setLoading(true);

//     try {
//       const todolist = taskData.todoChecklist?.map((item)=>{
//         const prevTodoChecklist = currentTask?.todoChecklist || [];
//         const matchedTask = prevTodoChecklist.find((task)=>task.text == item);

//         return{
//           text:item,
//           completed:matchedTask ? matchedTask.completed : false,
//         };
//       });

//       const response = await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK(taskId),{
//         ...taskData,
//         dueDate: new Date(taskData.dueDate).toISOString(),
//         todoChecklist: todolist,
//       });

//       toast.success("Task updated successfully");
      
//     } catch (error) {

//       console.log("Error creating task", error);
//       setLoading(false);
//     }finally{
//       setLoading(false);
//     }
//   };

//   //get task info by id
//   const getTaskDetailsByID = async () =>{
//     try {
//       const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(taskId));

//       if(response.data){
//         const taskInfo = response.data;
//         setCurrentTask(taskInfo);

//         setTaskData((prevData)=>({
//           title:taskInfo.title,
//           description:taskInfo.description,
//           priority:taskInfo.priority,
//           dueDate:taskInfo.dueDate ? moment(taskInfo.dueDate).format("YYYY-MM-DD"):null, assignedTo:taskInfo.assignedTo?.map((item)=> item?._id) || [], 
//           todoChecklist:taskInfo.todoChecklist?.map((item)=> item?.text) || [],
//           attachments:taskInfo?.attachments || []
          
//         }))
//       }
      
//     } catch (error) {
//       console.log("Error fetching users", error);
      
//     }
//   };

//   //delete Task
//   const deleteTask = async () =>{
//     try {
//       await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));

//       setOpenDeleteAlert(false);
//       toast.success("Expense details deleted successfully");
//       navigate('/admin/tasks');
      
//     } catch (error) {
//       console.log("Error deleting expense",error.response?.data?.message || error.message);
//     }
//   };

//   useEffect(() => {
//     if(taskId)
//       getTaskDetailsByID(taskId)
  
//     return () => { }
//   }, [taskId])
  

//   const handleSubmit = async () =>{
//     setError(null);
  

//   //input validation
//   if(!taskData.title.trim()){
//     setError("Title is required");
//     return;
//   }

//   if(!taskData.description.trim()){
//     setError("Description is required");
//     return;
// }

// if(!taskData.dueDate){
//     setError("Due Date is required");
//     return;
// }

// if(taskData.assignedTo?.length === 0){
//   setError("Task not assigned to any member");
//   return;
// }

// if(taskData.todoChecklist?. length === 0){
//   setError("Add atleast one todo Task");
//   return;
// }

// if(taskId){
//   updateTask();
//   return;
// }

// CreateTask();
// }


  





//   return (
//     <DashBoardLayout activeMenu="Create Task">
//       <div className='mt-5'>
//         <div className='grid grid-cols-1 md:grid-cols-4 mt-4'>
//           <div className='form-card col-span-3'>
//             <div className='flex items-center justify-between'>
//               <h2 className='text-xl md:text-xl font-medium'>{taskId ? "Update Task" : "Create Task"}</h2>

//               {taskId && (
//                 <button className='flex items-center gap-1.5 text-2xl font-medium text-rose-500 bg-rose-400 rounded-full px-3 py-1 border border-rose-100
//                 hover:border-rose-300 cursor-pointer' onClick={()=> setOpenDeleteAlert(true)}>

//                   <LuTrash2 className='text-base'/>Delete

//                 </button>
//               )}
//             </div>

//             <div>
//               <label className='text-xs font-medium text-slate-600'>Task Title</label>

//               <input
//               placeholder='Create App UI'
//               className='form-input'
//               value={taskData.title}
//               onChange={({target})=> handleValueChange("title", target.value)}/>
//             </div>

//             <div className='mt-3'>
//               <label className='text-xs font-medium text-slate-600'>Description</label>
//             </div>

//             <textarea placeholder='Describe Task' className='form-input' rows={4} value={taskData.description} onChange={({target})=> handleValueChange("description", target.value)}/>


//                <label>Priority</label>

//             <SelectDropdown options={PRIORITY_DATA} value={taskData.priority} onChange={(value)=> handleValueChange("priority", value)}
//             placeholder="Select Priority"/>

//              <div className='col-span-6 md:col-span-4'>
//             <label className='text-xs font-medium text-slate-600'>Due Date</label>
//           </div>

//           <input
//           placeholder='Create App UI'
//           className='form-input'
//           value={taskData.dueDate}
//           onChange={({target})=> handleValueChange("dueDate", target.value)} 
//           type='date'/>

//            <div className='col-span-12 md:col-span-3'>
//             <label className='text-xs font-medium text-slate-600'>Assign To</label>

//             <SelectUsers
//             selectedUsers = {taskData.assignedTo}
//             setSelectedUsers= {(value)=>{handleValueChange("assignedTo", value);
              
//             }}/>

//             <div className='mt-3'>
//               <label className='text-xs font-medium text-slate-600'>ToDO Checklist</label>

//               <TodoInputList 
//               todoChecklist={taskData?. todoChecklist}
//               setToDOList={(value)=> handleValueChange("todoChecklist", value)}/>

//               <div className='mt-3'>
//                 <label className='text-xs font-medium text-slate-600'>Add Attachments</label>
//               </div>

//               <AddAttachmentsInput
//               attachments={taskData?.attachments}
//               setAttachments={(value)=> handleValueChange("attachments", value)}/>

//             </div>
//           </div>

//           {error && (
//             <p className='text-xs font-medium text-red-500'>{error}</p>
//           )}

//           <div className='flex justify- mt-7'>
//             <button className='add-btn'
//             onClick={handleSubmit}
//             disabled={loading}
//             >
//               {taskId ? "UPDATE TASK" : "CREATE TASK"}
//             </button>
//           </div>

//           </div>

          
//         </div>
//       </div>


//      {openDeleteAlert && (
//   <Model
//     isOpen={openDeleteAlert}
//     onClose={() => setOpenDeleteAlert(false)}
//     title="Delete Task"
//   >
//     <DeleteAlert
//       content="Are you sure you want to delete this task?"
//       onDelete={deleteTask}
//       onCancel={() => setOpenDeleteAlert(false)}
//     />
//   </Model>
// )}

        
//     </DashBoardLayout>
    
//   )
// }

// export default CreateTask



import { useEffect, useState } from "react";
import { PRIORITY_DATA } from "../../utils/data";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { LuTrash2 } from "react-icons/lu";

import DashBoardLayout from "../../components/layouts/DashBoardLayout";
import SelectDropdown from "../../components/layouts/SelectDropdown";
import SelectUsers from "../../components/layouts/SelectUsers";
import TodoInputList from "../../components/Input/TodoInputList";
import AddAttachmentsInput from "../../components/Input/AddAttachmentsInput";
import DeleteAlert from "../../components/DeleteAlert";
import Model from "../../components/Model";

function CreateTask() {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  });

  const [currentTask, setCurrentTask] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  // handle field changes
  const handleValueChange = (key, value) => {
    setTaskData((prev) => ({ ...prev, [key]: value }));
  };

  // reset form data
  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: "",
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    });
  };

  // ✅ Create task API call
  const createTaskAPI = async () => {
    setLoading(true);
    try {
      const todoList = taskData.todoChecklist.map((item) => ({
        text: item,
        completed: false,
      }));

      const response = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
        ...taskData,
        dueDate: taskData.dueDate
          ? new Date(taskData.dueDate).toISOString()
          : null,
        todoChecklist: todoList,
      });

      toast.success("Task created successfully");
      clearData();
      navigate("/admin/tasks");
    } catch (error) {
      console.error("Error creating the task:", error);
      toast.error(error.response?.data?.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update task API call
  // const updateTask = async () => {
  //   setLoading(true);
  //   try {
  //     const todoList = taskData.todoChecklist.map((item) => {
  //       const prevTodoChecklist = currentTask?.todoChecklist || [];
  //       const matched = prevTodoChecklist.find((task) => task.text === item);
  //       return {
  //         text: item,
  //         completed: matched ? matched.completed : false,
  //       };
  //     });

  //     await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK(taskId), {
  //       ...taskData,
  //       dueDate: taskData.dueDate
  //         ? new Date(taskData.dueDate).toISOString()
  //         : null,
  //       todoChecklist: todoList,
  //     });

  //     toast.success("Task updated successfully");
  //     navigate("/admin/tasks");
  //   } catch (error) {
  //     console.error("Error updating task:", error);
  //     toast.error(error.response?.data?.message || "Failed to update task");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // ✅ Update task (fully fixed)
const updateTask = async () => {
  setLoading(true);
  try {
    // Convert todoChecklist into expected format
    const todoList = taskData.todoChecklist.map((item) => {
      if (typeof item === "string") {
        return { text: item, completed: false };
      }
      return {
        text: item.text || "",
        completed: item.completed || false,
      };
    });

    const payload = {
      title: taskData.title.trim(),
      description: taskData.description.trim(),
      priority: taskData.priority,
      dueDate: taskData.dueDate
        ? new Date(taskData.dueDate).toISOString()
        : null,
      assignedTo: Array.isArray(taskData.assignedTo)
        ? taskData.assignedTo
        : [],
      todoChecklist: todoList,
      attachments: taskData.attachments || [],
    };

    console.log("🧾 Update payload:", payload);

    const response = await axiosInstance.put(
      API_PATHS.TASKS.UPDATE_TASK(taskId),
      payload
    );

    toast.success("Task updated successfully");
    navigate("/admin/tasks");
  } catch (error) {
    console.error("Error updating task:", error);
    const message =
      error.response?.data?.message ||
      "Server error (500). Please check backend logs.";
    toast.error(message);
  } finally {
    setLoading(false);
  }
};


  // ✅ Get task details (for update mode)
  const getTaskDetailsByID = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(taskId)
      );

      if (response.data) {
        const taskInfo = response.data;
        setCurrentTask(taskInfo);
        setTaskData({
          title: taskInfo.title,
          description: taskInfo.description,
          priority: taskInfo.priority,
          dueDate: taskInfo.dueDate
            ? moment(taskInfo.dueDate).format("YYYY-MM-DD")
            : "",
          assignedTo:
            taskInfo.assignedTo?.map((item) => item?._id) || [],
          todoChecklist:
            taskInfo.todoChecklist?.map((item) => item?.text) || [],
          attachments: taskInfo.attachments || [],
        });
      }
    } catch (error) {
      console.error("Error fetching task:", error);
      toast.error("Failed to fetch task details");
    }
  };

  // ✅ Delete task

const deleteTask = async () => {
  try {
    await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));
    setOpenDeleteAlert(false);
    toast.success("Task deleted successfully");
    navigate("/admin/tasks"); // go back to the task list
  } catch (error) {
    console.error("Error deleting task:", error);
    toast.error(error.response?.data?.message || "Failed to delete task");
  }
};


  // Load task if editing
  useEffect(() => {
    if (taskId) getTaskDetailsByID();
  }, [taskId]);

  // ✅ Handle submit
  const handleSubmit = async () => {
    setError(null);

    // form validation
    if (!taskData.title.trim()) {
      setError("Title is required");
      return;
    }

    if (!taskData.description.trim()) {
      setError("Description is required");
      return;
    }

    if (!taskData.dueDate) {
      setError("Due date is required");
      return;
    }

    if (!Array.isArray(taskData.assignedTo) || taskData.assignedTo.length === 0) {
      setError("Please assign the task to at least one member");
      return;
    }

    if (!Array.isArray(taskData.todoChecklist) || taskData.todoChecklist.length === 0) {
      setError("Add at least one todo item");
      return;
    }

    // decide create or update
    if (taskId) {
      updateTask();
    } else {
      createTaskAPI();
    }
  };

  return (
    <DashBoardLayout activeMenu="Create Task">
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-3">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">
                {taskId ? "Update Task" : "Create Task"}
              </h2>

              {taskId && (
                <button
                  className="flex items-center gap-1.5 text-sm font-medium text-rose-600 bg-rose-100 rounded-full px-3 py-1 hover:bg-rose-200"
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <LuTrash2 className="text-base" />
                  Delete
                </button>
              )}
            </div>

            {/* Task title */}
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Task Title
              </label>
              <input
                placeholder="Create App UI"
                className="form-input"
                value={taskData.title}
                onChange={({ target }) =>
                  handleValueChange("title", target.value)
                }
              />
            </div>

            {/* Description */}
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Description
              </label>
              <textarea
                placeholder="Describe the task..."
                className="form-input"
                rows={4}
                value={taskData.description}
                onChange={({ target }) =>
                  handleValueChange("description", target.value)
                }
              />
            </div>

            {/* Priority */}
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Priority
              </label>
              <SelectDropdown
                options={PRIORITY_DATA}
                value={taskData.priority}
                onChange={(value) => handleValueChange("priority", value)}
                placeholder="Select Priority"
              />
            </div>

            {/* Due date */}
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Due Date
              </label>
              <input
                className="form-input"
                type="date"
                value={taskData.dueDate}
                onChange={({ target }) =>
                  handleValueChange("dueDate", target.value)
                }
              />
            </div>

            {/* Assign users */}
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Assign To
              </label>
              <SelectUsers
                selectedUsers={taskData.assignedTo}
                setSelectedUsers={(value) =>
                  handleValueChange("assignedTo", value)
                }
              />
            </div>

            {/* Todo checklist */}
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                To-Do Checklist
              </label>
              <TodoInputList
                todoChecklist={taskData.todoChecklist}
                setToDOList={(value) =>
                  handleValueChange("todoChecklist", value)
                }
              />
            </div>

            {/* Attachments */}
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Add Attachments
              </label>
              <AddAttachmentsInput
                attachments={taskData.attachments}
                setAttachments={(value) =>
                  handleValueChange("attachments", value)
                }
              />
            </div>

            {/* Error message */}
            {error && (
              <p className="text-xs font-medium text-red-500 mt-3">{error}</p>
            )}

            {/* Submit button */}
            <div className="flex justify-end mt-7">
              <button
                className="add-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {taskId ? "UPDATE TASK" : "CREATE TASK"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete modal */}
      {openDeleteAlert && (
        <Model
          isOpen={openDeleteAlert}
          onClose={() => setOpenDeleteAlert(false)}
          title="Delete Task"
        >
          <DeleteAlert
            content="Are you sure you want to delete this task?"
            onDelete={deleteTask}
            onCancel={() => setOpenDeleteAlert(false)}
          />
        </Model>
      )}
    </DashBoardLayout>
  );
}

export default CreateTask;
