import React, { useState } from 'react'
import { GrFormPrevious } from 'react-icons/gr'
import { GrFormNext } from 'react-icons/gr'

const RestaurantImage = ({ restaurant }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % restaurant.imageUrl.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? restaurant.imageUrl.length - 1 : prevIndex - 1,
    )
  }

  const handleImageClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  return (
    <div className='relative flex flex-col gap-5 w-[550px]'>
      <div className='relative overflow-hidden w-full h-[400px] rounded-xl'>
        <div
          className={`absolute inset-0 flex transition-transform duration-500 ease-in-out object-cover ${
            direction === 1
              ? '-translate-x-full'
              : direction === -1
                ? 'translate-x-full'
                : 'translate-x-0'
          }`}
          style={{
            transform: `translateX(-${currentIndex * 550}px)`,
            width: `${restaurant.imageUrl.length * 550}px`,
          }}
        >
          {restaurant.imageUrl.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={`Image ${index + 1}`}
              className='w-[550px] h-[400px] object-cover'
            />
          ))}
        </div>
      </div>

      <div
        onClick={handlePrev}
        className='flex absolute left-0 items-center opacity-20 hover:opacity-30  bg-gray-800 text-white p-4 h-[400px] cursor-pointer rounded-s-xl'
      >
        <GrFormPrevious size={30} />
      </div>
      <div
        onClick={handleNext}
        className='flex absolute right-0 items-center opacity-20 hover:opacity-30  bg-gray-800 text-white p-4 h-[400px] cursor-pointer rounded-e-xl'
      >
        <GrFormNext size={30} />
      </div>

      <div className='flex gap-2 overflow-x-auto'>
        {restaurant.imageUrl.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Thumbnail ${index + 1}`}
            className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 ${
              index === currentIndex ? 'border-blue-500' : 'border-transparent'
            }`}
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default RestaurantImage
