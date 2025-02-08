import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LoadingOverlay from 'react-loading-overlay-ts'
import { ToastContainer } from 'react-toastify'
import {
  SuccessfulNotification,
  FailedNotification,
  newOderNotify,
} from '../../components/common/Notification'
import TablePagination from '@mui/material/TablePagination'
import { getOrder, updateStatusOrder } from '../../features/manageOrder-slice'
import DetailOrder from '../../components/Dashboard/commom/DetailOrder'
import { io } from 'socket.io-client'
const socket = io('http://localhost:3000')
const ManageOrders = () => {
  const [status, setStatus] = useState('pending')
  const [skipPage, setSkipPage] = useState(0) //0 is the first page
  // const [page,setPage] =useState(0) //0 is the first page
  const [rowsPerPage, setRowPerPage] = useState(5) //default rows per page
  const [orderId, setOrderId] = useState(null)
  const [orderStatus, setOrderStatus] = useState(null)
  const [openForm, setOpenForm] = useState(false)
  const [orders, setOrders] = useState(null)
  // const restaurantId ="66f754127c954abda7c56d15"
  const restaurantId = '673c0399f64dfc1b0692d12a'

  const { isLoading, error, orderList } = useSelector((state) => state.RestaurantOders)
  const dispatch = useDispatch()
  // handle form
  const handleForm = (val) => {
    console.log(val)
    setOrders(val)
    setOpenForm(!openForm)
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
  const handleStatus = async (event) => {
    try {
      const newStatus = event.target.value
      console.log(newStatus)
      setStatus(newStatus)
      const result = await dispatch(getOrder({ restaurantId, status: newStatus, skipPage }))
      if (!isLoading && !error && result) {
        console.log(orderList)
      }
    } catch (err) {
      console.error(err.message)
    }
  }
  const handleChangeStatus = async (event) => {
    console.log(event.target.value, event.target.id)
    try {
      console.log('test 2')
      const orderId = event.target.id
      const statusOrder = event.target.value
      setOrderId(orderId)
      setOrderStatus(statusOrder)
      const result = await dispatch(
        updateStatusOrder({ restaurantId, orderId, status: statusOrder }),
      )
      if (result.meta.requestStatus === 'fulfilled') {
        dispatch(getOrder({ restaurantId, status, skipPage }))
        console.log(orderList, 'list')
        setOpenForm(false)
        SuccessfulNotification("Update Order'status")
      }
    } catch (err) {
      FailedNotification("Update Order'status")
      console.error(err.message)
    }
  }
  useEffect(() => {
    console.log('useeffect')
    dispatch(getOrder({ restaurantId, status, skipPage }))
  }, [dispatch, restaurantId, status, skipPage])
  useEffect(() => {
    socket.on('orderFood', (data) => {
      console.log('orderFood', data)
      dispatch(getOrder({ restaurantId, status, skipPage }))
      newOderNotify()
    })
    return () => socket.off('orderFood')
  }, [])

  return (
    <LoadingOverlay active={isLoading} spinner text='Loading...' className='h-[650px] '>
      <div className='relative mx-5 my-2 px-3 py-4'>
        <div className='flex justify-between mb-7 mt-5'>
          <h1 className='text-3xl font-bold text-[40px] text-center text-primary'>
            QUẢN LÝ CÁC ĐƠN HÀNG
          </h1>
        </div>

        <div className='bg-[#FFFFFF] text-[#212B36] shadow-[0_0_2px_0_rgba(145,158,171,0.08),0_12px_24px_-4px_rgba(145,158,171,0.08)] rounded-[16px] transition-[box-shadow_300ms_cubic-bezier(0.4,0,0.2,1)_0ms]'>
          <div className='px-6 flex justify-between items-center min-h-[64px] h-[128px]'>
            <div className='border-2 flex items-center rounded-md px-3 py-1  border-solid border-[#212B36] border-opacity-60'>
              <div>
                <i className='bx bx-search-alt-2 text-2xl'></i>
              </div>
              <input
                className=' outline-none placeholder:text-slate-400 px-3 py-2 box-border '
                placeholder='Tìm kiếm đơn hàng...'
              />
            </div>
            <div className='custom-select relative '>
              <select
                value={status}
                onChange={(event) => handleStatus(event)}
                name='status'
                className='selected'
              >
                <option value='pending'>Đợi duyệt</option>
                <option value='in-progress'>Đang giao</option>
                <option value='completed'>Hoàn thành</option>
                <option value='canceled'>Đã hủy</option>
              </select>
            </div>
          </div>

          <div className='px-6 pb-6'>
            <table className='w-full overflow-x-auto border-collapse  border-2 border-solid border-[rbg(200,200,200)] '>
              <thead className=''>
                <tr>
                  <th className='bg-secondary text-accent text-[20px]'>Tên người đặt</th>
                  <th className='bg-secondary text-accent text-[20px]'>Địa chỉ</th>
                  <th className='bg-secondary text-accent text-[20px]'>Các món ăn</th>
                  <th className='bg-secondary text-accent text-[20px]'>Tình trạng</th>
                  <th className='bg-secondary text-accent text-[20px]'>Khác</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(orderList) && !isLoading && orderList.length > 0 ? (
                  orderList.map((val) => (
                    <tr key={val._id}>
                      <td>{val?.accountId?.name}</td>
                      <td className='text-start w-60'>
                        <p>
                          <strong>Địa chỉ giao hàng: </strong>
                          {val.deliveryAddress}
                        </p>
                        <p>
                          <strong>Số điện thoại: </strong>
                          {val?.accountId?.phone}
                        </p>
                      </td>
                      <td>
                        {val.items.length > 0 && (
                          <table className='m-auto'>
                            <thead>
                              <tr>
                                <th className='p-2 w-[230px]'>Món ăn</th>
                                <th className='p-2'>Số lượng</th>
                              </tr>
                            </thead>
                            <tbody>
                              {val.items.map((item) => (
                                <tr key={item._id}>
                                  <td>{item.menuItemId?.title}</td>
                                  <td>{item.quantity || 1}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </td>
                      <td>
                        {val.status === 'pending' || val.status === 'in-progress' ? (
                          <select
                            id={val._id}
                            onChange={(event) => handleChangeStatus(event)}
                            className={`rounded-[10px] font-bold p-2  outline-none text-white ${
                              val.status === 'pending' ? 'bg-[#ffc107]' : 'bg-blue-500'
                            }`}
                          >
                            {val.status === 'pending' && <option value='pending'>Đợi duyệt</option>}
                            {val.status === 'pending' && <option value='canceled'>Đã hủy</option>}
                            <option value='in-progress'>Đang giao</option>
                            {val.status === 'in-progress' && (
                              <option value='completed'>Hoàn thành</option>
                            )}
                          </select>
                        ) : val.status === 'completed' ? (
                          <option className='text-green-700 font-bold' value='completed'>
                            Hoàn thành
                          </option>
                        ) : (
                          <option className='text-red-700 font-bold' value='canceled'>
                            Đã hủy
                          </option>
                        )}
                      </td>
                      <td>
                        <button
                          className=' bg-blue-400 rounded-[10px]  p-2 text-white'
                          onClick={() => handleForm(val)}
                        >
                          Xem chi tiết
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan='5' className='text-center'>
                      Chưa có đơn hàng nào.
                    </td>
                  </tr>
                )}
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
                count={orderList.length || 0}
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
      <DetailOrder
        className={`${!openForm ? 'hidden' : 'block animation-form'}  max-w-[720px] z-[100] w-full px-5 text-left py-10 fixed mt-[70px]  left-[50%] -translate-x-[50%] bg-[#FFFFFF] text-[#212B36] shadow-[0_0_2px_0_(rgba(145,158,171,0.08),0_12px_24px_-4px_(rgba(145,158,171,0.08))]`}
        orders={orders}
        setOpenForm={setOpenForm}
        openForm={openForm}
        handleChangeStatus={handleChangeStatus}
      />
      <div className={`fixed ${openForm ? 'inset-0' : ''} bg-black opacity-20 z-10`}></div>
    </LoadingOverlay>
  )
}

export default ManageOrders
