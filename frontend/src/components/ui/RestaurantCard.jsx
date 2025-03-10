import React from 'react'
import StarRateIcon from '@mui/icons-material/StarRate'
import { Link } from 'react-router-dom'
import { routes } from '~/configs'

const formatNumber = (number) => {
  return new Intl.NumberFormat().format(number)
}

const RestaurantCard = ({ image, rating, restaurant, address, id }) => {
  return (
    <Link
      to={`${routes.DETAILS}/${id}`}
      className='rounded-[20px] h-[350px] md:h-[400px] w-full min-w-[80px] max-w-[220px] md:max-w-[260px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] cursor-pointer flex flex-col transition-transform duration-300 hover:scale-105'
    >
      <div
        className='rounded-t-[20px] w-full h-[200px] sm:h-[246px] flex flex-col justify-between'
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className='justify-center items-center ml-auto text-[12px] sm:text-[15px] font-medium flex gap-1 px-[5px] py-[3px] rounded-3xl min-w-[70px] bg-white bg-opacity-80 mt-2 mr-2'>
          <p>{rating.toFixed(1)}/5</p>
          <StarRateIcon className='text-yellow-500' sx={{ fontSize: '18px' }} />
        </div>
      </div>
      <div className='bg-[#F0F1F2] py-3 px-4 w-full text-center flex-grow rounded-b-3xl text-primaryText'>
        <p className='text-[20px]  font-semibold mx-auto mb-2 line-clamp-2 flex-grow'>
          {restaurant}
        </p>
        <p className='text-[12px]  font-light mx-auto max-w-[200px] text-center mb-5'>{address}</p>
      </div>
    </Link>
  )
}

export default RestaurantCard
