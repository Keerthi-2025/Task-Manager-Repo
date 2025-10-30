// import React from 'react'

// import Progress from "../Progress";
// import AvatarGroup from "../AvatarGroup";
// import { LuPaperclip } from 'react-icons/lu';
// import moment from 'moment';

// function TaskCard({
//     key,
//     title,
//     description,
//     priority,
//     status,
//     progress,
//     createdAt,
//     dueDate,
//     assignedTo,
//     attachments,
//     completedTodoCount,
//     todoChecklist       
// }) {


//     const getStatusTagColor =()=>{
//         switch(status){
//             case "In Progress":
//                 return "text-cyan-500 bg-cyan-50 border border-cyan-500";

//                  case "Completed":
//                 return "text-lime-500 bg-lime-50 border border-lime-500";

//                  default:
//                 return "text-violet-500 bg-violet-50 border border-violet-500";
//         }
//     };


//     const getPriorityTagColor =()=>{
//         switch(priority){
//             case "Low":
//                 return "text-emerald-500 bg-emerald-50 border border-emerald-500";

//                  case "Medium":
//                 return "text-amber-500 bg-amber-50 border border-amber-500";

//                  default:
//                 return "text-rose-500 bg-rose-50 border border-rose-500";
//         }
//     };

//   return <div className='bg-white rounded-xl py-4 shadow-md shadow-gray-100 border border-gray-200 cursor-pointer' onClick={onClick}>

//         <div className='flex items-end gap-3 px-4'>

//             <div className={`text-[11px] font-medium ${getStatusTagColor()} px-4 py-0.5 rounded-full`}>
//                 {status}
//             </div>

//             <div className={`text-[11px] font-medium ${getPriorityTagColorTagColor()} px-4 py-0.5 rounded-full`}>
//                 {priority}
//             </div>
//     </div>

//     <div className={`px-4 border-l-[13px] 
//     ${status === "In Progress"  ? "border-cyan-400": 
//         status === "Completed" ? "border-lime-500"
//     }}>


//      <p className="text-sm font-medium text-gray-800 mt-4 line-clamp-2">{title}</p>

//     <p className="text-sm font-medium text-gray-800 mt-1.5 line-clamp-2 leading-[18px]">{description}</p>

//      <p className="text-[13px] text-gray-700 font-medium mt-2 mb-2 leading-[18px]">Task Done:{""}
//      <span className='font-semibold text-gray-700'>{completedTodoCount} / {todoChecklist.length  || 0}</span></p>

//      <Progress progress={progress} status={status}/>

//     </div>


//     <div className='px-4'>
//         <div className='flex items-center justify-between my-1 '>
//             <label className='text-xs text-gray-500'>Start Date
//                 <p className='text-[13px] font-medium text-gray-900'>{moment(createdAt).format("Do MMM YYYY")}</p>
//             </label>
//         </div>

//         <div>
//             <label className='text-xs text-gray-500'>Due Date</label>
//                 <p className='text-[13px] font-medium text-gray-900'>{moment(createdAt).format("Do MMM YYYY")}</p>
//         </div>

//     </div>

//     <div className='flex items-center justify-between mt-3'>
//         <AvatarGroup avatars={assignedTo || []} />

//         {attachmentCount > 0 && (
//             <div className='flex items-center gap-2 bg-blue-50 px-2.5 py-1.5 rounded-lg'>
//                 <LuPaperclip className='text-blue-500'/>{" "}<span className='text-xs text-gray-900'>{attachmentCount}</span>
//             </div>
//         )}
//     </div>

  
// }


// export default TaskCard


import React from 'react';
import AvatarGroup from '../../AvatarGroup';
import { LuPaperclip } from 'react-icons/lu';
import moment from 'moment';
import Progress from '../../Progress';

function TaskCard({
  title,
  description,
  priority,
  status,
  progress,
  createdAt,
  dueDate,
  assignedTo,
  attachments = [],
  completedTodoCount = 0,
  todoChecklist = [],
  onClick, // ✅ added this prop
}) {
  const getStatusTagColor = () => {
    switch (status) {
      case 'In Progress':
        return 'text-cyan-500 bg-cyan-50 border border-cyan-500';
      case 'Completed':
        return 'text-lime-500 bg-lime-50 border border-lime-500';
      default:
        return 'text-violet-500 bg-violet-50 border border-violet-500';
    }
  };

  const getPriorityTagColor = () => {
    switch (priority) {
      case 'Low':
        return 'text-emerald-500 bg-emerald-50 border border-emerald-500';
      case 'Medium':
        return 'text-amber-500 bg-amber-50 border border-amber-500';
      default:
        return 'text-rose-500 bg-rose-50 border border-rose-500';
    }
  };

  const attachmentCount = attachments?.length || 0;

  return (
    <div
      className="bg-white rounded-xl py-4 shadow-md shadow-gray-100 border border-gray-200 cursor-pointer"
      onClick={onClick}
    >
      {/* Status + Priority */}
      <div className="flex items-end gap-3 px-4">
        <div
          className={`text-[11px] font-medium ${getStatusTagColor()} px-4 py-0.5 rounded-full`}
        >
          {status}
        </div>

        <div
          className={`text-[11px] font-medium ${getPriorityTagColor()} px-4 py-0.5 rounded-full`}
        >
          {priority}
        </div>
      </div>

      {/* Task Info */}
      <div
        className={`px-4 border-l-[13px] ${
          status === 'In Progress'
            ? 'border-cyan-400'
            : status === 'Completed'
            ? 'border-lime-500'
            : 'border-violet-500'
        }`}
      >
        <p className="text-sm font-medium text-gray-800 mt-4 line-clamp-2">
          {title}
        </p>

        <p className="text-sm text-gray-700 mt-1.5 line-clamp-2 leading-[18px]">
          {description}
        </p>

        <p className="text-[13px] text-gray-700 font-medium mt-2 mb-2 leading-[18px]">
          Task Done:{' '}
          <span className="font-semibold text-gray-700">
            {completedTodoCount} / {todoChecklist?.length || 0}
          </span>
        </p>

        <Progress progress={progress} status={status} />
      </div>

      {/* Dates */}
      <div className="px-4 mt-2">
        <div className="flex items-center justify-between my-1">
          <label className="text-xs text-gray-500">
            Start Date
            <p className="text-[13px] font-medium text-gray-900">
              {moment(createdAt).format('Do MMM YYYY')}
            </p>
          </label>
        </div>

        <div>
          <label className="text-xs text-gray-500">Due Date</label>
          <p className="text-[13px] font-medium text-gray-900">
            {moment(dueDate).format('Do MMM YYYY')}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 px-4">
        <AvatarGroup avatars={assignedTo || []} />

        {attachmentCount > 0 && (
          <div className="flex items-center gap-2 bg-blue-50 px-2.5 py-1.5 rounded-lg">
            <LuPaperclip className="text-blue-500" />
            <span className="text-xs text-gray-900">{attachmentCount}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskCard;
