import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from '~/components/ui/Button'
import { Chip } from '@mui/material'
import OrderItem from './OrderItem'
import ReviewModal from '~/components/Layout/Components/_components/ReviewModal'
import ordersApi from '~/apis/orders'
import { routes } from '~/configs'
import { Link } from 'react-router-dom'

const formatNumber = (number) => {
  return new Intl.NumberFormat().format(number)
}

const OrderCard = ({ order }) => {
  const handleCancelOrder = async () => {
    try {
      const response = await ordersApi.cancelOrder(order._id)
      toast.success('Hủy đơn thành công!')
    } catch (error) {
      toast.error('Có lỗi xảy ra khi hủy đơn!')
    }
  }

  const [isReviewOpen, setReviewOpen] = useState(false)

  const handleReviewOpen = () => setReviewOpen(true)
  const handleReviewClose = () => setReviewOpen(false)

  const statusMap = {
    pending: { label: 'Chờ xác nhận', bgColor: '#ff9800', actions: ['Huỷ đơn'] },
    'in-progress': { label: 'Chờ vận chuyển', bgColor: '#4caf50', actions: [] },
    completed: { label: 'Hoàn thành', bgColor: '#2196f3', actions: ['Đánh giá'] },
    canceled: { label: 'Đã hủy', bgColor: '#f44336', actions: [] },
  }

  const chipData = statusMap[order.status] || {
    label: 'Không xác định',
    bgColor: '#000000',
    actions: [],
  }

  return (
    <div className='p-4 border rounded-lg w-full sm:w-[600px] my-3 relative bg-white'>
      <div className='absolute top-4 right-4'>
        <Chip
          label={chipData.label}
          style={{ backgroundColor: chipData.bgColor, color: '#fff' }}
          className='w-32 h-10 text-center text-sm font-bold leading-[28px]'
        />
      </div>

      <h2
        className='text-xl font-semibold mb-4 truncate max-w-[300px] md:max-w-[400px]'
        title={order.nameRestaurant.name}
      >
        {order.nameRestaurant.name}
      </h2>
      <p
        className='text-lg text-gray-600 mb-4 truncate max-w-[300px] md:max-w-[400px]'
        title={order.deliveryAddress}
      >
        {order.deliveryAddress}
      </p>

      <div className='space-y-3'>
        {order.items.map((item) => (
          <OrderItem
            key={item.food._id}
            idFood={item.food._id}
            imageUrl={item.food.imageUrl[0] ? item.food.imageUrl[0].url : ''}
            title={item.food.title}
            quantity={item.quantity}
            price={item.food.price}
            starMedium={item.food.starMedium}
            address={order.deliveryAddress}
          />
        ))}
      </div>
      <div className='flex justify-end items-center mt-4'>
        <p className='text-lg font-semibold'>Tổng tiền: {formatNumber(order.totalPrice)} VND</p>
      </div>
      <div className='flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-3'>
        {chipData.actions.includes('Đánh giá') && (
          <Button
            variant='outline'
            className='w-full sm:w-32 h-10 bg-primary hover:bg-primary/80 text-center text-sm font-bold leading-[28px]'
            onClick={handleReviewOpen}
          >
            Đánh giá
          </Button>
        )}
        {chipData.actions.includes('Huỷ đơn') && (
          <Button
            variant='outline'
            className='w-32 h-10 bg-[#ff0000] hover:bg-[#ff0000]/80 text-center text-white text-sm font-bold leading-[28px]'
            onClick={handleCancelOrder}
          >
            Huỷ đơn
          </Button>
        )}

        <Link to={`${routes.DETAILS}/${order.restaurantId}`}>
          <Button
            variant='outline'
            className='w-full sm:w-32 h-10 bg-[#c8c8c8] hover:bg-[#c8c8c8]/80 text-center text-primaryText text-sm font-bold leading-[28px]'
          >
            Quay lại quán
          </Button>
        </Link>
      </div>

      {/* Review Modal */}
      <ReviewModal
        open={isReviewOpen}
        onClose={handleReviewClose}
        items={order.items}
        idOrder={order._id}
      />
    </div>
  )
}

export default OrderCard
