import React from 'react'
import OrderCard from './OrderCard'
// import EmptyCart from '~/assets/images/empty_cart.jpg'

const OrdersList = ({ orders }) => {
  return (
    <>
      {orders.length !== 0 ? (
        <div className='flex flex-col items-center mb-10 space-y-4 md:space-y-6'>
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      ) : (
        <div className='opacity-50'>
          <img src='/assets/images/empty_cart.png' alt='' className='mx-auto max-w-96 h-auto' />
          <p className='text-center mt-[-70px]'>Bạn đang không có đơn hàng nào</p>
        </div>
      )}
    </>
  )
}

export default OrdersList
