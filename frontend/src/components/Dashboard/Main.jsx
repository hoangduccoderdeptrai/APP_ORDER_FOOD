import React from 'react'
import UseResponsive from '../../hooks/useResponsive'
const Main = ({ children }) => {
  const lg = UseResponsive()
  return (
    <div
      style={{ width: lg === 'lg' ? `calc(100% - 280px)` : '100%' }}
      className='text-center h-screen overflow-y-auto'
    >
      {children}
    </div>
  )
}

export default Main
