import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import AvatarUploader from '~/components/ui/AvatarUploader'
import { TextField, Button, Box, Container } from '@mui/material'
import RestaurantApiInstance from '~/apis/myrestaurant'
import UploadImg from './components/uploadImg'

const MyRestaurant = () => {
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: '',
    phone: '',
    address: { street: '', city: '', borough: '' },
    description: '',
    time_open: '',
    time_close: '',
  })
  const [avatar, setAvatar] = useState('')
  const [isChanged, setIsChanged] = useState(false)
  const [images, setImages] = useState([null, null, null, null])
  const fetchRestaurantInfo = async () => {
    try {
      const response = await RestaurantApiInstance.getMyRestaurant()
      const { restaurant } = response
      setRestaurantInfo(restaurant)
      setAvatar(restaurant.imageUrl[0].url)
      const restaurantImages = restaurant.imageUrl.slice(1, 5)
      setImages([
        restaurantImages[0]?.url || null,
        restaurantImages[1]?.url || null,
        restaurantImages[2]?.url || null,
        restaurantImages[3]?.url || null,
      ])
    } catch (error) {
      toast.error('Không thể tải thông tin nhà hàng.')
      console.error(error)
    }
  }

  useEffect(() => {
    fetchRestaurantInfo()
  }, [])

  const handleInputChange = (field, value) => {
    setRestaurantInfo((prev) => ({ ...prev, [field]: value }))
    setIsChanged(true)
  }

  const handleAddressChange = (field, value) => {
    setRestaurantInfo((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }))
    setIsChanged(true)
  }

  // Hàm để format thời gian đúng định dạng HH:mm
  const formatTime = (time) => {
    if (!time) return ''
    const [hour, minute] = time.split(':')
    return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`
  }

  const handleSave = async () => {
    try {
      const formData = new FormData()
      formData.append('name', restaurantInfo.name)
      formData.append('phone', restaurantInfo.phone)
      formData.append('description', restaurantInfo.description)
      formData.append('time_open', restaurantInfo.time_open)
      formData.append('time_close', restaurantInfo.time_close)
      formData.append('address', JSON.stringify(restaurantInfo.address))
      if (avatar && typeof avatar === 'object') {
        formData.append('avatar', avatar)
      }
      images.forEach((image) => formData.append('images', image))
      formData.append('index', JSON.stringify(indexes))
      const res = await RestaurantApiInstance.patchMyRestaurant(formData)
      toast.success('Cập nhật thông tin thành công!')
      setIndexes([])
      setIsChanged(false)
    } catch (error) {
      toast.error('Có lỗi xảy ra khi cập nhật.')
      console.error(error)
    }
  }

  const uploadImg = (avatar) => {
    setAvatar(avatar)
    setIsChanged(true)
  }

  const [indexes, setIndexes] = useState([])

  const handleUploadImage = (index, file) => {
    const updatedImages = [...images]
    setIndexes((prevIndexes) => {
      if (!prevIndexes.includes(index)) {
        return [...prevIndexes, index]
      }
      return prevIndexes
    })
    updatedImages[index] = file
    setImages(updatedImages)
    setIsChanged(true)
  }

  return (
    <Container maxWidth='md' className='p-5'>
      <Box display='flex' flexDirection={{ xs: 'column', sm: 'row' }} gap={4}>
        <Box flex={1} display='flex' justifyContent='center' marginTop={20}>
          {avatar && <AvatarUploader currentAvatar={avatar} onAvatarChange={uploadImg} />}
        </Box>
        <Box flex={2}>
          <h1 className='text-[40px] uppercase text-primary font-bold text-left mb-10'>
            Nhà Hàng Của Tôi
          </h1>
          <TextField
            label='Tên nhà hàng'
            fullWidth
            value={restaurantInfo.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            margin='normal'
          />
          <TextField
            label='Số điện thoại'
            fullWidth
            value={restaurantInfo.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            margin='normal'
          />
          <TextField
            label='Mô tả'
            fullWidth
            multiline
            rows={3}
            value={restaurantInfo.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            margin='normal'
          />
          <Box display='flex' gap={2}>
            <TextField
              label='Giờ mở cửa'
              fullWidth
              value={formatTime(restaurantInfo.time_open)}
              onChange={(e) => handleInputChange('time_open', e.target.value)}
              margin='normal'
              type='time'
            />
            <TextField
              label='Giờ đóng cửa'
              fullWidth
              value={formatTime(restaurantInfo.time_close)}
              onChange={(e) => handleInputChange('time_close', e.target.value)}
              margin='normal'
              type='time'
            />
          </Box>
          <TextField
            label='Đường'
            fullWidth
            value={restaurantInfo.address.street}
            onChange={(e) => handleAddressChange('street', e.target.value)}
            margin='normal'
          />
          <TextField
            label='Thành phố'
            fullWidth
            value={restaurantInfo.address.city}
            onChange={(e) => handleAddressChange('city', e.target.value)}
            margin='normal'
          />
          <TextField
            label='Quận'
            fullWidth
            value={restaurantInfo.address.borough}
            onChange={(e) => handleAddressChange('borough', e.target.value)}
            margin='normal'
          />
          <div className='flex gap-5 mt-5'>
            {images.map((image, index) => {
              return (
                <UploadImg
                  key={index}
                  index={index}
                  currentImage={image}
                  onImageChange={handleUploadImage}
                />
              )
            })}
          </div>
          <div className='mt-5 mb-10'>
            <Button variant='contained' color='primary' disabled={!isChanged} onClick={handleSave}>
              Lưu thay đổi
            </Button>
          </div>
        </Box>
      </Box>
    </Container>
  )
}

export default MyRestaurant
