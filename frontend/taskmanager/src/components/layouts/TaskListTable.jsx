import React from 'react'

function TaskListTable({tableData}) {

    const getStatusBadgeColor = (status) =>{
        switch(status){
            case 'Completed': return 'bg-green-100 text-green-500 border border-green-200';
            case 'Pending': return 'bg-purple-500 text-purple-500 border border-purple-200';
            case 'In progress': return 'bg-gray-100 text-gray-500 border border-gray-200';
            default: return 'bg-gray-100 text-gray-500 border border-gray-200';
        }
    }

  return (
    <div>TaskListTable</div>
  )
}

export default TaskListTable