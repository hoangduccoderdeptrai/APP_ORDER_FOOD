import React, { useState } from 'react'
import ImageUploading from 'react-images-uploading'
import { Button } from '@mui/material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'

export function ImageUploader({ maxImages, handleAvatarChange, handleImagesChange }) {
  const [images, setImages] = useState([])

  const onChange = (imageList) => {
    setImages(imageList)

    if (maxImages === 1) {
      handleAvatarChange(imageList[0]?.file)
    } else {
      handleImagesChange(imageList.map((image) => image.file))
    }
  }

  return (
    <ImageUploading
      multiple={maxImages > 1}
      value={images}
      onChange={onChange}
      maxNumber={maxImages}
      dataURLKey='data_url'
    >
      {({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
        <div className='text-center'>
          {/* Nút bấm Đổi hình */}
          <Button
            variant='outlined'
            startIcon={<PhotoCameraIcon />}
            onClick={onImageUpload}
            {...dragProps}
            className={`rounded-full ${
              isDragging ? 'border-dashed border-4 border-indigo-600' : ''
            }`}
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
            Thêm ảnh
          </Button>

          {/* Hiển thị hình ảnh đã upload */}
          {imageList.map((image, index) => (
            <div key={index} className='my-5'>
              <img src={image['data_url']} alt='Uploaded' width='100%' />
              <div className='flex justify-center mt-2 gap-4'>
                <Button
                  variant='outlined'
                  onClick={() => onImageUpdate(index)}
                  sx={{ color: '#000', borderColor: '#ccc' }}
                >
                  Cập nhật
                </Button>
                <Button
                  variant='outlined'
                  onClick={() => onImageRemove(index)}
                  sx={{ color: '#000', borderColor: '#ccc' }}
                >
                  Xóa
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </ImageUploading>
  )
}

export default ImageUploader
