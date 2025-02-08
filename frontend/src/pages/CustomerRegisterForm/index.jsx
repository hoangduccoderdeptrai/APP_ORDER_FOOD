import * as React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from '~/components/ui/Button'
import RequiredTextField from '~/components/ui/RequiredTextField'
import NumericTextField from '~/components/ui/NumericTextField'
import PasswordTextField from '~/components/ui/PasswordTextField'
import EmailTextField from '~/components/ui/EmailTextField'
import NameTextField from '~/components/ui/NameTextField'
import authApi from '~/apis/auth'
import { Link } from 'react-router-dom'
import { routes } from '~/configs'
import { useNavigate } from 'react-router-dom'

const CustomerRegisterForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const isValidPhone = (phone) => {
    const phoneRegex = /^[0-9]{10,11}$/
    return phoneRegex.test(phone)
  }

  const handleCustomerRegister = async () => {
    if (!isValidEmail(email)) {
      toast.error('Email không hợp lệ. Vui lòng nhập đúng định dạng email.')
      return
    }

    if (!isValidPhone(phone)) {
      toast.error('Số điện thoại không hợp lệ. Vui lòng nhập số có 10-11 chữ số.')
      return
    }

    const formData = new FormData()

    const infoCustomer = {
      name,
      role: 'customer',
      address,
      password_account: password,
      name_account: username,
      email,
      phone,
    }

    formData.append('infoAccount', JSON.stringify(infoCustomer))

    try {
      const res = await authApi.customerRegister(formData)
      toast.success('Đăng ký thành công, hãy đăng nhập lại!')

      navigate(routes.HOME)
    } catch (error) {
      console.error(error)
      toast.error('Đã xảy ra lỗi trong quá trình đăng ký!')
    }
  }

  return (
    <div className='w-full justify-center p-4'>
      <div className="block text-center text-primary text-4xl sm:text-6xl font-medium font-['Oswald'] uppercase leading-none sm:leading-[100px] my-10">
        Đăng kí tài khoản
      </div>

      <div className='text-center text-primaryText my-5'>
        Bạn muốn trở thành đối tác của chúng tôi?
        <Link to={routes.SELLER_REGISTER}>
          <Button variant='none'>Đăng ký trở thành người bán hàng ngay</Button>
        </Link>
      </div>

      {/* Họ và tên */}
      <NameTextField label='Họ và tên' value={name} handleChange={(e) => setName(e.target.value)} />

      {/* Email */}
      <EmailTextField label='Email' value={email} handleChange={(e) => setEmail(e.target.value)} />

      {/* Số điện thoại */}
      <NumericTextField
        label='Số điện thoại'
        value={phone}
        handleChange={(e) => setPhone(e.target.value)}
      />

      {/* Địa chỉ */}
      <RequiredTextField
        label='Địa chỉ'
        value={address}
        handleChange={(e) => setAddress(e.target.value)}
      />

      {/* Tên tài khoản */}
      <RequiredTextField
        label='Tên tài khoản'
        value={username}
        handleChange={(e) => setUsername(e.target.value)}
      />

      {/* Mật khẩu */}
      <PasswordTextField
        label='Mật khẩu'
        confirm
        value={password}
        handleChange={(e) => setPassword(e.target.value)}
      />

      <div className='flex flex-col sm:flex-row items-center justify-center gap-4 my-5'>
        <Button
          variant='outline'
          className="w-full sm:w-36 h-12 rounded-full bg-primary hover:bg-primary/80 text-center text-white text-xl font-bold font-['Roboto'] leading-[30px]"
          onClick={handleCustomerRegister}
        >
          Đăng ký
        </Button>

        <div className='text-primaryText text-center sm:text-left'>
          Bạn đã có tài khoản?
          <Button variant='none'>Đăng nhập ngay</Button>
        </div>
      </div>
    </div>
  )
}

export default CustomerRegisterForm
