import React, { useRef } from 'react'

const DetailOrder = ({ orders, className, openForm, setOpenForm, handleChangeStatus }) => {
  const printRef = useRef(null)
  const handleCloseForm = () => {
    setOpenForm(false)
  }
  const handlePrint = () => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML
      const originalContents = document.body.innerHTML

      document.body.innerHTML = printContents
      window.print()
      document.body.innerHTML = originalContents
      window.location.href = 'http://localhost:5173/v2/dashboard/restaurant/manage-orders'
      // Reload the page to restore state
    } else {
      console.error('printRef is not attached')
    }
  }
  console.log(orders)
  return (
    <>
      <div className={`${className}  overflow-hidden`}>
        <div className='flex justify-between mb-5 -mt-4'>
          <h3 className=' font-bold text-[30px] text-center  text-secondary'>Chi tiết đơn hàng</h3>
          <div className='cursor-pointer' onClick={() => handleCloseForm()}>
            <i className='bx bx-x text-2xl -mt-3'></i>
          </div>
        </div>
        <div ref={printRef} className='w-full h-[calc(100vh-200px)] overflow-y-auto'>
          <div className='flex flex-col gap-3'>
            <table className='w-full border-collapse'>
              <thead>
                <tr>
                  <th className='bg-secondary text-accent text-center'>Ảnh</th>
                  <th className='bg-secondary text-accent text-center'>Tên món ăn</th>
                  <th className='bg-secondary text-accent text-center'>Giá</th>
                  <th className='bg-secondary text-accent text-center'>Số lượng</th>
                </tr>
              </thead>
              <tbody>
                {orders?.items.length > 0 &&
                  orders?.items.map((order) => {
                    return (
                      <tr key={order._id}>
                        <td>
                          <img
                            src={order.menuItemId?.imageUrl[0].url}
                            className='w-[150px] flex mx-auto'
                          />
                        </td>
                        <td>
                          <h4 className=' text-lg font-sans font-[500]'>
                            {order.menuItemId?.title}
                          </h4>
                        </td>
                        <td>
                          <span className='text-16 font-sans font-[600]'>
                            {order.menuItemId?.price?.toLocaleString('it-IT', {
                              style: 'currency',
                              currency: 'VND',
                            })}
                          </span>
                        </td>
                        <td>{order.quantity}</td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
            <div className='flex flex-col place-items-end gap-2 '>
              <div className='bg-[#F7F7F7] p-[3px_10px]'>
                <div className='flex justify-center items-center gap-2'>
                  <h4>TỔNG CỘNG</h4>
                  <span className=' font-sans text-[18px] font-[600] text-[#555555]'>
                    {orders?.totalPrice?.toLocaleString('it-IT', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </span>
                </div>
                <p className='opacity-50 text-center'>(Đã bao gồm VAT nếu có)</p>
              </div>
            </div>
            <div>
              <h2 className='text-xl font-sans font-bold mb-4'>Địa Chỉ</h2>

              <div className='border-[2px_solid_black] border-2 p-[5px_10px]'>
                {/* <h3 className='font-bold'>Name: {orders?.accountId.name}</h3> */}
                <p className='mt-2 text-gray-700'>
                  <strong>Tên:</strong>
                  {orders?.accountId.name}
                </p>
                <p className='mt-2 text-gray-700'>
                  <strong>Địa Chỉ:</strong>
                  {orders?.deliveryAddress},Việt Nam.
                </p>
                {/* <p className="mt-2 text-gray-700"><strong>Zip: </strong>{orders?.menuItemId?.deliveryAddress.zip}</p> */}
                <p className='mt-2 text-gray-700'>
                  <strong>SDT: </strong>
                  {orders?.accountId.phone}
                </p>
              </div>
            </div>
            <div className='flex justify-end'>
              {orders?.status === 'pending' ? (
                <div className='flex justify-center items-start gap-2'>
                  <button
                    id={orders?._id}
                    value='canceled'
                    onClick={(event) => handleChangeStatus(event)}
                    className='bg-[#F7F7F7] rounded-sm p-2'
                  >
                    Hủy
                  </button>
                  <button
                    id={orders?._id}
                    value='in-progress'
                    onClick={(event) => handleChangeStatus(event)}
                    className='bg-blue-400 rounded-sm p-2 text-white'
                  >
                    Đang giao
                  </button>
                </div>
              ) : orders?.status === 'in-progress' ? (
                <div className='flex justify-center items-start gap-2'>
                  <button
                    id={orders?._id}
                    value='completed'
                    onClick={(event) => handleChangeStatus(event)}
                    className='bg-green-700 text-white rounded-sm p-2'
                  >
                    Hoàn thành
                  </button>
                </div>
              ) : (
                <span className='bg-[#F7F7F7] text-lg font-[300] rounded-sm p-2 '>
                  <strong className='font-semibold'>Trạng thái hiện tại: </strong>
                  {orders?.status === 'completed'
                    ? 'Hoàn thành'
                    : orders?.status === 'canceled'
                      ? 'Đã hủy'
                      : null}
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => handlePrint()}
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '10px 20px',
            fontSize: '1rem',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Print Bill
        </button>
      </div>
    </>
  )
}

export default DetailOrder
