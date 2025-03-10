import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Skeleton } from '@mui/material'

import RestaurantImage from './_components/RestaurantImage.jsx'
import RestaurantInfo from './_components/RestaurantInfo'
import FoodDetails from './_components/FoodDetails'
import FoodCart from './_components/FoodCart'
import { formatNumber } from '~/helpers/wordHelpper'
import { Button } from '~/components/ui/Button'
import DetailsApiInstance from '~/apis/details'
import BookingModal from './_components/BookingModal'
import useAuth from '~/stores/useAuth'
import LoginModal from '~/components/Layout/Components/_components/LoginModal'
import ReviewList from './_components/ReviewList.jsx'
import homeBackground from '~/assets/images/home/home-bg.png'

const DetailsPage = () => {
  const { user, isAuth } = useAuth()

  const [data, setData] = useState()
  const [cart, setCart] = useState([])
  const [userInfo, setUserInfo] = useState(user)
  const { id } = useParams()

  const [searchParams] = useSearchParams()

  useEffect(() => {
    const foodId = searchParams.get('id') || ''

    const list = {
      listIdFood: [foodId],
    }

    const fetchData = async () => {
      try {
        const detailsData = await DetailsApiInstance.getDetails(id, list)
        setData(detailsData)
      } catch (error) {}
    }

    id && fetchData()
  }, [id])

  const handleAddItem = (id) => {
    const itemToAdd = data.listAllFood.find((item) => item._id === id)
    if (!itemToAdd) return

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === id)

      if (existingItem) {
        return prevCart.map((item) =>
          item._id === id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }

      return [...prevCart, { ...itemToAdd, quantity: 1 }]
    })
  }

  const isItemDisabled = (id) => {
    const cartItem = cart.find((item) => item._id === id)
    const foodItem = data.listAllFood.find((item) => item._id === id)
    if (foodItem.quantity === 0) return true
    if (!cartItem && foodItem.quantity > 0) return false
    return cartItem.quantity >= foodItem.quantity || foodItem.quantity === 0
  }

  const handleIncreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity:
                item.quantity < data.listAllFood.find((f) => f._id === id).quantity
                  ? item.quantity + 1
                  : item.quantity,
            }
          : item,
      ),
    )
  }

  const handleDecreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item._id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const totalAmount = cart.reduce(
    (total, item) => total + (item.price - item.price * (item.discount / 100)) * item.quantity,
    0,
  )

  const onChangeQuality = (id, value) => {
    const itemFind = data.listAllFood.find((item) => item._id === id)
    if (value > itemFind.quantity) return

    setCart((prevCart) =>
      prevCart
        .map((item) => (item._id === id ? { ...item, quantity: value } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const transformMenuItems = (items) => {
    return items.map((item) => ({
      menuItemId: item._id,
      quantity: item.quantity.toString(),
    }))
  }

  return (
    <div className='max-w-[1250px] mx-auto py-10'>
      {data ? (
        <div className='w-full flex gap-8'>
          <RestaurantImage restaurant={data?.restaurant} />
          <div className='flex-1'>
            <RestaurantInfo restaurantInfo={data?.restaurant} />
          </div>
        </div>
      ) : (
        <div className='w-full flex justify-between gap-8'>
          <Skeleton variant='rectangular' width={455} height={500} />
          <Skeleton variant='rectangular' className='flex-1' height={400} />
        </div>
      )}

      {data && (
        <div className='flex justify-between gap-10 my-14'>
          <div className='flex flex-col gap-3.5'>
            {data?.listAllFood.map((food, index) => (
              <FoodDetails
                food={food}
                key={index}
                disabled={isItemDisabled(food?._id)}
                onClick={() => handleAddItem(food?._id)}
              />
            ))}
          </div>

          <div
            className='w-[500px] h-fit px-[30px] py-10 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-xl flex flex-col items-center justify-center'
            style={{
              position: 'sticky',
              top: '100px',
            }}
          >
            <h2 className='font-bold text-primary text-[30px] mb-10'>GIỎ HÀNG CỦA TÔI</h2>
            <div className='flex flex-col gap-3 max-h-[400px] overflow-y-auto px-1 py-2'>
              {cart.length !== 0 ? (
                cart?.map((item) => (
                  <FoodCart
                    foodInfo={item}
                    key={item?._id}
                    onIncrease={() => handleIncreaseQuantity(item?._id)}
                    onDecrease={() => handleDecreaseQuantity(item?._id)}
                    onChangeQuality={(value) => onChangeQuality(item?._id, value)}
                  />
                ))
              ) : (
                <div className='opacity-50'>
                  <img
                    src='/assets/images/empty_cart.png'
                    alt=''
                    className='mx-auto max-w-60 mt-[-30px] h-auto'
                  />
                  <p className='text-center mt-[-30px]'>Giỏ hàng của bạn đang trống</p>
                </div>
              )}
            </div>

            <div className='w-full py-4 mt-5 flex flex-col items-center'>
              <div className='flex w-full justify-between font-bold text-2xl'>
                <p>Tổng tiền:</p>
                <div className='flex gap-1 items-end text-primary'>
                  <p>{formatNumber(totalAmount)}</p>
                  <span className='text-[12px] font-light pb-1'>VND</span>
                </div>
              </div>

              {cart.length > 0 &&
                (userInfo ? (
                  <BookingModal
                    className='rounded-xl font-bold flex justify-center items-center bg-secondary text-[#FDFDFD] cursor-pointer text-xl h-10 w-[50%] mx-auto mt-5 hover:bg-secondary/80'
                    user={userInfo}
                    restaurantId={data.restaurant._id}
                    items={transformMenuItems(cart)}
                  >
                    Đặt món
                  </BookingModal>
                ) : (
                  <LoginModal
                    setUserInfo={(user) => {
                      console.log(user)
                      setUserInfo(user)
                    }}
                    className='rounded-xl font-bold flex justify-center items-center bg-secondary text-[#FDFDFD] cursor-pointer text-xl h-10 w-[50%] mx-auto mt-5 hover:bg-secondary/80'
                  >
                    Đặt món
                  </LoginModal>
                ))}
            </div>
          </div>
        </div>
      )}

      {data && <ReviewList reviews={data?.listComment} />}
    </div>
  )
}

export default DetailsPage
