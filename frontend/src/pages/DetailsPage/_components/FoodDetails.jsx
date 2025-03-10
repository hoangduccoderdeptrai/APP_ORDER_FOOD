import React from 'react'
import { formatNumber, truncateStringToWords } from '~/helpers/wordHelpper'
import StarRateIcon from '@mui/icons-material/StarRate'
import BubblyButton from '~/components/ui/BubblyButton'

const FoodDetails = ({ food, onClick, disabled = false }) => {
  return (
    <div className='relative z-10 group rounded-xl flex p-5 h-[165px] w-[600px] gap-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
      <img
        src={food.imageUrl[0].url}
        alt=''
        className='rounded-xl object-cover w-[125px] h-auto shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'
      />

      <div className='flex flex-col gap-2 flex-1'>
        <div className='flex justify-between'>
          <h2 className='text-[22px] font-bold text-primary'>{food.title}</h2>
          <div className='flex items-center justify-center text-[15px] font-medium gap-1'>
            <p>{food.starMedium.toFixed(1)}/5</p>
            <StarRateIcon className='text-yellow-400' sx={{ fontSize: '20px' }} />
          </div>
        </div>
        <p className='text-sm'>
          <strong>Mô tả:</strong> {truncateStringToWords(food.description, 20)}
        </p>
        <div className=' flex justify-between items-end mt-auto'>
          <div className='flex gap-1 items-end text-primary'>
            <span className='font-bold text-[24px]'>
              {formatNumber(food.price - food.price * (food.discount / 100))}
            </span>
            {food.discount > 0 && (
              <span className='text-[16px] line-through'>{formatNumber(food.price)}</span>
            )}
            <span className='text-[12px] font-light pb-1'>VND</span>
          </div>

          <p>
            <strong>Số lượng còn lại:</strong> {food.quantity}
          </p>

          <BubblyButton
            disabled={disabled}
            onClick={onClick}
            className='bg-primary rounded-xl py-[1px] px-2.5 text-2xl text-white'
          >
            +
          </BubblyButton>
        </div>
      </div>
    </div>
  )
}

export default FoodDetails
