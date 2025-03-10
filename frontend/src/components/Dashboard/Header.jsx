import React, { memo } from 'react'
import UseResponsive from '../../hooks/useResponsive'
import Search from './commom/Search'
import { Button } from '~/components/ui/Button'

const Header = ({ handleOpen }) => {
  const lg = UseResponsive()
  console.log(lg, 'header')
  // style={{width: lg === 'lg'? `calc(100%-280px)` : '100%'}} not run
  return (
    <div
      style={{ width: lg === 'lg' ? `calc(100% - 280px)` : '100%' }}
      className={`fixed top-0 left-auto flex items-center right-0 h-[64px] z-10 px-[24px] lg:px-[48px] bg-[#fff] `}
    >
      {lg !== 'lg' && (
        <div onClick={handleOpen} className='mr-2'>
          <i className='bx bx-menu text-2xl'></i>
        </div>
      )}
      {/* <Search /> */}
      <div className='w-full flex-1 '></div>
      <div className='flex gap-6 items-center max-md:hidden overflow-hidden'>
        <Button
          variant='outline'
          className='border-2 border-black text-black py-2 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-300'
        >
          Đăng ký
        </Button>
        <Button className='bg-secondary text-white py-2 px-6 rounded-lg hover:bg-primary transition-colors duration-300'>
          Đăng nhập
        </Button>
      </div>
    </div>
  )
}

export default memo(Header)
