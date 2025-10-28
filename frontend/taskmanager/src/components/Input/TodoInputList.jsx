import React, { useState } from 'react'

import { HiMiniPlus, HiOutlineTrash} from "react-icons/hi2"

function TodoInputList({todoChecklist, setToDOList}) {
    const[option, setOption]= useState("");

    //function to handle adding option
    const handleAddOption =() =>{
        if(option.trim()){
            setToDOList([...todoList, option.trim()]);
        }
    };

    //function to handle delete option
    const handleDeleteOption =(index)=>{
        const updatedArr = todoList.filter((_, idx) => idx !== index);
        setToDOList(updatedArr);
    };

  return (
    <div>
        {todoList.map((item, index)=>{
            <div
            key={item}
            className=''>

                <p className=''><span className=''>
                    {index <9 ? `0${index + 1}` : index + 1}</span>{item}</p>

                    <button className=''
                    onClick={()=>{
                        handleDeleteOption(index);
                    }}>

                        <HiOutlineTrash className=''/>

                    </button>
            </div>

        })}

        <div className=''>

            <input
            type='text'
            placeholder='Enter Task'
            value={option}
            onChange={({target})=> setOption(target.value)}
            className=''/>

            <button className='' onClick={handleAddOption}>
                <HiMiniPlus className=''/>
            </button>

        </div>
    </div>
  )
}

export default TodoInputList