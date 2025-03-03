import {React, useEffect, useState} from 'react'
import Navigation from '../Components/Home/Navigation'
import axios from 'axios';

export const Home = () => {

const [patchNotes, setPatchNotes] = useState();

const url = import.meta.env.VITE_API_URL;

useEffect(()=>{
  const getPatchNotes = async() =>{
    try{
      const response = await axios.get(`${url}/get-patch-notes`)
      const data = response.data;
      setPatchNotes(data)
      console.log(data)
    }catch(err){
      console.log(err)
    }
  }
   getPatchNotes()
}, [])



  return (
    <div className="w-full bg-[url('/Images/pexels-zaktech90-9209812.jpg')] bg-center bg-cover h-full items-center font-mono justify-center">
      <Navigation></Navigation>
      <div className="w-full flex justify-center items-center flex-col  h-full">
        
        <div className="w-[65%] flex items-center justify-center p-[5em] max-[500px]:p-0 max-[500px]:w-[90%] backdrop-blur-sm max-[500px]:h-[50%] border border-gray-500">
          <div className="text-left home-gradient p-[2em] max-[500px]:w-[85%] max-[500px]:h-[90%] max-[500px]:text-[12px] rounded-[5px] text-white">
            <h1 className="text-[2em]">Welcome to the Astronomy Data Tool (ADT)</h1>
            <br></br>
            <h2 className="text-[1.2em]">Developers:</h2>
            <h2>-- Austin Zickur</h2>
            <h2>-- Kylee Brown</h2>
            <br></br>
            <h2 className="text-[12px]">Patch Notes:</h2>
            <div className="w-full h-[auto] border flex justify-evenly items-center">
                  <p className="text-[0.75em] border-r w-full border-l pl-2 pr-2">Version</p>
                  <p className="text-[0.75em] border-r w-full border-l pl-2 pr-2">Title</p>
                  <p className="text-[0.75em] border-r w-full border-l pl-2 pr-2">Description</p>
                  <p className="text-[0.75em] border-r w-full pl-2 pr-2 ml-[2%]">Date</p>
                </div>
              <div className="w-[100%] p-[0.5em] h-[3.5em] border overflow-y-scroll">
                {/* map each note onto UI */}
                { patchNotes ? patchNotes.map((note, index)=>(
                  (<div key={index} className="w-full hover:bg-white hover:text-black mb-[0.5em] h-[auto] border flex justify-evenly items-center">
                    <p className="text-[0.65em] ">{note.version}</p>
                    <p className="text-[0.65em]">{note.title}</p>
                    <div className="w-[25%] flex justify-center items-center pt-[0.2em] h-[2em] overflow-x-hidden overflow-y-scroll">
                      <p className="text-[0.65em]">{note.description}</p>
                    </div>
                    <p className="text-[0.65em]">{note.created_at}</p>
                  </div>)
                )) : (<div className="w-full h-full flex items-center justify-center"><div className="loader"></div></div>)}
              </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[100%]  justify-center items-center home-gradient">
        <div className="h-[60%] border p-[1em] overflow-hidden">
          <h1 className="text-[1.2em] text-white mb-[0.5em]">Software Description:</h1>
          <iframe className="w-full h-full " src="/PDFs/Authors.pdf"></iframe>
        </div>
       <div className="h-[40%] flex text-white flex-col border ">
       <h1 className="text-[1.2em]  p-[1em]">About the Authors</h1>
       <div className="w-full pl-[2em] h-[8em] border flex items-center justify-around">
        <p className=" max-[760px]:text-[0.75em]">* Austin</p>
         {/* LinkedIn */}
         <a href="https://www.linkedin.com/in/austin-zickur-8b13a8292/" target="_blank">
        <div className="flex items-center justify-center"> 
                  <img className="w-[15%] max-[760px]:w-[14%]" src="/Images/icons8-linkedin-96.png"></img>
                  <p className="ml-[0.5em] max-[760px]:text-[0.75em] underline">Austin Zickur</p>
        </div>
        </a>
        {/* Email */}
       
        <div className="flex max-[760px]:text-[0.75em] items-center justify-center"> 
                  <img className="w-[10%] max-[760px]:w-[11%]" src="/Images/icons8-email-52.png"></img>
                  <p className="ml-[0.5em] underline">azickur2@illinois.edu</p>
        </div>
        {/* End Links */}
       </div>
       <div className="w-full pl-[2em] h-[8em] border flex items-center justify-around">
        <p className=" max-[760px]:text-[0.65em]" >* Kylee</p>
        {/* LinkedIn */}
        <a href="https://www.linkedin.com/in/kylee-brown-7167b9274/" target="_blank">
        <div className="flex items-center justify-center"> 
                  <img className="w-[16%] max-[760px]:w-[15%]" src="/Images/icons8-linkedin-96.png"></img>
                  <p className="ml-[0.5em] max-[760px]:text-[0.75em] underline">Kylee Brown</p>
        </div>
        </a>
        {/* Email */}
       
        <div className="flex max-[760px]:text-[0.75em] items-center justify-center"> 
                  <img className="w-[10%] max-[760px]:w-[10%]" src="/Images/icons8-email-52.png"></img>
                  <p className="ml-[0.5em] underline">kyleebrown.work@gmail.com</p>
        </div>
        {/* End Links */}
       </div>
       </div>
      </div>
      <div></div>
    </div>
  )
}
