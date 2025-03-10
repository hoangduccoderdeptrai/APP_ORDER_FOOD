import React, { useEffect, useState } from 'react'
import Navigation from '~/components/ui/Navigation'
import OrdersList from './components/OrdersList'
import authApi from '~/apis/auth'
import ordersApi from '~/apis/orders'
import LoginModal from '~/components/Layout/Components/_components/LoginModal'
import { io } from 'socket.io-client'
const socket = io('http://localhost:3000')
const OrderTrackingPage = () => {
  const tabLabels = ['Chờ xác nhận', 'Chờ vận chuyển', 'Hoàn thành', 'Đã hủy']

  const getInitialTab = () => {
    const savedTab = localStorage.getItem('selectedTab')
    return savedTab ? parseInt(savedTab, 10) : 0
  }

  const [selectedTab, setSelectedTab] = useState(getInitialTab)
  const [orders, setOrders] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchOrders = async () => {
    try {
      const statusMap = ['pending', 'in-progress', 'completed', 'canceled']
      const status = statusMap[selectedTab]
      const response = await ordersApi.getOrders(status, currentPage)

      if (response.orders) {
        const ordersData = response.orders
        const pagination = response.pagination

        const ordersWithAddress = ordersData.map((order) => ({
          ...order,
          deliveryAddress: order.deliveryAddress,
        }))
        setOrders(ordersWithAddress)
        setTotalPages(pagination.numberPages || 1)
      } else {
        setOrders([])
        setTotalPages(1)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [selectedTab, currentPage])

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue)
    localStorage.setItem('selectedTab', newValue)
    setCurrentPage(1)
  }

  useEffect(() => {
    socket.on('updateRestaurantData', (data) => {
      console.log('Restaurant data updated', data)
      fetchOrders()
    })
    return () => socket.off('updateRestaurantData')
  }, [])

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const handleLoginSuccess = async (email, password) => {
    try {
      const response = await authApi.signIn(email, password)
      if (response.msg) {
        const newToken = response.msg // Thay `msg` bằng token từ server
        setToken(newToken)
        localStorage.setItem('token', newToken)
        fetchOrders()
      }
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <div className='w-full flex flex-col items-center mt-24 space-y-2'>
      <div className='w-full max-w-[800px] shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
        {/* Thanh Navigation */}
        <Navigation labels={tabLabels} value={selectedTab} onChange={handleTabChange} />
      </div>

      <div className='bg-[#fdf8e7] w-full max-w-[800px] min-h-[350px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg'>
        {/* Khung OrdersList */}
        <OrdersList orders={orders} />
      </div>

      <div className='flex justify-center mt-4'>
        {totalPages > 1 &&
          Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`w-10 h-10 px-1 py-[5px] mb-4 ${
                currentPage === index + 1 ? 'bg-[#7d0600] text-white' : 'bg-white text-[#212b36]'
              } rounded border border-[#dfe3e8] text-xl font-bold`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
      </div>
    </div>
  )
}

export default OrderTrackingPage
