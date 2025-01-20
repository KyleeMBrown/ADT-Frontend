import {React, useState} from 'react'

export const Input = ({width, onChange, onClick, value, placeholder}) => {

    const [Type, setType] = useState(true)

    const toggleHidePass = () =>{
        setType((prev)=>!prev)
    }

  return (
    <>
        <div style={{width:width}} className=" bg-transparent h-[2.5em] rounded-lg text-[0.8em] font-mono placeholder:text-white text-white border-white border-[1px] flex">
        <input value={value} onClick={onClick} className="bg-transparent  outline-none w-[100%] pl-[0.3em] placeholder:text-white" placeholder={placeholder} type={Type ? 'password':'text'} onChange={onChange}></input>
        <img onClick={toggleHidePass} className="hover:cursor-pointer hover:scale-110 active:scale-100 w-[8%] pr-[5px] p-[0.5em] " src="/Images/icons8-eye-48.png"></img>
        </div>
        
    </>
    
  )
}

export default Input