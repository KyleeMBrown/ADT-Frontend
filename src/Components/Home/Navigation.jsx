import React from 'react'
import { Link } from 'react-router-dom'

export const Navigation = () => {
  return (
    <div className="w-full absolute top-0 home-gradient text-white  p-[1.5em] flex justify-between">
        <Link to="/" className="hover:text-yellow-600">Astronomy Data Tool</Link>
       
        <div className="">
        <Link className="mr-[1em] text-gray-800 hover:text-yellow-600 p-[0.5em] bg-white rounded-lg">SignUp</Link>
        <Link className="hover:text-yellow-600">SignIn</Link>
        </div>
        
    </div>
  )
}

export default Navigation