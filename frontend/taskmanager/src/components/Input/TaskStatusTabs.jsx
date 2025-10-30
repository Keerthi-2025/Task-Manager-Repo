// import React from 'react'

// function TaskStatusTabs({ tabs,activeMenu,activeTab}) {
//   return (
//     <div className='my-2'>
//         <div className='flex'>
//             {tabs.map((tab)=>{
//                 <button 
//                 key={tab.label}
//                 className={`relative px-3 md:px-4 py-2 text-sm font-medium ${activeMenu === tab.label 
//                     ? 'text-blue-400' : 'text-gray-500 hover:text-gray-700'} cursor-pointer`}
//                     onClick={()=>setActiveTab(tab.label)}>
//                         <div>
//                             <span className='text-xs'>{tab.label}</span>
//                             <span 
//                              className={`text-xs px-3 md:px-4 py-2 ml-2 rounded-full font-medium ${activeTab === tab.label 
//                     ? 'bg-blue-400 text-black' : 'bg-gray-200 text-gray-600' }`}>
//                     {tab.count}</span>
//                         </div>

//                         {activeTab === tab.label && (
//                             <div className='absolute bottom-0 left-0 w-full h-0.5 bg-blue-900'></div>
//                         )}
//                     </button>
//             })}
//         </div>
//     </div>
//   )
// }

// export default TaskStatusTabs


import React from 'react';

function TaskStatusTabs({ tabs, activeMenu, activeTab }) {
  return (
    <div className='my-2'>
      <div className='flex'>
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`relative px-3 md:px-4 py-2 text-sm font-medium ${
              activeMenu === tab.label
                ? 'text-blue-400'
                : 'text-gray-500 hover:text-gray-700'
            } cursor-pointer`}
            onClick={() => activeTab(tab.label)}
          >
            <div className='flex items-center'>
              <span className='text-xs'>{tab.label}</span>
              <span
                className={`text-xs px-2 py-1 ml-2 rounded-full font-medium ${
                  activeMenu === tab.label
                    ? 'bg-blue-400 text-black'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {tab.count}
              </span>
            </div>

            {activeMenu === tab.label && (
              <div className='absolute bottom-0 left-0 w-full h-0.5 bg-blue-900'></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TaskStatusTabs;
