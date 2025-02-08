import { useEffect, useState } from 'react'
import Nav from '../components/Dashboard/Nav'
import Header from '../components/Dashboard/Header'
import Main from '../components/Dashboard/Main'
import { Outlet } from 'react-router-dom'
import UseResponsive from '../hooks/useResponsive'
import { ToastContainer } from 'react-toastify'

const Layout = () => {
  const lg = UseResponsive()
  const [isOpen, setOpen] = useState((isOpen) => {
    if (lg == 'lg') return (isOpen = true)
    else return (isOpen = false)
  })
  const handleOpen = () => {
    setOpen(true)
  }
  useEffect(() => {
    if (lg === 'lg') setOpen(true)
    else setOpen(false)
  }, [lg])
  return (
    <div className='bg-[#F9FAFB] h-screen'>
      <ToastContainer limit={1} className='' />
      {/* <Header handleOpen={handleOpen} /> */}
      <div className='flex flex-col lg:flex-row'>
        <Nav isOpen={isOpen} setOpen={setOpen} />
        {/* Outlet used to renders the current route selected */}
        <Main>
          <Outlet />
        </Main>
      </div>
    </div>
  )
}

export default Layout
