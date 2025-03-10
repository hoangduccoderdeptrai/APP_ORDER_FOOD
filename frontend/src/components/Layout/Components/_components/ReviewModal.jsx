import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Button } from '~/components/ui/Button'
import { FaStar } from 'react-icons/fa'
import ordersApi from '~/apis/orders'
import { toast } from 'react-toastify'

export default function ReviewModal({ open, onClose, items, idOrder }) {
  const [ratings, setRatings] = React.useState(items.map((item) => item.food.starMedium || 0))
  const [comment, setComment] = React.useState('')

  const renderStars = (rating, index, onRatingChange) => {
    return Array.from({ length: 5 }, (v, i) => (
      <FaStar
        key={i}
        color={i < rating ? '#FFD700' : '#E0E0E0'}
        onClick={() => onRatingChange(index, i + 1)}
        style={{ cursor: 'pointer' }}
      />
    ))
  }

  const handleRatingChange = (index, newRating) => {
    const newRatings = [...ratings]
    newRatings[index] = newRating
    setRatings(newRatings)
  }

  const handleSubmit = async () => {
    try {
      const listFood = items.map((item, index) => ({
        idFood: item.food._id,
        star: ratings[index].toString(),
      }))
      await ordersApi.postEvaluation(idOrder, comment, listFood)
      toast.success('Đánh giá thành công!')
      onClose()
    } catch (error) {
      console.error(error)
      toast.error('Có lỗi xảy ra trong quá trình đánh giá!')
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm'>
      <div className='w-[600px] bg-white rounded-[20px]'>
        <DialogTitle className='text-secondary bg-primary text-6xl font-bold uppercase text-center'>
          Đánh giá chất lượng
        </DialogTitle>
        <DialogContent className='flex flex-col items-center mt-5'>
          {items.map((item, index) => (
            <div
              key={index}
              className='flex w-full p-2 space-x-4 items-center mb-4 rounded-lg border'
            >
              {item.food.imageUrl[0] && item.food.imageUrl[0].url ? (
                <img
                  src={item.food.imageUrl[0].url}
                  alt={item.food.title}
                  className='flex-none w-32 h-24 rounded-[20px] object-cover'
                />
              ) : (
                <div className='flex-none w-32 h-24 rounded-[20px] bg-gray-200' />
              )}
              <div className='flex-grow'>
                <div className='text-lg font-bold mb-1'>{item.food.title}</div>
                <div className='flex items-center text-lg'>
                  {renderStars(ratings[index], index, handleRatingChange)}
                </div>
              </div>
            </div>
          ))}
          <textarea
            className='w-full h-32 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
            placeholder='Viết bình luận của bạn cho quán này...'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions className='flex justify-end gap-4 mx-4 mb-4'>
          <Button
            onClick={onClose}
            variant='outline'
            className='w-[130px] h-[50px] rounded-full border-2 border-black text-primaryText'
          >
            Trở về
          </Button>
          <Button
            onClick={handleSubmit}
            className='w-[130px] h-[50px] bg-primary text-white rounded-full'
          >
            Hoàn thành
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  )
}
