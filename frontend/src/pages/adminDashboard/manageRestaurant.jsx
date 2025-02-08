import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingOverlay from 'react-loading-overlay-ts'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import TablePagination from '@mui/material/TablePagination'
import hero from '../../assets/hero.png'
import DetailRest from '~/components/Dashboard/commom/DetailRest'
import {
  fetchRestaurants,
  updateRestaurant,
  liveSearchRestaurant,
} from '../../features/manageRestaurant-slice'
import {
  FailedAccess,
  SuccessfulNotification,
  FailedNotification,
} from '../../components/common/Notification.jsx'
const ManageRestaurant = () => {
  const [status, setStatus] = useState('all')
  const [openStatus, setOpenStatus] = useState(false)
  const [skipPage, setSkipPage] = useState(0) //0 is the first page
  const [idRest, setIdRest] = useState(null)
  const [openForm, setOpenForm] = useState(false)
  const [restaurant, setRestaurant] = useState(null)
  // const [page,setPage] =useState(0) //0 is the first page
  const [rowsPerPage, setRowPerPage] = useState(5) //default rows per page
  const { isLoading, error, checkAuth, restaurantList, number_row } = useSelector(
    (state) => state.ManageRestaurant,
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // handle Form
  const handleForm = (val) => {
    console.log(val)
    setRestaurant(val)
    setOpenForm(!openForm)
  }
  const seachRestaurant = async (event) => {
    console.log('test', event.target.value)
    let title = event.target.value
    dispatch(liveSearchRestaurant({ keyword: title, status, skipPage, rowsPerPage }))
  }
  // handle page change
  const handleChangePage = (event, newPage) => {
    // console.log(newPage, 'thực sự nhớ em')
    setSkipPage(newPage)
  }
  // handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowPerPage(parseInt(event.target.value, 10))
    setSkipPage(0)
  }
  const handleChangeStatus = (status) => {
    console.log(status)
    setSkipPage(0)
    setStatus(status)
  }
  const handleOpenStatus = (id) => {
    console.log('test 3')

    setOpenStatus(!openStatus)
    console.log(openStatus)
    setIdRest(id)
  }
  const handleActive = async (id, status_rest) => {
    try {
      if (status_rest !== 'active') {
        const data = await dispatch(updateRestaurant({ idRest: id, status_rest: 'active' }))
        console.log(data)
        if (!isLoading && !error) {
          dispatch(fetchRestaurants({ status, skipPage, rowsPerPage }))
          SuccessfulNotification('Update Status')
        }
      }
      console.log(id, status, 'hello anh em')
    } catch (err) {
      FailedNotification('Update Status')
      console.error(err.message)
    }
  }
  const handleInActive = async (id, status_rest) => {
    try {
      if (status_rest !== 'inactive') {
        const data = await dispatch(updateRestaurant({ idRest: id, status_rest: 'inactive' }))
        console.log(data)
        if (!isLoading && !error) {
          dispatch(fetchRestaurants({ status, skipPage, rowsPerPage }))
          SuccessfulNotification('Update Status')
        }
      }
      // console.log(id, status, 'hello anh em')
    } catch (err) {
      FailedNotification('Update Status')
      console.error(err.message)
    }
  }
  const handleDeny = async (id, status_rest) => {
    try {
      if (status_rest !== 'deny') {
        const data = await dispatch(updateRestaurant({ idRest: id, status_rest: 'deny' }))
        console.log(data)
        if (!isLoading && !error) {
          dispatch(fetchRestaurants({ status, skipPage, rowsPerPage }))
          SuccessfulNotification('Update Status')
        }
      }
      // console.log(id, status, 'hello anh em')
    } catch (err) {
      FailedNotification('Update Status')
      console.error(err.message)
    }
  }

  useEffect(() => {
    console.log(status)
    dispatch(fetchRestaurants({ status, skipPage, rowsPerPage }))
    console.log('test 4')
  }, [dispatch, status, rowsPerPage, skipPage])

  useEffect(() => {
    console.log(error)
    if (error && (checkAuth == 'Unauthorized' || checkAuth == 'Forbidden')) {
      FailedAccess(`${checkAuth} access.Redirecting to login within the next 3 seconds`)
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    }
  }, [error, navigate, checkAuth])
  console.log(restaurantList)
  return (
    <LoadingOverlay active={isLoading} spinner Text='Loading ...' className='h-[650px]'>
      <div className='relative mx-5 my-2 px-3 py-4'>
        <div className='mb-3'>
          <h3 className='font-family color-1 text-left mb-4 up text-[40px]  text-primary font-bold'>
            QUẢN LÝ NHÀ HÀNG
          </h3>
        </div>
        <div className='flex items-center gap-10 mb-5'>
          <button
            value='all'
            onClick={() => handleChangeStatus('all')}
            className={`${status == 'all' ? 'border-b-4' : 'border-none'} border-orange-500 flex items-center gap-1`}
          >
            <h4>Tất cả</h4>
          </button>
          <button
            value='active'
            onClick={() => handleChangeStatus('active')}
            className={`${status == 'active' ? 'border-b-4' : 'border-none'} border-orange-500 flex items-center gap-1`}
          >
            <h4>Đang hoạt động</h4>
            <span></span>
          </button>
          <button
            value='inactive'
            onClick={() => handleChangeStatus('inactive')}
            className={`${status == 'inactive' ? 'border-b-4' : 'border-none'} border-orange-500 flex items-center gap-1`}
          >
            <h4>Vi phạm</h4>
            <span></span>
          </button>
          <button
            value='pending'
            onClick={() => handleChangeStatus('pending')}
            className={`${status == 'pending' ? 'border-b-4' : 'border-none'} border-orange-500 flex items-center gap-1`}
          >
            <h4>Chờ duyệt bởi Admin</h4>
            <span></span>
          </button>
          <button
            value='deny'
            onClick={() => handleChangeStatus('deny')}
            className={`${status == 'deny' ? 'border-b-4' : 'border-none'} border-orange-500 flex items-center gap-1`}
          >
            <h4>Từ chối bởi Admin</h4>
            <span></span>
          </button>
        </div>
        <div className='bg-[#FFFFFF] text-[#212B36] shadow-[0_0_2px_0_rgba(145,158,171,0.08),0_12px_24px_-4px_rgba(145,158,171,0.08)] rounded-[16px] transition-[box-shadow_300ms_cubic-bezier(0.4,0,0.2,1)_0ms]'>
          <div className='px-6 flex justify-between items-center min-h-[64px] h-[128px]'>
            <div className='max-w-[600px] w-full h-[50px] border-2 flex items-center rounded-md px-3 py-0  border-solid border-[#212B36] border-opacity-60'>
              <div>
                <i className='bx bx-search-alt-2 text-2xl'></i>
              </div>
              <input
                onChange={(event) => seachRestaurant(event)}
                className=' outline-none placeholder:text-slate-400 px-3 py-2 box-border '
                placeholder='Tìm kiếm nhà hàng...'
              />
            </div>
            <button className='border-2 border-orange-500 text-orange-500 rounded-sm px-3 py-1'>
              Áp dụng
            </button>
          </div>
          <div className='px-6 pb-6'>
            <table className='w-full border-2 border-collapse border-solid border-[rbg(200,200,200)]'>
              <thead>
                <tr>
                  <th className='bg-secondary text-accent text-[20px]'>Tên nhà hàng</th>
                  <th className='bg-secondary text-accent text-[20px]'>Số điện thoại</th>
                  <th className='bg-secondary text-accent text-[20px]'>Trạng thái</th>
                  <th className='bg-secondary text-accent text-[20px]'>Xử lý</th>
                </tr>
              </thead>
              <tbody>
                {restaurantList?.length > 0 && !isLoading ? (
                  restaurantList.map((rest) => {
                    return (
                      <tr key={rest._id}>
                        <td>
                          <div className='flex  col-span-1 items-start gap-3'>
                            <img src={rest?.imageUrl[0]?.url || hero} className='w-[200px]' />
                            <div className='flex flex-col text-start'>
                              <p className='font-semibold font-sans  text-[#333333]'>
                                {rest?.name}
                              </p>
                              <p className='opacity-50'>ID Nhà hàng: {rest?._id}</p>
                            </div>
                          </div>
                        </td>
                        <td>{rest?.phone}</td>
                        <td
                          style={{
                            color:
                              rest?.status == 'pending'
                                ? '#ffc107'
                                : rest?.status == 'active'
                                  ? 'green'
                                  : 'brown',
                          }}
                        >
                          {rest?.status}
                        </td>
                        <td>
                          <div className='flex flex-col gap-2'>
                            <div className='relative' onClick={() => handleOpenStatus(rest?._id)}>
                              <button className='cursor-pointer text-blue-400'>Cập nhật</button>
                              <div
                                style={{
                                  display:
                                    openStatus === true && rest?._id === idRest ? 'block' : 'none',
                                }}
                                className='relative ms-auto bg-[#d6cdcd] mt-[10px] w-[80px] py-2  flex flex-col gap-1 transition-all '
                              >
                                <button
                                  onClick={() => handleActive(rest?._id, rest?.status)}
                                  className='hover:text-blue-500 text-start w-full'
                                >
                                  <span className='ms-2'>Active</span>
                                </button>
                                <button
                                  onClick={() => handleInActive(rest?._id, rest?.status)}
                                  className='hover:text-blue-500 text-start w-full'
                                >
                                  <span className='ms-2'>Inactive</span>
                                </button>
                                <button
                                  onClick={() => handleDeny(rest?._id, rest?.status)}
                                  className='hover:text-blue-500 text-start w-full'
                                >
                                  <span className='ms-2'>Deny</span>
                                </button>
                              </div>
                            </div>
                            <div>
                              <button
                                onClick={() => handleForm(rest)}
                                className='cursor-pointer text-blue-400'
                              >
                                Xem thêm
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan='5' className='text-center'>
                      No items found
                    </td>
                  </tr>
                )}
                {/* <tr>
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
                      </tr> */}
              </tbody>
            </table>
          </div>
          <div className='px-6 pb-6'>
            <div className=' rounded-b-2xl z-10'>
              <div className='w-full'></div>
              <TablePagination
                style={{
                  fontWeight: 'bold',
                  borderRadius: '4px',
                  padding: '10px',
                  fontSize: '1rem',
                }}
                page={skipPage}
                component='div'
                count={number_row || 0}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[5, 10, 25]}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </div>
        </div>
      </div>
      <DetailRest
        className={`${!openForm ? 'hidden' : 'block animation-form'}  max-w-[720px] z-[100] w-full px-5 text-left py-10 fixed mt-[70px]  left-[50%] -translate-x-[50%] bg-[#FFFFFF] text-[#212B36] shadow-[0_0_2px_0_(rgba(145,158,171,0.08),0_12px_24px_-4px_(rgba(145,158,171,0.08))]`}
        restaurant={restaurant}
        setOpenForm={setOpenForm}
        openForm={openForm}
        handleActive={handleActive}
        handleInActive={handleInActive}
        handleDeny={handleDeny}
      />
      <div className={`fixed ${openForm ? 'inset-0' : ''} bg-black opacity-20 z-10`}></div>
    </LoadingOverlay>
  )
}

export default ManageRestaurant
