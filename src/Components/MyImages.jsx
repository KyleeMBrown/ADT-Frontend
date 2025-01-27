import React from 'react'

export let MyImages = ({name, object}) => {
  return (
    <>
      <p className=" w-full text-left text-white text-[10px] mt-[1em] mb-[0.5em] font-mono">{name}</p>
      <div className="w-full h-[30%] border overflow-y-scroll">
        <div className="w-full h-[4.5em] p-[1em] flex bg-transparent border mb-[0.5em] items-center justify-between">
          <div className="bg-white w-[2em] h-[2em]"></div>
          <p className="text-white font-mono">FileName</p>
        </div>
        <div className="w-full h-[4.5em] p-[1em] flex bg-transparent border mb-[0.5em] items-center justify-between">
          <div className="bg-white w-[2em] h-[2em]"></div>
          <p className="text-white font-mono">FileName</p>
        </div>
        <div className="w-full h-[4.5em] p-[1em] flex bg-transparent border mb-[0.5em] items-center justify-between">
          <div className="bg-white w-[2em] h-[2em]"></div>
          <p className="text-white font-mono">FileName</p>
        </div>
      </div>
    </>
    
  )
}

