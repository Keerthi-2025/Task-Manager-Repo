import React, { useState } from 'react'

import  {LuChevronDown} from "react-icons/lu";

function SelectDropdown({options,value, onChange, placeholder}) {

  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) =>{
    onchange(option);
    setIsOpen(false);
  }
  return (
    
    <div className='relative w-full'>
      {/* //Dropdown button */}
      <button className='w-full text-sm text-black outline-none bg-white border border-slate-200 px-2 py-2 rounded-md mt-2 flex justify-between items-center' onClick={()=> setIsOpen(!isOpen)}>
        {value ? options.find((opt)=> opt.value === value)?.label : placeholder}
        <span className='ml-2'>{isOpen ? <LuChevronDown classNarotate-180me=''/> : <LuChevronDown/>
        }</span>
      </button>

      {/* DropwDown menu */}
        {isOpen && (
          <div className='absolute w-full bg-white border border-slate-200 rounded-md mt-1 shadow-md z-10 '>
            {options.map((option)=>(
              <div className='px-3 py-2 cursor-pointer hover:bg-gray-200' key={option.value} onClick={()=> handleSelect(option.value)}> {option.value}
                </div>
            ))}
            </div>

        )}

    </div>
  )
}

export default SelectDropdown