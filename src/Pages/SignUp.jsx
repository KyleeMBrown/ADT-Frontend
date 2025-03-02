import {React, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../Components/SignUp/Input'
import axios from 'axios';

const url = import.meta.env.VITE_API_URL;

export const SignUp =() => {
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const [userExistsMessage, setUserExistsMessage] = useState()
  const [successMess, setSuccessMess] = useState()

  const nav = useNavigate()
  // check if user Exists
  const checkIfUserexists = async(email) =>{
    try{
      const data = await axios.get(`${url}/user/check-if-user-exists/${email}`)
      console.log(data)

      return data;
    }catch(error){
      console.log(error)
      
      setUserExistsMessage(error.response.data.message)
    }
  }

  // Send User Info
  const sendUserInfo = async(fullName, email, password) =>{
    try{
      const userDoesNotExist = await checkIfUserexists(email)
      if(password === confirmPass && userDoesNotExist){
        const data = await axios.post(`${url}/user/sign-up`, {
          fullName:fullName,
          email: email,
          password:password
        })
        console.log(data)
        if (data){
          nav('/signin')
        }
        
        //setSuccessMess(`Sign Up Successful! - Check ${email} for your verification link`)
      }else{
        console.log("error")
      }
      return data;
    }catch(error){
      console.log(error)
    }
  }


// Handle Sign up
  const signUp = async() =>{
    try{
      setSuccessMess("")
      const response = await sendUserInfo(fullName, email, password)
      console.log(response)
      return response
    }catch(err){
      console.log(`error: ${err}`)
    }
    
  }

  return (
    <div className="w-full h-full bg-cover bg-center flex items-center justify-center bg-[url('/Images/pexels-zaktech90-9209812.jpg')]">
        <div className="w-[40%] home-gradient max-[500px]:w-[85%] shadow-lg h-auto rounded-[5px] bg-blue-300 flex flex-col items-center justify-center">
            <h1 className="text-white font-mono pt-[1em] text-[1.5em]">SignUp</h1>
            <br></br>
            <input onClick={()=>{setUserExistsMessage("")}} value={fullName || ''} onChange={(e)=>{setFullName(e.target.value)}} placeholder="Full Name" className="h-[2.5em] rounded-md pl-[0.5em] text-[0.8em] font-mono w-[80%] placeholder:text-white text-white border-white border-[1px] bg-transparent p-[0.3em] outline-none" type="text"></input>
            <br></br>
            <input onClick={()=>{setUserExistsMessage("")}} value={email || ''} onChange={(e)=>{setEmail(e.target.value)}} placeholder="email" className="h-[2.5em] rounded-md pl-[0.5em] text-[0.8em] font-mono w-[80%] placeholder:text-white text-white border-white border-[1px] bg-transparent p-[0.3em] outline-none" type="text"></input>
            <br></br>
            <Input onClick={()=>{setUserExistsMessage("")}} value={password || ''} onChange={(e)=>{setPassword(e.target.value)}} width={"80%"} placeholder="create a password"></Input>
            <br></br>
            <Input onClick={()=>{setUserExistsMessage("")}} value={confirmPass || ''} onChange={(e)=>{setConfirmPass(e.target.value)}} width={"80%"} placeholder="confirm password"></Input>
            <br></br>
            
            <button onClick={signUp} className="text-white p-[0.5em] rounded-[5px] bg-transparent border">SignUp</button>
            <br></br>
            <a href="/signin/" className="text-center underline text-white">Already have an account?<br></br>signin</a>
            <br></br>
            <p className='text-red-600 font-mono p-[0.5em]'>{userExistsMessage}</p>
            <p className='text-green-600 font-mono text-[0.8em] text-center pb-[0.5em]'>{successMess}</p>
        </div>
    </div>
  )
}
