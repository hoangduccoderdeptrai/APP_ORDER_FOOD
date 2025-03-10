import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'

const UploadImg = ({ index, currentImage, onImageChange }) => {
  const [image, setImage] = useState(currentImage)
  // bug quỷ, vì khi setImage(imageUrl) trong handleImageChange cập nhật đúng mà trong lúc đó currentImage cũng đổi nên usefect cập nhật lại sai nên là ảnh k hiển thị khi thực hiện đổi ảnh
  useEffect(() => {
    if (currentImage && typeof currentImage === 'string') {
      setImage(currentImage)
    }
  }, [currentImage])
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setImage(imageUrl)
      onImageChange(index, file)
    }
  }
  return (
    <div className='flex flex-col items-center'>
      <div className='mb-4'>
        {image ? (
          <img
            src={image}
            alt='Avatar'
            className='w-[150px] h-[100px] rounded-[20px] object-cover border border-gray-300'
          />
        ) : (
          <div className='w-[100px] h-[100px] rounded-[20px] bg-gray-200 flex items-center justify-center'>
            <span className='text-gray-500'>Chưa có ảnh</span>
          </div>
        )}
      </div>
      <input
        type='file'
        accept='image/*'
        id={`image-upload-${currentImage}`}
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      <label htmlFor={`image-upload-${currentImage}`}>
        <Button
          variant='outlined'
          startIcon={<PhotoCameraIcon />}
          component='span'
          sx={{
            color: '#000',
            borderColor: '#ccc',
            padding: '8px 16px',
            borderRadius: '24px',
            fontWeight: 'bold',
            fontSize: '14px',
            textTransform: 'none',
          }}
        >
          Đổi hình
        </Button>
      </label>
    </div>
  )
}

export default UploadImg
