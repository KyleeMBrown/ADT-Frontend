import {React, useState, useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../supabaseClient'
import axios from 'axios'
import { MyImages } from '../Components/myImages'
import { DeleteModal } from '../Components/deleteModal'


const url = import.meta.env.VITE_API_URL;

  // GET Images
  const getImages = async(id) =>{
    try{
      const response = axios.get(`${url}/images/${id}`)
      
      console.log(response)
      return response;
    }catch(err){
      console.log(err)
    }
  }

export const Dashboard = () => {
  const Navigate = useNavigate();

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

  const [imageNames, setImageNames] = useState()
  const [folderNames, setFolderNames] = useState()
  const [imagePaths, setImagePaths] = useState()
  const [imageResponse, setImageResponse] = useState()
  const [imgPath, setImgPath] = useState()
  const [showPreview, setShowPreview] = useState()

  const [errorImage, setErrorImage] = useState("")
  const [loadImage, setLoadImage] = useState(false)
  const [deleteFileModal, setDeleteFileModal] = useState(false)
  const [fileToDelete, setFileToDelete] = useState()
  const [deleteModalType, setDeleteModalType] = useState()
  const [imageToDelete, setImageToDelete]= useState();
  const [imageToDeleteName, setImageToDeleteName] = useState();
  
  const [deleteAcc, setDeleteAcc] = useState(false)
  // AUTHENTICATE AND GRAB SESSION -- on page load
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

  

  // GET files function
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


  const retrieveImages = async(id) =>{
    try{
      if (id){
        const response = await getImages(id)
        console.log(response)
        setImageResponse(response)
        setImageNames(response.data.imageNames)
        setFolderNames(response.data.folderNames)
        setImagePaths(response.data.paths)
        
      }
      
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    retrieveImages(userId)
  }, [userId])

  // GET Files -- on page load
  useEffect(()=>{
    const retrieveFiles = async(id) => {
      try{
        const response = await getFiles(id)
      }catch(err){
        
      }
    }
    
    retrieveFiles(userId)
  }, [userId])


  
  // UPLOAD FITS FILE TO SUPABASE -- on change
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

  // Display images
  const displayImage = (path) =>{
    setImgPath(path)
  }

  // GENERATE IMAGES - on click
  const generateImages = async() =>{
    try{
      setErrorImage(null)
      setPaths(null)
      setShowPreview(false)
      setLoadImage(true)
      const response = await axios.post(`${url}/upload/images/${userId}`, {
        "name":currentFile.name
      })
      setLoadImage(false)
      setPaths(response.data.paths)
      setShowPreview(false)
      retrieveImages(userId)
      //console.log(response)
    }catch(error){
      setLoadImage(false)
      console.log(error)
      setErrorImage("Error file has no images")
    }
  }

  const setPreview = () =>{
    setShowPreview(true)
  }
  
  // delete account

  const deleteAccount = async() =>{
    try{
      console.log(userId)
      const response = axios.delete(`${url}/user/delete-user/${userId}`)
      if (response){
        Navigate("/")
      }
    }catch(err){
      
      console.log(err, userId)
    }
    
  }
  return (
    <div className="w-full h-full home-gradient flex items-center justify-center">
      {/* Dashboard */}
      <div className="w-[75%] h-[85%] p-[1em] border rounded-md rounded-tr-none rounded-br-none">
        <div className="w-full h-full gap-[1em] flex items-center justify-center">
          {paths && !showPreview ? paths.map((path, index) => (
            <img className="w-[30%]" key ={index} src={path}></img>
          )) :<p className="text-red-600 font-bold font-mono">{errorImage}</p>}
          {loadImage ? (<div className="loader"></div>):null}
          {imgPath && showPreview ? 
          (<div className="flex flex-col justify-center align-center">
            {/*<center className="mb-[2em]"><a href={imgPath} target="_blank" className="file-home-gradient bg-white p-[0.5em] hover:text- text-[rgb(32,76,91)] border bg-transparent text-center w-[25%] ">Open</a></center>*/}
            <img src={imgPath}></img> 
            <br></br>
            <button onClick={()=>{setImageToDelete(imgPath.split('user-storage/')[1].split('?')[0]), setImageToDeleteName(imgPath.split('images')[1].split('?')[0]), setDeleteFileModal(true), setDeleteModalType("image")}} className="p-[0.5em] bg-red-600 rounded-md hover:bg-red-800 text-white font-mono">Delete Image</button>
          </div>)
          : null}
        </div>
        {/* OPTIONS DISPLAY POPUP */}
        <div style={{height:(fileClicked) ? "25%" : "0", transition:"ease all 0.3s"}} className="w-[75%] left-[2.5%] home-gradient absolute bottom-[7.5%] flex flex-col justify-center items-center border rounded-br-none rounded-bl-md">
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
          <div className="w-full h-[25%] border rouned-md overflow-y-scroll overflow-x-hidden">
            {(userFiles) ? (userFiles.map((file, index) => (
              (file['name'] !== ".emptyFolderPlaceholder") ? (<div key={index} onClick={()=>{setFileClicked(true), setCurrentFile(file)}} className="w-full bg-white max-[500px]:flex-wrap max-[500px]:h-auto  file-home-gradient hover:cursor-pointer border h-[1em] mb-[5px] flex items-center text-[0.6em] font-mono justify-between p-[1em]">{file['name']}<p className="font-mono font-extrabold text-red-800 pl-[5px] pr-[5px] rounded-[5px] bg-white hover:scale-105 flex items-center justify-center" onClick={() =>{setDeleteFileModal(true), setFileToDelete(file.name), setDeleteModalType("file")}}>X</p></div>) : null
            ))) :
            (<div className="w-full h-full flex items-center justify-center"><p className ="loader"></p></div>)
            }
            {/*<p className="w-full bg-white h-[1em] mb-[5px] flex items-center text-[0.8em] font-mono justify-start p-[1em]">Sample-file</p>*/}
          </div>
          <MyImages name ="My Images:" showPreview = {setPreview} displayImage={displayImage} imageNames={imageNames} folderNames={folderNames} paths={imagePaths} response={imageResponse}></MyImages>
          
        </div>
        
        {/* Choose A file */}
        <div className="w-full h-[10%] max-[500px]:text-[8px] max-[500px]:bg-green- rounded-br-md flex max-[500px]:flex-wrap items-center justify-center">
          <input 
            ref = {fileInput}
            onChange={(e)=>{
            const file = e.target.files[0]
            const userId = user['id']
            //setFile(file)
            uploadFile(file, userId)}} 
            type="file" 
            accept='.fits' 
            className="w-[80%] text-white max-[500px]:w-[7.55em]"></input>
        </div>
      </div>
      {/* Hidden/Outside of dashboard */}
      {(deleteFileModal) ? (<DeleteModal fileToDelete={fileToDelete} userId ={userId} setModal ={setDeleteFileModal} refreshFiles={getFiles} refreshImages={retrieveImages} resetCurrentFile={setCurrentFile} resetCurrentImage={displayImage} imagePath={imageToDelete}  imageName={imageToDeleteName} type={deleteModalType}></DeleteModal>) : null}
      <p className="absolute top-[0.5em] left-[2em] p-[0.3em] rounded-md border text-white hover:scale-[103%] cursor-pointer active:scale-100" onClick={signOut}>SignOut</p>
      <p onClick={()=>{setDeleteAcc(true)}} className="absolute bottom-[0.5em] left-[2em] p-[0.5em] rounded-md border bg-red-600 text-white hover:scale-[103%] cursor-pointer active:scale-100" >Delete Account</p>

     {deleteAcc ? <div className="absolute bg-[#18161696] gap-[1.5em] w-full h-full text-white backdrop-blur-xl flex items-center flex-col justify-center"><p>are you sure you want to DELETE your account?</p><p className=' italic '>This is permanent</p><div className="flex justify-center items-center gap-[1em]"><a onClick={deleteAccount} className="bg-green-600 rounded-[5px] cursor-pointer p-[0.3em] w-[3em] text-center">Yes</a><a onClick={()=>{setDeleteAcc(false)}} className="bg-gray-600 rounded-[5px] cursor-pointer p-[0.3em] w-[3em] text-center">No</a></div></div> : null}
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