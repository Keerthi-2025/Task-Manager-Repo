import React, { useState } from 'react'

import { HiMiniPlus, HiOutlineTrash} from "react-icons/hi2"

function TodoInputList({todoChecklist, setToDOList}) {
    const[option, setOption]= useState("");

    //function to handle adding option
    const handleAddOption =() =>{
        if(option.trim()){
            setToDOList([...todoChecklist, option.trim()]);
            setOption(""); 
        }
    };

    //function to handle delete option
    const handleDeleteOption =(index)=>{
        const updatedArr = todoChecklist.filter((_, idx) => idx !== index);
        setToDOList(updatedArr);
    };

  return (
    <div>
        {todoChecklist.map((item, index)=>(
            <div
            key={item}
            className='flex justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-3 mt-2'>

                <p className='text-xs text-black'>
                    <span className='text-gray-400 font-semibold mr-2'>{index <9 ? `0${index + 1}` : index + 1}</span>{item}</p>

                    <button className='cursor-pointer'
                    onClick={()=>{
                        handleDeleteOption(index);
                    }}>

                        <HiOutlineTrash className='text-lg text-red-500'/>

                    </button>
            </div>

        ))}

        <div className='flex items-center gap-5 mt-4'>

            <input
            type='text'
            placeholder='Enter Task'
            value={option}
            onChange={({target})=> setOption(target.value)}
            className='w-full text-[13px] text-black outline-none border bg-white border-gray-100 px-3 py-2'/>

            <button className='card-btn text-nowrap' onClick={handleAddOption}>
                <HiMiniPlus className='text-sm text-gray-400 font-semibold mr-2'/>
            </button>

        </div>
    </div>
  )
}

export default TodoInputList