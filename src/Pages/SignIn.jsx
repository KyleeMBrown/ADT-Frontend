import {React, UseState, useState} from 'react'
import Input from '../Components/SignUp/Input';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const url = import.meta.env.VITE_API_URL;

export const SignIn = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [errorMessage, setErrorMessage] = useState()

    const sendSigninInfo = async(email, password) =>{
        try{
            const response = await axios.post(`${url}/user/sign-in`, {
                "email": email,
                "password": password
            })
            navigate("/dashboard")
            console.log(response)
        }catch(err){
            console.log(`message: ${err.response.data.error}`)
            const message = err.response.data.error
            setErrorMessage(message)
            throw err
            //console.log(`error connecting to api: ${err.data.response.message}`)
           
        }
    }

    const handleSignIn = async() =>{
        try{
            const response = await sendSigninInfo(email, password)

        }catch(err){
            console.log(`error signing in`)
        }
    }

  return (
    <div className="w-full h-full bg-cover bg-center flex items-center justify-center bg-[url('/Images/pexels-zaktech90-9209812.jpg')]">
        <div className="w-[40%] home-gradient shadow-lg h-auto rounded-[5px] bg-blue-300 flex flex-col items-center justify-center">
        <h1 className="text-white font-mono pt-[1em] text-[1.5em]">SignIn</h1>
            <br></br>
            <input onClick={()=>{setErrorMessage("")}} onChange={(e)=>{setEmail(e.target.value)}} placeholder="email" className="h-[2.5em] rounded-md pl-[0.5em] text-[0.8em] font-mono w-[80%] placeholder:text-white text-white border-white border-[1px] bg-transparent p-[0.3em] outline-none" type="text"></input>
            <br></br>
            <Input onClick={()=>{setErrorMessage("")}} value={password || ''} onChange={(e)=>{setPassword(e.target.value)}} width={"80%"} placeholder="password"></Input>
            <br></br>
            <button onClick={handleSignIn} className="text-white p-[0.5em] rounded-[5px] bg-transparent border">SignIn</button>
            <br></br>
            <p className='text-red-500 font-mono text-[0.8em] text-center'>{errorMessage}</p>
        </div>
    </div>
  )
}
