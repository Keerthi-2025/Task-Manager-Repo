// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import axiosInstance from '../../utils/axiosInstance';
// import { API_PATHS } from '../../utils/apiPath';
// import DashBoardLayout from '../../components/layouts/DashBoardLayout';
// import moment from 'moment';
// import AvatarGroup from "../../components/AvatarGroup";
// import { LuSquareArrowUpRight } from 'react-icons/lu';

// function ViewTaskDetails() {

//   const {id} = useParams (null);
//   const[task, setTask] = useState(null);

//   const getStatusTagColor = (status)=>{
//     switch(status){
//       case "In Progress":
//       return "text-cyan-500 bg-cyan-50 border border-cyan-500";

//       case "Completed":
//       return "text-indigo-500 bg-indigo-50 border border-indigo-500";

//      default:
//      return "text-violet-500 bg-violet-50 border border-violet-500";
        
//     }
//   };

//   //get task info by ID
//   const getTaskDetaisByID = async () =>{
//     try {
//       const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(id));

//       if(response.data){
//         const TaskInfo = response.data;
//         setTask(TaskInfo);
//       }
      
//     } catch (error) {
//       console.log("Error fetching users", error);
      
//     }
//   };

//   //handle todo cheklist
//   const updateTodoChecklist = async () =>{};

//   //handle attachment link Click
//   const handleLinkClick = (link) =>{
//     window.open(link, "_blank");
//   };

//   useEffect(() => {
//     if(id){
//       getTaskDetaisByID();
//     }
  
//     return () => {}
//   }, [id]);


  
//   return (
//     <DashBoardLayout activeMenu="My Tasks">
//       <div className='mt-5'>
//        { task && (<div className='grid grid-cols-1 md:grid-cols-4 mt-4'>
//           <div className='form-card col-span-3'>
//             <div className='flex items-center justify-between'>
//               <h2 className='text-sm md:text-xl font-medium'>{task?.title}</h2>

//               <div className={`text-[13px] font-medium ${getStatusTagColor(task?.status)} px-4 py-0.5 rounded`}>
//                 {task?.status}
//               </div>

//               <div className='mt-4'>
//                 <InfoBox label = "Description" value={task?.description}/> 
//               </div>
              

//               < div className='grid grid-cols-12 gap-4 mt-4'>
//                 <div className='col-span-6 md:col-span-4'>
//                   <InfoBox label = "Priority" value={task?.priority}/>
//                 </div>

//                 <div className='mt-2'>
//                   <label className='text-xs font-medium text-slate-500'>Todo Checklist</label>

//                   {task?.todoChecklist?.map((item, index) =>(
//                     <TodoChecklist
//                     key={`todo_${index}`}
//                     text ={item.text}
//                     isChecked={item?.completed}
//                     onChange={()=> updateTodoChecklist(index)}/>
//                   ))}
//                 </div>

//               {task?.attachments?.length > 0 && (
//   <div className='mt-2'>
//     <label className='text-xs font-medium text-slate-500'>Attachments</label>

//     {task.attachments.map((link, index) => (
//       <Attachment
//         key={`link_${index}`}
//         link={link}
//         index={index}
//         onClick={() => handleLinkClick(link)}
//       />
//     ))}
//   </div>
// )}

                



//                 <div className='cols-span-6 md:col-span-4'>
//                   <InfoBox 
//                   label="Due Date"
//                   value={task?.dueDate ? moment(task?.dueDate).format("Do MMM YYYY"): "N/A"}/>
//                 </div>

//                 <div className='cols-span-6 md:col-span-4'>
//                   <label className='text-xs font-medium text-slate-500'>Assigned To</label>

//                   <AvatarGroup avatars = {task?.assignedTo?.map((item)=> item?.profileImageUrl) || []} maxVisible={5}/>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>)}
//       </div>
//     </DashBoardLayout>
//   )
// }

// export default ViewTaskDetails;

// const InfoBox = ({label, value})=>{
//   return <>
//   <label className='text-xs font-medium text-slate-500'>{label}</label>

//   <p className='text-[12px] md:text-[13px] font-medium text-gray-700 mt-1'>{value}</p>
  
//   </>
// };


// const TodoChecklist=({text, isChecked, onChange}) =>{
//   return <div className='flex items-center gap-3 p-3'>
//     <input
//     type='checkbox'
//     checked={isChecked}
//     onChange={onChange}
//     className='w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 rounded-sm outline-none cursor-pointer'/>

//     <p className='text-[13px] text-gray-800'>{text}</p>
//   </div>
// }

//  const Attachment =({link, index, onClick})=>{
//     return <div className='flex justify-between bg-gray-50 border-gray-100 py-2 rounded-md mb-3 mt-2  cursor-pointer'
//     onClick={onClick}>

//       <div className='flex-1 items-center gap-3 border border-gray-100'>
//         <span className='text-xs text-gray-400 font-semibold mr-2'>{index < 9 ? `0${index + 1}` : index + 1}</span>

//         <p className='tet-xs text-black'>{link}</p>
//       </div>

//       <LuSquareArrowUpRight className='text-gray-400'/>


