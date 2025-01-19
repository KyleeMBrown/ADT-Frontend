import React from 'react'
import Navigation from '../Components/Home/Navigation'

export const Home = () => {
  return (
    <div className="w-full bg-[url('public/Images/pexels-zaktech90-9209812.jpg')] bg-center bg-cover h-full items-center font-mono justify-center">
      <Navigation></Navigation>
      <div className="w-full flex justify-center items-center flex-col  h-full">
        
        <div className="w-[65%] p-[5em] backdrop-blur-sm border border-gray-500">
          <div className="text-left home-gradient p-[2em] rounded-[5px] text-white">
            <h1 className="text-[2em]">Welcome to the Astronomy Data Tool (ADT)</h1>
            <br></br>
            <h2 className="text-[1.2em]">Developers:</h2>
            <h2>-- Austin Zickur</h2>
            <h2>-- Kylee Brown</h2>
            <br></br>
            <h2 className="text-[12px]">Patch Notes:</h2>
              <div className="w-[100%] p-[0.5em] h-[3.5em] border overflow-y-scroll">
                {/* Pull patch notes from supabase and map them here */}
              </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[100%]  justify-center items-center home-gradient">
        <div className="h-[60%] border p-[1em]">
          <h1 className="text-[1.2em] text-white">Software Description:</h1>
        </div>
       <div className="h-[40%] flex text-white flex-col border ">
       <h1 className="text-[1.2em]  p-[1em]">About the Authors</h1>
       <div className="w-full pl-[2em] h-[8em] border flex items-center justify-start">
        <p className="hover:underline hover:cursor-pointer">* Austin</p>
       </div>
       <div className="w-full pl-[2em] h-[8em] border flex items-center justify-start">
        <p className="hover:underline hover:cursor-pointer" >* Kylee</p>
       </div>
       </div>
      </div>
      <div></div>
    </div>
  )
}
