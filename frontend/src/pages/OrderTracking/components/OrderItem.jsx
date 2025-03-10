import React from 'react'
import { FaStar } from 'react-icons/fa'

const formatNumber = (number) => {
  return new Intl.NumberFormat().format(number)
}

const OrderItem = ({ idFood, imageUrl, title, quantity, price, starMedium, address }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (v, i) => (
      <FaStar key={i} color={i < rating ? '#FFD700' : '#E0E0E0'} />
    ))
  }

  return (
    <div className='flex flex-col md:flex-row p-2 space-x-4 space-y-2 md:space-y-0 items-center mb-4 rounded-lg border'>
      <img
        src={imageUrl}
        alt={title}
        className='flex-none w-24 h-24 md:w-48 md:h-36 rounded-[20px] object-cover'
      />
      <div className='flex-grow'>
        <div
          className='text-xl font-bold mb-1 truncate max-w-[200px] md:max-w-[300px]'
          title={title}
        >
          {title}
        </div>
        <div className='text-lg text-primaryText mb-1'>Giá: {formatNumber(price)} VND</div>
        <div className='text-lg text-primaryText mb-1'>Số lượng: {quantity}</div>
        <div className='flex items-center text-lg'>{renderStars(starMedium)}</div>
      </div>
    </div>
  )
}

export default OrderItem
