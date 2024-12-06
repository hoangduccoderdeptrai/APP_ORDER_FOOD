import React,{memo} from 'react'
import UseResponsive from '../../hooks/useResponsive'
import Search from './commom/Search'
const Header = ({handleOpen}) => {
    const lg =UseResponsive()
    console.log(lg,'header')
    // style={{width: lg === 'lg'? `calc(100%-280px)` : '100%'}} not run
  return (
    <div  style={{ width: lg === 'lg' ? `calc(100% - 280px)` : '100%' }} className={`fixed top-0 left-auto flex items-center right-0 h-[64px] z-10 px-[24px] lg:px-[48px] `}>
        
            {
                lg!=='lg' &&(
                    <div onClick={handleOpen} className='mr-2'>
                        <i className='bx bx-menu text-2xl' ></i>
                    </div>
                )
            }
            <Search/>
            <div className='w-full flex-1 '></div>
            <div>
                signin,signout here
            </div>
       
    </div>
  )
}

export default memo(Header)
