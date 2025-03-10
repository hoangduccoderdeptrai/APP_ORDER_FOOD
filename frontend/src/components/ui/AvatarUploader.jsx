import React, { useState } from 'react'
import { Button } from '@mui/material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'

const AvatarUploader = ({ currentAvatar, onAvatarChange }) => {
  const [avatar, setAvatar] = useState(currentAvatar)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setAvatar(imageUrl)
      onAvatarChange(file)
    }
  }

  return (
    <div className='flex flex-col items-center'>
      {/* Avatar Display */}
      <div className='mb-4 flex justify-center'>
        {avatar ? (
          <img
            src={avatar}
            alt='Avatar'
            className='w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full object-cover border border-gray-300'
          />
        ) : (
          <div className='w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full bg-gray-200 flex items-center justify-center'>
            <span className='text-gray-500'>Chưa có ảnh</span>
          </div>
        )}
      </div>

      {/* Button */}
      <input
        type='file'
        accept='image/*'
        id='avatar-upload'
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      <label htmlFor='avatar-upload'>
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

export default AvatarUploader
