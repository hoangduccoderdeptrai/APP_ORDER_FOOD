import React,{ useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import LoadingOverlay from 'react-loading-overlay-ts'
import { ToastContainer } from 'react-toastify'
import hero from '../../assets/hero.png'
import ShowDeleteConfirmation from '../../component/common/showDeleteConfirmation'
import TablePagination from '@mui/material/TablePagination'
import { getOrder } from '../../features/manageOrder-slice'
const ManageOrders = () => {
    const [status,setStatus] =useState('pending')
    const [skipPage,setSkipPage] =useState(0)
    const [page,setPage] =useState(0) //0 is the first page
    const [rowsPerPage,setRowPerPage] =useState(5) //default rows per page
    const restaurantId ="66f754127c954abda7c56d15"
    const {isLoading,error,orderList} =useSelector((state)=>state.RestaurantOders)
    const dispatch =useDispatch()
    // handle page change
    const handleChangePage = (event,newPage)=>{
        setPage(newPage)
    }
    // handle rows per page change
    const handleChangeRowsPerPage =(event)=>{
        setRowPerPage(parseInt(event.target.value,10))
        setPage(0)
    }
    const handleStatus =async(event)=>{
        try{
            const newStatus =event.target.value
            setStatus(newStatus)
            const result = await dispatch(getOrder({restaurantId,status:newStatus,skipPage}))
            if(!isLoading &&!error &&result){
                console.log(orderList)
            }
        }catch(err){
            console.error(err.message)
        }
       
    }
    useEffect(()=>{
        dispatch(getOrder({restaurantId,status,skipPage}))
    },[dispatch,restaurantId,status,skipPage])
   
  return (
    <LoadingOverlay
      active={isLoading}
      spinner
      text="Loading..."
      className='h-[650px] '
    >

      <ToastContainer limit={1} className=""/>
      <div className='relative mx-5 my-2 px-3 py-4'>  
        <div className='flex justify-between mb-3'>
            <h3 className='text-3xl font-[700] font-family color-1 text-left mb-4 '>Welcome Manage Orders 👋</h3>
            
        </div>
        
        <div className='bg-[#FFFFFF] text-[#212B36] shadow-[0_0_2px_0_rgba(145,158,171,0.08),0_12px_24px_-4px_rgba(145,158,171,0.08)] rounded-[16px] transition-[box-shadow_300ms_cubic-bezier(0.4,0,0.2,1)_0ms]'>
            <div className='px-6 flex justify-between items-center min-h-[64px] h-[128px]'>
                <div className='border-2 flex items-center rounded-md px-3 py-1  border-solid border-[#212B36] border-opacity-60'>
                    <div>
                    <i className='bx bx-search-alt-2 text-2xl'></i>
                    </div>
                    <input className=' outline-none placeholder:text-slate-400 px-3 py-2 box-border ' placeholder="Search Order..."/>
                </div>
                <div className='custom-select relative '>
                    <select value={status} onChange={(event)=>handleStatus(event)} name='status' className='selected capitalize'>
                        <option value='pending'>Pending</option>
                        <option value='accept'>Accept</option>
                        <option value='completed'>Completed</option>
                        <option value='canceled'>Canceled</option>
                    </select>
                   
                    
                </div>
            </div>
            
            <div className='px-6 pb-6'>
                <table className='w-full overflow-x-auto border-collapse  border-2 border-solid border-[rbg(200,200,200)] '>
                    <thead className=''>
                        <tr>
                            <th>UserId</th>
                            <th>Address</th>
                            <th>Items</th>
                            <th>Status</th>
                            <th>Others</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr className=''>
                            <td>1</td>
                            
                            <td className='text-start'>
                                <p><strong>Street:</strong>NGõ 2, đường Phạm Thị Sáu</p>
                                <p><strong>City:</strong>Thủ Đức</p>
                                <p><strong>Zip:</strong>112</p>
                            </td>
                            <td>{(30000).toLocaleString('it-IT',{style:"currency",currency:'VND'})}</td>
                            <td className=' '>
                                <select className='rounded-sm bg-[#ffc107] font-bold p-[1px_2px] border-none outline-none '>
                                    <option>Pending</option>
                                    <option>Accept</option>
                                    <option>Canceled</option>
                                </select>
                            </td>
                            <td><button className=' bg-green-400 rounded-sm  p-[2px_5px] '>Detail</button></td>
                        </tr> */}
                       
                           {
                                Array.isArray(orderList) &&!isLoading&& orderList.length>0 ? (
                                    orderList.map((val)=>(
                                        <tr key={val._id}>
                                            <td>{val.userId}</td>
                                            <td className='text-start'>
                                                <p><strong>Street: </strong>{val.deliveryAddress.street}</p>
                                                <p><strong>City: </strong>{val.deliveryAddress.city}</p>
                                                <p><strong>Borough: </strong>{val.deliveryAddress.borough}</p>
                                                <p><strong>Zip: </strong>{val.deliveryAddress.zip}</p>
                                            </td>
                                            <td>
                                                {val.items.length>0 &&
                                                    (   
                                                        <table className=''>
                                                            <thead>
                                                                <tr>
                                                                    <th className='p-1'>name</th>
                                                                    <th className='p-1'>Quantity</th>  
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {val.items.map((item)=>(
                                                                    <tr key={item._id}>
                                                                        <td>{item.menuItemId.title}</td>
                                                                        <td>{item.quantity||1}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                            

                                                        </table> 
                                                       
                                                    )
                                                    
                                                }
                                            </td>
                                            <td>
                                                { val.status ?
                                                    (
                                                        <select  className='rounded-sm bg-[#ffc107] font-bold p-[1px_2px] border-none outline-none '>
                                                            <option>Pending</option>
                                                            <option>Accept</option>
                                                            <option>Canceled</option>
                                                        </select>
                                                    ):(
                                                        val.status
                                                    )
                                                }
                                            </td>
                                            <td><button value={val} className=' bg-green-400 rounded-sm  p-[2px_5px] '>Detail</button></td>
                                        </tr>
                                    ))
                                ):(
                                    <tr>
                                        <td colSpan="5" className="text-center">No items found</td>
                                    </tr>
                                )
                            }
                        
                    </tbody>
                   
                </table>
            </div>
            <div className='px-6 pb-6'>
                <div className=' rounded-b-2xl z-10'>
                    <div className='w-full'></div>
                    <TablePagination
                        page={page}
                        component="div"
                        count={50}
                        rowsPerPage={rowsPerPage}
                        onPageChange={handleChangePage}
                        rowsPerPageOptions={[5, 10, 25]}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />

                </div>
            </div>
        </div>
        {/* <ShowDeleteConfirmation setShowDelete={setShowDelete} showDelete={showDelete} handleDelete={handleDelete}/> */}
           
            
        </div>
    </LoadingOverlay>
  )
}

export default ManageOrders
