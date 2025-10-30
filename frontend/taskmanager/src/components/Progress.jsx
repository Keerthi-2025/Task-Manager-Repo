// import React from 'react'



// const Progress=({progress, status})=>{
//     const getColor=()=>{
//         switch(status){
//              case "In Progress":
//                 return "text-cyan-500 bg-cyan-50 border border-cyan-500";

//                  case "Completed":
//                 return "text-indigo-500 bg-indigo-50 border border-indigo-500";

//                  default:
//                 return "text-violet-500 bg-violet-50 border border-violet-500";
//         }
//     }
// }


// function Progress() {
//   return (
//     <div className='w-full bg-gray-200 rounded-full h-1.5'>
//         <div className={`${getColor()} h-1.5 rounded-full text-center text-xs font-medium`} style={{width:`${progress}%`}}>

//         </div>
//     </div>
//   )
// }


// export default Progress

import React from 'react';

const Progress = ({ progress = 0, status = '' }) => {
  const getColor = () => {
    switch (status) {
      case 'In Progress':
        return 'bg-cyan-500';
      case 'Completed':
        return 'bg-lime-500';
      default:
        return 'bg-violet-500';
    }
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-1.5">
      <div
        className={`${getColor()} h-1.5 rounded-full transition-all duration-300`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default Progress;