//     </div>
//  }


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import DashBoardLayout from '../../components/layouts/DashBoardLayout';
import moment from 'moment';
import AvatarGroup from "../../components/AvatarGroup";
import { LuSquareArrowUpRight } from 'react-icons/lu';

function ViewTaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  const getStatusTagColor = (status) => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-cyan-50 border border-cyan-500";
      case "Completed":
        return "text-indigo-500 bg-indigo-50 border border-indigo-500";
      default:
        return "text-violet-500 bg-violet-50 border border-violet-500";
    }
  };

  // Fetch task by ID
  const getTaskDetaisByID = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(id));
      if (response.data) {
        setTask(response.data);
      }
    } catch (error) {
      console.log("Error fetching task:", error);
    }
  };

  const updateTodoChecklist = async (index) => {
    const todoChecklist = [... task?.todoChecklist];
    const taskId = id;

    if(todoChecklist && todoChecklist[index]){
      todoChecklist[index].completed = !todoChecklist[index].completed;

      try {
        const response = await axiosInstance.put(API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(taskId), {todoChecklist});

        if(response.status == 200){
          setTask(response.data?.task || task);
        } else{
          todoChecklist[index].completed= !todoChecklist[index].completed;     //optionally revert the toggle if the API Call fails
        }
        
      } catch (error) {
        todoChecklist[index].completed = !todoChecklist[index].completed;
        
      }
    }
   
  };

  const handleLinkClick = (link) => {
    if(!/^https?:\/\//i.test(link)){
      link="https://" + link;  //default to HTTPS

    }
    window.open(link, "_blank");
  };

  useEffect(() => {
    if (id) getTaskDetaisByID();
  }, [id]);

  return (
    <DashBoardLayout activeMenu="My Tasks">
      <div className="mt-5">
        {task && (
          <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
            <div className="form-card col-span-3">
              
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-sm md:text-xl font-medium">{task?.title}</h2>
                <div className={`text-[13px] font-medium ${getStatusTagColor(task?.status)} px-4 py-0.5 rounded`}>
                  {task?.status}
                </div>
              </div>

              {/* Description */}
              <div className="mt-4">
                <InfoBox label="Description" value={task?.description || "No description"} />
              </div>

              {/* Task Info Grid */}
              <div className="grid grid-cols-12 gap-4 mt-4">
                <div className="col-span-6 md:col-span-4">
                  <InfoBox label="Priority" value={task?.priority || "N/A"} />
                </div>

                <div className="col-span-6 md:col-span-4">
                  <InfoBox
                    label="Due Date"
                    value={task?.dueDate ? moment(task?.dueDate).format("Do MMM YYYY") : "N/A"}
                  />
                </div>

                <div className="col-span-6 md:col-span-4">
                  <label className="text-xs font-medium text-slate-500">Assigned To</label>
                  <AvatarGroup
                    avatars={task?.assignedTo?.map((item) => item?.profileImageUrl) || []}
                    maxVisible={5}
                  />
                </div>
              </div>

              {/* Checklist */}
              <div className="mt-4">
                <label className="text-xs font-medium text-slate-500">Todo Checklist</label>
                {task?.todoChecklist?.length > 0 ? (
                  task.todoChecklist.map((item, index) => (
                    <TodoChecklist
                      key={`todo_${index}`}
                      text={item.text}
                      isChecked={item?.completed}
                      onChange={() => updateTodoChecklist(index)}
                    />
                  ))
                ) : (
                  <p className="text-xs text-gray-400 mt-1">No checklist items</p>
                )}
              </div>

              {/* Attachments */}
              {task?.attachments?.length > 0 ? (
                <div className="mt-4">
                  <label className="text-xs font-medium text-slate-500">Attachments</label>
                  {task.attachments.map((link, index) => (
                    <Attachment
                      key={`link_${index}`}
                      link={link}
                      index={index}
                      onClick={() => handleLinkClick(link)}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400 mt-1">No attachments</p>
              )}
            </div>
          </div>
        )}
      </div>
    </DashBoardLayout>
  );
}

export default ViewTaskDetails;

const InfoBox = ({ label, value }) => (
  <>
    <label className="text-xs font-medium text-slate-500">{label}</label>
    <p className="text-[12px] md:text-[13px] font-medium text-gray-700 mt-1">{value}</p>
  </>
);

const TodoChecklist = ({ text, isChecked, onChange }) => (
  <div className="flex items-center gap-3 p-2">
    <input
      type="checkbox"
      checked={isChecked}
      onChange={onChange}
      className="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 rounded-sm cursor-pointer"
    />
    <p className={`text-[13px] ${isChecked ? 'line-through text-gray-400' : 'text-gray-800'}`}>{text}</p>
  </div>
);

const Attachment = ({ link, index, onClick }) => (
  <div
    className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 border border-gray-100 px-3 py-2 rounded-md mb-2 cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-center gap-3 overflow-hidden">
      <span className="text-xs text-gray-400 font-semibold">{index < 9 ? `0${index + 1}` : index + 1}</span>
      <p className="text-xs text-black truncate max-w-[200px]">{link}</p>
    </div>
    <LuSquareArrowUpRight className="text-gray-400" />
  </div>
);
