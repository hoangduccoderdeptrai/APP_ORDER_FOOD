import React, { useState } from 'react'
import { Tabs, Tab } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LockIcon from '@mui/icons-material/Lock'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

const SideNav = ({ selectedTab, onSelectTab }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const navItems = [
    { id: 'account', label: 'Tài khoản của tôi', icon: <AccountCircleIcon /> },
    { id: 'change-password', label: 'Đổi mật khẩu', icon: <LockIcon /> },
    { id: 'logout', label: 'Đăng xuất', icon: <ExitToAppIcon /> },
  ]

  return (
    <>
      {/* Mobile toggle button */}
      <div className='block lg:hidden p-4'>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className='text-primary focus:outline-none'
        >
          {isMobileOpen ? <CloseIcon fontSize='large' /> : <MenuIcon fontSize='large' />}
        </button>
      </div>

      {/* Sidebar menu */}
      <div
        className={`fixed top-0 left-0 z-50 lg:z-10 h-full w-64 bg-white shadow-lg transform ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 lg:relative lg:translate-x-0 lg:shadow-none`}
      >
        <Tabs
          orientation='vertical'
          value={selectedTab}
          onChange={(event, newValue) => {
            onSelectTab(newValue)
            setIsMobileOpen(false) // Auto-close on mobile
          }}
          aria-label='side navigation'
          sx={{
            paddingTop: '32px',
            '& .MuiTab-root': {
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: '16px',
              textAlign: 'left',
              minHeight: '56px',
              padding: '0px 0px 0px 56px',
              fontSize: '16px',
              fontFamily: 'Roboto, sans-serif',
              color: '#333333',
              transition: 'background-color 0.3s, color 0.3s',
            },
            '& .MuiTab-wrapper': {
              flexDirection: 'row',
            },
            '& .MuiTabs-indicator': {
              width: '4px',
              backgroundColor: '#7D0600',
            },
            '& .Mui-selected': {
              backgroundColor: '#fdecea',
              color: '#7D0600',
              fontWeight: 'bold',
            },
            '& .MuiTab-root:hover': {
              backgroundColor: '#fef4f0',
            },
          }}
        >
          {navItems.map((item) => (
            <Tab
              key={item.id}
              value={item.id}
              label={item.label}
              icon={item.icon}
              iconPosition='start'
            />
          ))}
        </Tabs>
      </div>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 lg:hidden'
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}
    </>
  )
}

export default SideNav
