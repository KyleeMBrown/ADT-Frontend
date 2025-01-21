import {React, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../supabaseClient'


function Dashboard() {
  const nav = useNavigate()
  const [user, setUser] = useState()

useEffect(() => {
  const fetchUserId = async () => {
    try{
      // Get the current user session
      const { data: { user } } = await supabase.auth.getUser()
      console.log("session grabbed")
      if (user) {
        //setUser(users); // Extract and save the user ID
        console.log(user);
      }
    }catch(err){
      console.log("error fetching user session", err)
      nav('/signin')
    }
  };
  fetchUserId()
},[])

  return (
    <div className="w-full h-full home-gradient flex items-center justify-center">
      {/* Dashboard */}
      <div className="w-[75%] h-[85%] border rounded-md rounded-tr-none rounded-br-none">

      </div>
      {/* Right side file box */}
      <div className="rounded-tr-md rounded-br-md border w-[20%] border-l-0 h-[80%]">
        {/* My Files */}
        <div className="w-full p-[5px] flex items-center justify-start flex-col h-[90%]">
          <h1 className="p-[0.5em] border w-full font-mono text-center mb-[1em] rounded-[5px] text-white">File Explorer</h1>
          <h3 className=" w-full text-left mb-[5px] text-white font-mono text-[10px]">My files:</h3>
          <div className="w-full h-[25%] border rouned-md overflow-y-scroll">
            <p className="w-full bg-white h-[1em] mb-[5px] flex items-center text-[0.8em] font-mono justify-start p-[1em]">Sample-file</p>
            <p className="w-full bg-white h-[1em] mb-[5px] flex items-center text-[0.8em] font-mono justify-start p-[1em]">Sample-file</p>
            <p className="w-full bg-white h-[1em] mb-[5px] flex items-center text-[0.8em] font-mono justify-start p-[1em]">Sample-file</p>
            <p className="w-full bg-white h-[1em] mb-[5px] flex items-center text-[0.8em] font-mono justify-start p-[1em]">Sample-file</p>
            <p className="w-full bg-white h-[1em] mb-[5px] flex items-center text-[0.8em] font-mono justify-start p-[1em]">Sample-file</p>
            <p className="w-full bg-white h-[1em] mb-[5px] flex items-center text-[0.8em] font-mono justify-start p-[1em]">Sample-file</p>
            <p className="w-full bg-white h-[1em] mb-[5px] flex items-center text-[0.8em] font-mono justify-start p-[1em]">Sample-file</p>
            <p className="w-full bg-white h-[1em] mb-[5px] flex items-center text-[0.8em] font-mono justify-start p-[1em]">Sample-file</p>
            <p className="w-full bg-white h-[1em] mb-[5px] flex items-center text-[0.8em] font-mono justify-start p-[1em]">Sample-file</p>
            
          </div>
        </div>
        {/* Choose A file */}
        <div className="w-full h-[10%] rounded-br-md flex items-center justify-center">
        <input type="file" accept='.fits' className="w-[80%] text-white"></input>
        </div>
        
      </div>
    </div>
  )
}

export default Dashboard