import React from 'react'
import axios from 'axios';

const url = import.meta.env.VITE_API_URL;


export const DeleteModal = ({fileToDelete, userId, setModal, refreshFiles, refreshImages, resetCurrentFile, resetCurrentImage, imagePath, imageName, type}) => {
    const fileName = fileToDelete

    const deleteFile = async() =>{
        try{
            switch(type){
                case("file"):
                    const fileResponse = await axios.delete(`${url}/delete/${fileName}/${userId}`)
                    if(fileResponse){
                        await refreshFiles(userId)
                        resetCurrentFile(null)
                    }
                    break;
                case("image"):
                    const ImageResponse = await axios.post(`${url}/delete/image`, {"imagePath":imagePath})
                    if(ImageResponse){
                        await refreshImages(userId)
                        resetCurrentImage(false)
                    }
                    break;

            }
            setModal(false)
        }catch(err){
            console.log("error using API", err)
        }
    }

    /*const handleDeleteFile = async()=>{
        try{
            response = await deleteFile()
            console.log(response)
        }catch(err){
            console.log("error calling fucntion deleteFile()")
        }
    }*/

  return (
    <div className="w-full h-full absolute flex items-center justify-center backdrop-blur-md">
        <div className=" w-[45%] h-[30%] max-[780px]:w-[90%] max-[780px]:h-[50%] border border-white flex items-center  justify-center flex-col">
            <h2 className="text-white text-center text-[1.5em] font-mono max-[780px]:text-[1em] bg-black w-auto max-[780px]:w-[80%] ">Are you sure you want to delete <span className="font-extrabold text-[1.5em] text-red-500 max-[780px]:text-[1em]">{type === "file" ? (fileToDelete) : (imageName)}</span>? </h2>
            <br></br>
            {type == "file" ? (<p className="text-white font-mono text-center text-[0.75em] italic">This won't delete any corresponding images -- delete those images seperately</p>,
            <br></br>) : null}
            <div className="flex items-center justify-center gap-[1em] ">
                <button className="bg-red-600 text-white rounded-[5px] p-[0.5em]" onClick={deleteFile}>DELETE</button>
                <button className="bg-gray-600 text-white rounded-[5px] p-[0.5em]" onClick={()=>{setModal(false)}}>Cancel</button>
            </div>
        </div>
    </div>
  )
}
