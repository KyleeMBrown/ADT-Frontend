import {React} from 'react'

export let MyImages = ({name, imageNames, folderNames, paths, response, displayImage, showPreview}) => {


  return (
    <>
      <p className=" w-full text-left text-white text-[10px] mt-[1em] mb-[0.5em] font-mono">{name}</p>
      <div className="w-full flex flex-col items-center justify-start h-[30%] border overflow-y-scroll overflow-x-hidden">
        {response ? imageNames.map((imageName, index)=>(
        <div onClick={()=>{displayImage(paths[index]) , showPreview()}} key={index} className="w-full h-[2em] max-[500px]:h-auto max-[500px]:flex-wrap  cursor-pointer pt-[1.5em] pb-[1.5em] flex bg-transparent border mb-[0.5em] items-center justify-between max-[500px]:justify-center">
          <img className="w-[2em] ml-[0.5em]" src={paths[index]}></img>
        <p className="text-white max-[500px]:h-auto font-mono mr-[1em] text-[12px] max-[500px]:text-[7px] max-[500px]:pl-[1em] max-[500px]:p-[0.5em] max-[500px]:text-center">{`${imageName} -- ${folderNames[index]}`}</p>
        </div>
        )) : <p>No images</p>}
       
      </div>
    </>
    
  )
}

