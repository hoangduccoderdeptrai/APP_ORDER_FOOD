import * as React from 'react'
import { useState } from 'react'
import { Button } from '~/components/ui/Button'
import RequiredTextField from '~/components/ui/RequiredTextField'
import NumericTextField from '~/components/ui/NumericTextField'
import PasswordTextField from '~/components/ui/PasswordTextField'
import EmailTextField from '~/components/ui/EmailTextField'
import NameTextField from '~/components/ui/NameTextField'
import authApi from '~/apis/auth'

const CustomerRegisterForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleCustomerRegister = async () => {
    const infoCustomer = {
      name,
      role: 'customer',
      address,
      password_account: password,
      name_account: username,
      email,
      phone,
    }

    try {
      const res = await authApi.customerRegister(infoCustomer)
    } catch (error) {}
  }

  return (
    <div className='w-full justify-center'>
      {/* Đăng kí tài khoản */}
      <div className="block text-center text-primary text-6xl font-medium font-['Oswald'] uppercase leading-[100px] my-10">
        Đăng kí tài khoản
      </div>

      <div className='text-center text-primaryText my-5'>
        Bạn muốn trở thành đối tác của chúng tôi?
        <Button variant='none'>Đăng ký trở thành người bán hàng ngay</Button>
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
        confirm='true'
        value={password}
        handleChange={(e) => setPassword(e.target.value)}
      />

      <div className='flex items-center justify-center gap-[54px] my-5'>
        <Button
          variant='outline'
          className="w-36 h-12 rounded-full bg-primary hover:bg-primary/80 text-center text-white text-xl font-bold font-['Roboto'] leading-[30px]"
          onClick={handleCustomerRegister}
        >
          Đăng ký
        </Button>

        <div className='text-primaryText'>
          Bạn đã có tài khoản?
          <Button variant='none'>Đăng nhập ngay</Button>
        </div>
      </div>
    </div>
  )
}

export default CustomerRegisterForm
