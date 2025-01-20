import {React, useState} from 'react'
import Input from '../Components/SignUp/Input'
import axios from 'axios';

const url = import.meta.env.VITE_API_URL;

export const SignUp =() => {
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPass, setConfirmPass] = useState();

  const sendUserInfo = async(fullName, email, password) =>{
    try{
      if(password == confirmPass){
        const data = await axios.post(`${url}/user/sign-up`, {
          fullName:fullName,
          email: email,
          password:password
        })
        console.log(data)
      }
      return data;
    }catch(error){
      console.log(error)
    }
  }

  const signUp = async() =>{
    try{
      const response = await sendUserInfo(fullName, email, password)
      return response
    }catch(err){
      console.log(`error: ${err}`)
    }
    
  }

  return (
    <div className="w-full h-full bg-cover bg-center flex items-center justify-center bg-[url('/Images/pexels-zaktech90-9209812.jpg')]">
        <div className="w-[40%] home-gradient shadow-lg h-[40%] rounded-[5px] bg-blue-300 flex flex-col items-center justify-center">
            
            <input value={fullName || ''} onChange={(e)=>{setFullName(e.target.value)}} placeholder="Full Name" className="h-[2.5em] rounded-md pl-[0.5em] text-[0.8em] font-mono w-[80%] placeholder:text-white text-white border-white border-[1px] bg-transparent p-[0.3em] outline-none" type="text"></input>
            <br></br>
            <input value={email || ''} onChange={(e)=>{setEmail(e.target.value)}} placeholder="email" className="h-[2.5em] rounded-md pl-[0.5em] text-[0.8em] font-mono w-[80%] placeholder:text-white text-white border-white border-[1px] bg-transparent p-[0.3em] outline-none" type="text"></input>
            <br></br>
            <Input value={password || ''} onChange={(e)=>{setPassword(e.target.value)}} width={"80%"} placeholder="create a password"></Input>
            <br></br>
            <Input value={confirmPass || ''} onChange={(e)=>{setConfirmPass(e.target.value)}} width={"80%"} placeholder="confirm password"></Input>
            <br></br>
            <button onClick={signUp} className="text-white p-[0.5em] rounded-[5px] bg-transparent border">SignUp</button>

        </div>
    </div>
  )
}
