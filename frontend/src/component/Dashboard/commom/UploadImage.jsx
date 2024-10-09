import React, { useRef, useState } from 'react'

const UploadImage = ({imgFile,setImgFile}) => {
  const RefInput = useRef('null')
  const [currentUrl,setCurrentUrl] =useState(null)
  const handleImage =(event)=>{
      const files =event.target.files[0]
      if(files){
        setImgFile(files)
      }
      const url = URL.createObjectURL(files)
      if(url){
        setCurrentUrl(url)
      }
      
  }
  const handleInput=()=>{
    if(RefInput.current){
      RefInput.current.click()
    }
  }
  const handleRemove=()=>{
    setCurrentUrl(null)
    if(RefInput.current){
      RefInput.current.value=""
    }
  }
  return (
    <div className='w-full grid gap-1.5 '>
        <label className='first-letter:capitalize text-xl'>Upload Image</label>
        <div  className='h-[64px] border-2 border-solid border-bg-black border-opacity-25 '>
          <input ref={RefInput} onChange={(event)=>handleImage(event)} multiple  type='file' className='hidden' name='image'/>
            {currentUrl ?
            
            (  <div className='flex justify-between px-5 items-center'>
                  <div className='pt-1'>
                      {
                        <img src={currentUrl} className='h-[50px] object-contain' />
                      }
                  </div>
                  <div onClick={()=>handleRemove()}>
                    <i className='bx bx-trash text-xl'></i>
                  </div>
              </div>
            ):(
              <div onClick={()=>handleInput()} className='cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"  className="lucide lucide-cloud-upload mx-auto top-2"><path d="M12 13v8"/><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="m8 17 4-4 4 4"/></svg>
                <p className='text-center'>Click to upload image</p>
              </div>

            )
          }
          

        </div>
        
    </div>
  )
}

export default UploadImage
