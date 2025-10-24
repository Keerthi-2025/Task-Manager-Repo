import React from 'react'
import moment from 'moment';

function TaskListTable({tableData}) {

    const getStatusBadgeColor = (status) =>{
        switch(status){
            case 'Completed': return 'bg-green-100 text-green-500 border border-green-200';
            case 'Pending': return 'bg-purple-500 text-purple-200 border border-purple-200';
            case 'In progress': return 'bg-gray-900 text-gray-900 border border-gray-200';
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
    <div className='overflow-x-auto rounded-lg mt-3'>
        <table className='min-w-full'>
            <thead>
                <tr className='text-left'>
                    <th className='py-3 px-4 text-gray-800 font-medium'>Name</th>
                    <th className='py-3 px-4 text-gray-800 font-medium'>Status</th>
                    <th className='py-3 px-4 text-gray-800 font-medium'>Priority</th>
                    <th className='py-3 px-4 text-gray-800 font-medium hidden md:table-cell'>Created On</th>
                </tr>
            </thead>

            <tbody>
                {tableData.map((task) =>(
                    <tr key={task._id} className='border-t border-gray-200'>
                        <td className='my-3 mx-4 text-gray-700 line-clamp-1 overflow-hidden'>{task.title}</td>

                        <td className='py-3 px-4'>
                            <span className= {`px-2 py-1 text-xs rounded-full inline-block ${getStatusBadgeColor(task.status)}`}>{task.status}</span>
                        </td>

                        <td className='py-4 px-4'>
                        <span className= {`px-2 py-2 text-xs rounded-full inline-block ${getPriorityBadgeColor(task.priority)}`}>{task.priority}</span>
                        </td>

                        <td className='py-4 px-4 text-gray-700 text-nowrap hidden md:table-cell'>{task.createdAt ? moment(task.createdAt).format('Do MMM YYYY'): 'N/A'}</td>
                    </tr>
                ))}
            </tbody>

        </table>
    </div>
  )
}

export default TaskListTable