import { useEffect, useState } from 'react'
// import Nav from '../component/Dashboard/Nav'
// import Header from '../component/Dashboard/Header'
// import Main from '../component/Dashboard/Main'
// import { Outlet } from 'react-router-dom'
// import UseResponsive from '../hooks/useResponsive'

export default function RestaurantLayout({ children }) {
  // const lg =UseResponsive()
  // const [isOpen,setOpen] =useState((isOpen)=>{
  //   if(lg=='lg')return isOpen=true
  //   else return isOpen=false
  // })
  const handleOpen = () => {
    setOpen(true)
  }
  // useEffect(()=>{
  //   if(lg==='lg')setOpen(true)
  //   else setOpen(false)
  // },[lg])

  return (
    <div className='bg-[#F9FAFB]'>
      {/* <Header handleOpen={handleOpen}/> */}
      <div className='flex flex-col lg:flex-row'>
        {/* <Nav isOpen ={isOpen} setOpen={setOpen} /> */}
        {/* Outlet used to renders the current route selected */}
        {/* <Main><Outlet/></Main> */}
        <div>{children}</div>
      </div>
    </div>
  )
}
