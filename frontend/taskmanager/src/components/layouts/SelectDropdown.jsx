import React, { useState } from 'react'

import  {LuChevronDown} from "react-icons/lu";

function SelectDropdown({options,value, onChange, placeholder}) {

  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) =>{
    onchange(option);
    setIsOpen(false);
  }
  return (
    
    <div className=''>
      {/* //Dropdown button */}
      <button className='' onClick={()=> setIsOpen(!isOpen)}>
        {value ? options.find((opt)=> opt.value === value)?.label : placeholder}
        <span className=''>{isOpen ? <LuChevronDown className=''/> : <LuChevronDown/>
        }</span>
      </button>

      {/* DropwDown menu */}
        {isOpen && (
          <div className=''>
            {options.map((option)=>(
              <div className='' key={option.value} onClick={()=> handleSelect(option.value)}> {option.value}
                </div>
            ))}
            </div>

        )}

    </div>
  )
}

export default SelectDropdown