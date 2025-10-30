import React from 'react'

function TaskCard({
    key,
    title,
    description,
    priority,
    status,
    progress,
    createdAt,
    dueDate,
    assignedTo,
    attachments,
    completedTodoCount,
    todoChecklist       
}) {


    const getStatusTagColor =()=>{
        switch(status){
            case "In Progress":
                return "text-cyan-500 bg-cyan-50 border border-cyan-500";

                 case "Completed":
                return "text-lime-500 bg-lime-50 border border-lime-500";

                 default:
                return "text-violet-500 bg-violet-50 border border-violet-500";
        }
    };


    const getPriorityTagColor =()=>{
        switch(priority){
            case "Low":
                return "text-emerald-500 bg-emerald-50 border border-emerald-500";

                 case "Medium":
                return "text-amber-500 bg-amber-50 border border-amber-500";

                 default:
                return "text-rose-500 bg-rose-50 border border-rose-500";
        }
    };

  return (
    <div>TaskCard</div>
  )
}

export default TaskCard