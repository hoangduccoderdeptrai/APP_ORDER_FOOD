import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { routes } from '~/configs'
import { IoMdClose } from 'react-icons/io'
import { Button } from '~/components/ui/Button'
import LoginModal from '../_components/LoginModal'
import useAuth from '~/stores/useAuth'
import LogoutModal from '../_components/LogoutModal'
import { Avatar } from '@mui/material'

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user } = useAuth()

  const [userInfo, setUserInfo] = useState(user)
  console.log(userInfo)

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isOpen])

  return (
    <div className='md:hidden'>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={toggleSidebar}
      ></div>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 p-5 transition-transform transform flex flex-col justify-between ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          backgroundImage: 'url("src/assets/images/bg-login.png")',
        }}
      >
        <div>
          <IoMdClose
            className='text-white mb-6 font-bold text-3xl text-right cursor-pointer ml-auto'
            onClick={toggleSidebar}
          />

          {userInfo && (
            <div className='p-3 mx-auto cursor-pointer mb-8 hover:bg-secondary/10 rounded-xl'>
              <div className='flex gap-3 justify-start'>
                <Avatar sx={{ width: 32, height: 32 }} src={userInfo?.avatar?.url} alt='avatar' />
                <div className='text-white flex-col gap-1 text-sm justify-start'>
                  <p className='font-bold text-[15px]'>{userInfo?.username}</p>
                  <p>{userInfo?.email}</p>
                </div>
              </div>
            </div>
          )}

          <nav className='flex flex-col gap-4'>
            <NavLink
              to={routes.HOME}
              className={({ isActive }) =>
                isActive
                  ? 'text-yellow-200 font-medium half-underline text-lg'
                  : 'text-white font-medium hover:text-yellow-200'
              }
              onClick={toggleSidebar}
            >
              Trang chủ
            </NavLink>
            <NavLink
              to={routes.MENU}
              className={({ isActive }) =>
                isActive
                  ? 'text-yellow-200 font-medium half-underline text-lg'
                  : 'text-white font-medium hover:text-yellow-200'
              }
              onClick={toggleSidebar}
            >
              Món ăn
            </NavLink>
            <NavLink
              to={routes.ABOUTUS}
              className={({ isActive }) =>
                isActive
                  ? 'text-yellow-200 font-medium half-underline text-lg'
                  : 'text-white font-medium hover:text-yellow-200'
              }
              onClick={toggleSidebar}
            >
              Giới thiệu
            </NavLink>

            {userInfo && (
              <NavLink
                to={routes.ORDER_TRACKING}
                className={({ isActive }) =>
                  isActive
                    ? 'text-yellow-200 font-medium half-underline text-lg'
                    : 'text-white font-medium hover:text-yellow-200'
                }
                onClick={toggleSidebar}
              >
                Lịch sử đơn hàng
              </NavLink>
            )}
          </nav>
        </div>

        {!userInfo ? (
          <div className='flex flex-col mb-6 gap-3.5'>
            <Button variant='outline' className='border-primary text-primary'>
              Đăng ký
            </Button>
            <LoginModal setUserInfo={(user) => setUserInfo(user)}>
              <Button className='bg-primary hover:bg-primary w-full'>Đăng nhập</Button>
            </LoginModal>
          </div>
        ) : (
          <LogoutModal setUserInfo={(user) => setUserInfo(user)}>
            <Button className='bg-primary hover:bg-primary w-full'>Đăng xuất</Button>
          </LogoutModal>
        )}
      </div>
    </div>
  )
}

export default Sidebar
