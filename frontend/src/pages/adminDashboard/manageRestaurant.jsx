import React, { useState } from 'react'
import LoadingOverlay from 'react-loading-overlay-ts'
import { ToastContainer } from 'react-toastify'
import hero from '../../assets/hero.png'
const ManageRestaurant = () => {
  const [status,setStatus] =useState('all')
  const [openStatus,setOpenStatus] =useState(false)
  const handleChangeStatus =(status)=>{
    console.log(status)
    setStatus(status)
  }
  const handleOpenStatus =()=>{
    console.log("test 3")
    setOpenStatus(!openStatus)
  }
  
  return (
    <LoadingOverlay
      active={false}
      spinner
      Text="Loading ..."
      className='h-[650px]'
    >
      <ToastContainer limit={1}/>
      <div className='relative mx-5 my-2 px-3 py-4'>
        <div className='mb-3'>
          <h3 className='text-3xl font-[700] font-family color-1 text-left mb-4 '>Manage Restaurant 👋</h3>
        </div>
        <div className='flex items-center gap-10 mb-5'>
          <button value="all" onClick={()=>handleChangeStatus('all')} className={`${status=='all'?"border-b-4":"border-none"} border-orange-500 flex items-center gap-1`}>
            <h4>Tất cả</h4>
          </button>
          <button value="active" onClick={()=>handleChangeStatus('active')} className={`${status=='active'?"border-b-4":"border-none"} border-orange-500 flex items-center gap-1`} >
            <h4>Đang hoạt động</h4>
            <span>(3)</span>
          </button>
          <button value='inactive' onClick={()=>handleChangeStatus('inactive')} className={`${status=='inactive'?"border-b-4":"border-none"} border-orange-500 flex items-center gap-1`}>
            <h4>Vi phạm</h4>
            <span></span>
          </button>
          <button value="pending" onClick={()=>handleChangeStatus('pending')} className={`${status=='pending'?"border-b-4":"border-none"} border-orange-500 flex items-center gap-1`}>
            <h4>Chờ duyệt bởi Admin</h4>
            <span></span>
          </button>
        </div>
        <div className='bg-[#FFFFFF] text-[#212B36] shadow-[0_0_2px_0_rgba(145,158,171,0.08),0_12px_24px_-4px_rgba(145,158,171,0.08)] rounded-[16px] transition-[box-shadow_300ms_cubic-bezier(0.4,0,0.2,1)_0ms]'>
            <div className='px-6 flex justify-between items-center min-h-[64px] h-[128px]'>
                <div className='max-w-[600px] w-full h-[50px] border-2 flex items-center rounded-md px-3 py-0  border-solid border-[#212B36] border-opacity-60'>
                    <div>
                        <i className='bx bx-search-alt-2 text-2xl'></i>
                    </div>
                    <input className=' outline-none placeholder:text-slate-400 px-3 py-2 box-border ' placeholder="Search Restaurant..."/>
                </div>
                <button className='border-2 border-orange-500 text-orange-500 rounded-sm px-3 py-1'>
                    Apply
                </button>
            </div>
            <div className='px-6 pb-6'>
              <table className='w-full border-2 border-collapse border-solid border-[rbg(200,200,200)]'>
                  <thead>
                      <tr>
                        <th>Restaurant Name</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Handle</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                        <td >
                          <div className='flex  col-span-1 items-start gap-3'>
                            <img src={hero} className='w-[200px]' />
                            <div className='flex flex-col text-start'>
                              <p className='font-semibold font-sans  text-[#333333]'>Nhà Hàng Lê Hoàng Đức</p>
                              <p className='opacity-50'>ID Nhà hàng: 1234</p>
                            </div>
                            
                          </div>

                        </td>
                        <td>
                            0363043317
                        </td>
                        <td className='text-yellow-500'>pending</td>
                        <td>
                          <div className='flex flex-col gap-2'>
                            <div className='relative'>
                              <button onClick={()=>handleOpenStatus()} className='cursor-pointer text-blue-400'>Cập nhật</button>
                              <div  style={{display:openStatus==false?"none":"block"}} className='relative ms-auto bg-[#d6cdcd] w-[80px] py-2  flex flex-col gap-1 transition-all '>
                                  <button className='hover:bg-white text-start w-full'>

                                    <span className='ms-2'>Active</span>
                                  </button>
                                  <button className='hover:bg-white text-start w-full'>
                                    <span className='ms-2'>Inactive</span>
                                    
                                  </button>
                              </div>
                            </div>
                            <div>
                              <button className='cursor-pointer text-blue-400'>Xem thêm</button>
                            </div>
                            
                          </div>
                          
                        </td>
                      </tr>
                  </tbody>
              </table>
            </div>
        </div>
      </div>
    </LoadingOverlay>
    
  )
}

export default ManageRestaurant
