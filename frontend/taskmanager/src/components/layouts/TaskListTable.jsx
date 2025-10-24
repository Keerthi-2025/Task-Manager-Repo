import React from 'react'

function TaskListTable({tableData}) {

    const getStatusBadgeColor = (status) =>{
        switch(status){
            case 'Completed': return 'bg-green-100 text-green-500 border border-green-200';
            case 'Pending': return 'bg-purple-500 text-purple-500 border border-purple-200';
            case 'In progress': return 'bg-gray-100 text-gray-500 border border-gray-200';
            default: return 'bg-gray-100 text-gray-500 border border-gray-200';
        }
    };

    const getPriorityBadgeColor = (priority) =>{
        switch(priority){
             case 'High': return 'bg-red-100 text-red-500 border border-red-200';
            case 'Medium': return 'bg-orange-500 text-orange-500 border border-orange-200';
            case 'Low': return 'bg-yellow-100 text-yellow-500 border border-yellow-200';
            default: return 'bg-gray-100 text-gray-500 border border-gray-200';

        }
    }



  return (
    <div>TaskListTable</div>
  )
}

export default TaskListTable