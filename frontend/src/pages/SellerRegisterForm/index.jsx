import * as React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from '~/components/ui/Button'
import { ImageUploader } from '~/components/ui/ImageUploader'
import RequiredTextField from '~/components/ui/RequiredTextField'
import NumericTextField from '~/components/ui/NumericTextField'
import CustomSelect from '~/components/ui/CustomSelect'
import TimeInput from '~/components/ui/TimeInput'
import TextField from '@mui/material/TextField'
import NameTextField from '~/components/ui/NameTextField'
import EmailTextField from '~/components/ui/EmailTextField'
import PasswordTextField from '~/components/ui/PasswordTextField'
import DisabledTextField from '~/components/ui/DisabledTextField'
import authApi from '~/apis/auth'

const SellerRegisterForm = () => {
  const Areas = [
    'Quận 1',
    'Quận 3',
    'Quận 4',
    'Quận 5',
    'Quận 6',
    'Quận 7',
    'Quận 8',
    'Quận 10',
    'Quận 11',
    'Quận 12',
    'Tân Bình',
    'Bình Tân',
    'Bình Thạnh',
    'Tân Phú',
    'Gò Vấp',
    'Phú Nhuận',
    'Bình Chánh',
    'Hóc Môn',
    'Cần Giờ',
    'Củ Chi',
    'Nhà Bè',
    'Thành phố Thủ Đức',
  ]

  const areasOptions = Areas.map((area) => ({
    label: area,
    value: area,
  }))

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [restaurantName, setRestaurantName] = useState('')
  const [restaurantPhone, setRestaurantPhone] = useState('')
  const [area, setArea] = useState('')
  const [detailedAddress, setDetailedAddress] = useState('')
  const [openTime, setOpenTime] = useState('')
  const [closeTime, setCloseTime] = useState('')
  const [description, setDescription] = useState('')
  const [avatar, setAvatar] = useState(null)
  const [images, setImages] = useState([])

  const handleAvatarChange = (file) => {
    setAvatar(file)
  }

  const handleImagesChange = (files) => {
    setImages(files)
  }

  const validateDetailedAddress = (address) => {
    return !Areas.some((area) => address.includes(area))
  }

  const handleSellerRegister = async () => {
    if (!validateDetailedAddress(detailedAddress)) {
      toast.error('Địa chỉ chi tiết không được bao gồm khu vực!')
      return
    }

    const formData = new FormData()

    const infoAccount = {
      name,
      role: 'seller',
      address: address,
      password_account: password,
      name_account: username,
      email,
      phone,
    }

    const infoRestaurant = {
      name: restaurantName,
      address: {
        city: 'TP. Hồ Chí Minh',
        street: detailedAddress,
        borough: area,
      },
      phone: restaurantPhone,
      time_close: closeTime,
      time_open: openTime,
      description,
    }

    formData.append('infoAccount', JSON.stringify(infoAccount))
    formData.append('infoRestaurant', JSON.stringify(infoRestaurant))

    if (avatar) formData.append('avatar', avatar)
    images.forEach((image) => formData.append('images', image))

    try {
      const res = await authApi.sellerRegister(formData)
      console.log(res)
      toast.success('Đăng ký thành công!')
    } catch (error) {
      console.error(error)
      toast.error('Đã xảy ra lỗi trong quá trình đăng ký!')
    }
  }

  return (
    <div className='w-full justify-center p-4'>
      <div className="block text-center text-primary text-4xl sm:text-6xl font-medium font-['Oswald'] uppercase leading-none sm:leading-[100px] my-10">
        Đăng kí bán hàng
      </div>

      <NameTextField
        id='name'
        label='Họ và tên'
        value={name}
        handleChange={(e) => setName(e.target.value)}
      />
      <EmailTextField
        id='email'
        label='Email'
        value={email}
        handleChange={(e) => setEmail(e.target.value)}
      />
      <NumericTextField
        id='phone'
        label='Số điện thoại'
        value={phone}
        handleChange={(e) => setPhone(e.target.value)}
      />
      <RequiredTextField
        id='address'
        label='Địa chỉ'
        value={address}
        handleChange={(e) => setAddress(e.target.value)}
      />
      <RequiredTextField
        id='username'
        label='Tên tài khoản'
        value={username}
        handleChange={(e) => setUsername(e.target.value)}
      />
      <PasswordTextField
        id='password'
        label='Mật khẩu'
        confirm
        value={password}
        handleChange={(e) => setPassword(e.target.value)}
      />
      <RequiredTextField
        id='restaurantName'
        label='Tên quán'
        value={restaurantName}
        handleChange={(e) => setRestaurantName(e.target.value)}
      />
      <NumericTextField
        id='restaurantPhone'
        label='Số điện thoại của quán'
        value={restaurantPhone}
        handleChange={(e) => setRestaurantPhone(e.target.value)}
      />

      <div className='flex justify-between gap-4 mx-auto w-[500px] my-5 items-center'>
        <DisabledTextField value='TP. Hồ Chí Minh' />
        <CustomSelect
          id='area'
          label='Khu vực'
          options={areasOptions}
          value={area}
          handleChange={setArea}
        />
      </div>

      <RequiredTextField
        id='detailedAddress'
        label='Nhập địa chỉ chi tiết (không bao gồm quận)'
        value={detailedAddress}
        handleChange={(e) => setDetailedAddress(e.target.value)}
      />

      <div className='flex flex-col sm:flex-row justify-between sm:gap-10 mx-auto w-full sm:w-[500px] my-5'>
        <TimeInput
          id='openTime'
          label='Giờ mở cửa'
          value={openTime}
          handleChange={(e) => setOpenTime(e.target.value)}
        />
        <TimeInput
          id='closeTime'
          label='Giờ đóng cửa'
          value={closeTime}
          handleChange={(e) => setCloseTime(e.target.value)}
        />
      </div>

      <RequiredTextField
        id='description'
        label='Nhập mô tả/ lời giới thiệu của quán'
        value={description}
        handleChange={(e) => setDescription(e.target.value)}
      />

      <div className='flex flex-col sm:flex-row justify-between items-center mx-auto w-full sm:w-[500px] my-5'>
        <label
          htmlFor='avatar-upload'
          className='block text-sm font-medium leading-6 text-primaryText'
        >
          Đính kèm ảnh của quán
        </label>
        <div className='flex w-full sm:w-[300px] justify-center rounded-lg border-2 border-dashed border-gray-900/25 px-6 py-10'>
          <ImageUploader maxImages={1} handleAvatarChange={handleAvatarChange} />
        </div>
      </div>

      <div className='flex flex-col sm:flex-row justify-between items-center mx-auto w-full sm:w-[500px] my-5'>
        <label
          htmlFor='images-upload'
          className='block text-sm font-medium leading-6 text-primaryText'
        >
          Đính kèm 4 ảnh nổi bật
        </label>
        <div className='flex w-full sm:w-[300px] justify-center rounded-lg border-2 border-dashed border-gray-900/25 px-6 py-10'>
          <ImageUploader maxImages={4} handleImagesChange={handleImagesChange} />
        </div>
      </div>

      <div className='flex justify-center my-5'>
        <Button
          id='submit-button'
          variant='outline'
          className="w-36 h-12 rounded-full bg-primary hover:bg-primary/80 text-center text-white text-xl font-bold font-['Roboto'] leading-[30px]"
          onClick={handleSellerRegister}
        >
          Đăng ký
        </Button>
      </div>
    </div>
  )
}

export default SellerRegisterForm
