import {React, useState} from 'react'
import Input from '../Components/SignUp/Input';
//import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';
import supabase from '../supabaseClient'

//const url = import.meta.env.VITE_API_URL;

export const SignIn = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [errorMessage, setErrorMessage] = useState()
    

    const sendSigninInfo = async(email, password) =>{
        try{
            if(email && password){
                const { response } = await supabase.auth.signInWithPassword({
                    "email": email,
                    "password": password
                })
             
                return response
            }else{
                setErrorMessage("email and password required")
            }
        }catch(err){
            console.log(`message: ${err.response.data.error}`)
            const message = err.response.data.error
            setErrorMessage(message)
            throw err
            //console.log(`error connecting to api: ${err.data.response.message}`)
           
        }
    }

    const handleAnonSignIn = async()=>{
        try{
            const { data, error } = await supabase.auth.signInAnonymously()
            if (error){
                console.log(error)
            }
            console.log(data)
            navigate(`/dashboard`)
        }catch(err){
            //const message = err.response.data.error
            //setErrorMessage(message)
            console.log("err")
            //throw err
        } 
    }

    const handleSignIn = async() =>{
        try{
            const response = await sendSigninInfo(email, password)
            navigate('/dashboard') 
            
        }catch(err){
            console.log(`error signing in`)
            //console.log(err)
            
        }
    }

  return (
    <div className="w-full h-full bg-cover bg-center flex items-center justify-center bg-[url('/Images/pexels-zaktech90-9209812.jpg')]">
        <div className="w-[40%] max-[500px]:w-[85%] max-[500px]:h-[50%] home-gradient shadow-lg h-auto rounded-[5px] bg-blue-300 flex flex-col items-center justify-center">
        <h1 className="text-white font-mono pt-[1em] text-[1.5em]">SignIn</h1>
            <br></br>
            <input onClick={()=>{setErrorMessage("")}} onChange={(e)=>{setEmail(e.target.value)}} placeholder="email" className="h-[2.5em] rounded-md pl-[0.5em] text-[0.8em] bg-transparent font-mono w-[80%] placeholder:text-white text-white border-white border-[1px] p-[0.3em] outline-none" type="text"></input>
            <br></br>
            <Input onClick={()=>{setErrorMessage("")}} value={password || ''} onChange={(e)=>{setPassword(e.target.value)}} width={"80%"} placeholder="password"></Input>
            <br></br>
            <div className="flex justify-center items-center gap-[1em]">
            <button onClick={handleSignIn} className="text-white p-[0.5em] rounded-[5px] bg-transparent border hover:scale-105 active:scale-100">SignIn</button>
            <button onClick={handleAnonSignIn} className="text-white p-[0.5em] rounded-[5px] bg-transparent border hover:scale-105 active:scale-100">Sign in <span className="italic">anonymously</span> </button>
            </div>
            <br></br>
            <Link to="/signup" className="text-white underline hover:cursor-pointer text-center">Don't have an account? <br></br>sign Up here</Link>
            <br></br>
            <p className='text-red-500 font-mono text-[0.8em] mb-[0.5em] text-center'>{errorMessage}</p>
            
            
            <Link to="/" className="p-[0.5em] absolute top-[2em] left-[2em] text-white home-gradient rounded-[5px]">Home</Link>
        </div>
    </div>
  )
}
