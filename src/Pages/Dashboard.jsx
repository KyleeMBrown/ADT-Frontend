import {React, useState, useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../supabaseClient'
import axios from 'axios'
import { MyImages } from '../Components/myImages'


const url = import.meta.env.VITE_API_URL;

export const Dashboard = () => {
  const fileInput = useRef()
  const nav = useNavigate()
  const [user, setUser] = useState()
  const [userId, setUserId] = useState()
  const [loading, setLoading] = useState(false)
  const [errorModal, setErrorModal] = useState("none")
  const [fileClicked, setFileClicked] = useState(false)
  const [currentFile, setCurrentFile] = useState()
  const [userFiles, setUserFiles] = useState()
  const [paths,setPaths] = useState()

  // AUTHENTICATE AND GRAB SESSION
  useEffect(()=>{
    const fetch = async() => {
      const { data: { session }, error } = await supabase.auth.getSession();
      //console.log(session)
      console.log(session.user)
      setUser(session.user)
      const userId = session?.user['id']
      setUserId(userId)
    }
    fetch()
    
  }, [])

  const getFiles = async(id) => {
      try{
        //console.log(id)
        if (id){
          const response = await axios.get(`${url}/files/${id}`)
          console.log(response.data.response)
          const files = response.data.response
          setUserFiles(files)
        }
        
      }catch(err){
        //console.log(err)
      }
  }

  useEffect(()=>{
    const retrieveFiles = async(id) => {
      try{
        const response = await getFiles(id)
      }catch(err){
        
      }
    }
    
    retrieveFiles(userId)
  }, [userId])

// SIGN OUT
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error("Error signing out:", error.message);
    } else {
        console.log("User signed out successfully.");
        nav('/signin')
    }
  }
  
  // UPLOAD FITS FILE TO SUPABASE
  const uploadFile = async(file, userId) =>{
    const formData = new FormData();
    formData.append('file', file); // Ensure `file` is a File object or Blob
    try{
      setLoading(true)

      const response = await axios.post(`${url}/upload/files/${userId}`, formData)
      //console.log(response)
      getFiles(userId)
    }catch(err){
      if (err.status == 500 ){
        setLoading(false)
        setErrorModal("flex")
        fileInput.current.value = null
        //console.log("resource already in DB")
      }
      
    }
    setLoading(false)
    fileInput.current.value = null
  }

  // GENERATE IMAGES
  const generateImages = async() =>{
    try{
      console.log(currentFile)
      
      const response = await axios.post(`${url}/upload/images/${userId}`, {
        "name":currentFile.name
      })
      setPaths(response.data.paths)
      console.log(response)
    }catch(error){
      console.log(error)
    }
  }
  
  return (
    <div className="w-full h-full home-gradient flex items-center justify-center">
      {/* Dashboard */}
      <div className="w-[75%] h-[85%] p-[1em] border rounded-md rounded-tr-none rounded-br-none">
        <div className="w-full h-full gap-[1em] flex items-center justify-center">
          {paths ? paths.map((path, index) => (
            <img className="w-[30%]" index ={index} src={path}></img>
          )) : <p>No images</p>}
        </div>
        {/* OPTIONS DISPLAY POPUP */}
        <div style={{height:(fileClicked) ? "25%" : "0", transition:"ease all 0.3s"}} className="w-[75%] left-[2.5%] absolute bottom-[7.5%] flex flex-col justify-center items-center border rounded-br-none rounded-bl-md">
          <center onClick={()=>{setFileClicked(false)}} style={{display:(fileClicked) ? "block" : "none"}} className="rotate-180 h-[10%]"><p className="w-[2%] items-center justify-center text-white hover:cursor-pointer pl-[0.5em] pr-[0.5em] hover:scale-[103%] active:scale-100">^</p></center>
          <h3 style={{display:(fileClicked) ? "block" : "none"}} className="font-mono ml-[1em] text-white text-left w-full">{currentFile ? `${currentFile.name}:` : "no file selected"}</h3>
          <div style={{display:(fileClicked) ? "flex" : "none"}} className="w-full h-full flex items-center justify-start p-[1em]">
            <button onClick={generateImages} className="font-mono p-[1em] w-[30%] text-white border rounded-md hover:scale-105 active:scale-100">Generate Images</button>
          </div>
        </div>
      </div>
      {/* Right side file box */}
      <div className="rounded-tr-md rounded-br-md border w-[20%] border-l-0 h-[80%] overflow-y-scroll">
        {/* My Files */}
        <div className="w-full p-[5px] flex items-center justify-start flex-col h-[90%]">
          <h1 className="p-[0.5em] border w-full font-mono text-center mb-[1em] rounded-[5px] text-white">File Explorer</h1>
          <h3 className=" w-full text-left mb-[5px] text-white font-mono text-[10px]">My files:</h3>
          <div className="w-full h-[25%] border rouned-md overflow-y-scroll">
            {(userFiles) ? (userFiles.map((file, index) => (
              (file['name'] !== ".emptyFolderPlaceholder") ? (<p key={index} onClick={()=>{setFileClicked(true), setCurrentFile(file)}} className="w-full bg-white file-home-gradient hover:cursor-pointer border h-[1em] mb-[5px] flex items-center text-[0.6em] font-mono justify-start p-[1em]">{file['name']}</p>) : null
            ))) :
            (<div className="w-full h-full flex items-center justify-center"><p className ="loader"></p></div>)
            }
            {/*<p className="w-full bg-white h-[1em] mb-[5px] flex items-center text-[0.8em] font-mono justify-start p-[1em]">Sample-file</p>*/}
          </div>
          <MyImages name ="My Images:" ></MyImages>
          
        </div>
        
        {/* Choose A file */}
        <div className="w-full h-[10%] rounded-br-md flex items-center justify-center">
          <input 
            ref = {fileInput}
            onChange={(e)=>{
            const file = e.target.files[0]
            const userId = user['id']
            //setFile(file)
            uploadFile(file, userId)}} 
            type="file" 
            accept='.fits' 
            className="w-[80%] text-white"></input>
        </div>
      </div>
      {/* Hidden/Outside of dashboard */}
      <p className="absolute top-[0.5em] left-[2em] p-[0.3em] rounded-md border text-white hover:scale-[103%] cursor-pointer active:scale-100" onClick={signOut}>SignOut</p>
      {(loading) ? 
      (<div className ="absolute flex flex-col items-center justify-center w-full h-full backdrop-blur-md">
          <p className="loader h-[1em]"></p>
          <br></br>
          <p className="text-white italic font-mono text-[0.7em]">may take up to 2 min</p>
        </div>) 
          : null
        }
      <div style={{display:errorModal}} className="absolute flex flex-col items-center justify-center border top-[35%] left-[25%] w-[30%] h-[25%] home-gradient shadow-md rounded-[5px]">
        <p className="text-red-600">Error: file already uploaded</p>
        <br></br>
        <button onClick={()=>{setErrorModal("none")}} className="bg-transparent rounded-md hover:scale-[103%] active:scale-100 text-white border p-[0.3em]">close</button>
      </div>
    </div>
  )
}