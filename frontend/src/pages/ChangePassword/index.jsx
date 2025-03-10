import * as React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from '~/components/ui/Button'
import PasswordTextField from '~/components/ui/PasswordTextField'
import authApi from '~/apis/auth'
import { Link } from 'react-router-dom'
import { routes } from '~/configs'
import { useNavigate } from 'react-router-dom'

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('')
  const navigate = useNavigate()

  const handlePasswordChange = async () => {
    try {
      const res = await toast.promise(
        authApi.forgotPassword(newPassword, sessionStorage.getItem('otp') || ''),
        {
          pending: 'Đang xử lý ...',
          success: 'Đổi mật khẩu thành công, hãy đăng nhập lại',
          error: {
            render({ data }) {
              return `${data}`
            },
          },
        },
      )

      navigate(routes.HOME)
    } catch (error) {}
  }

  return (
    <div className='w-full justify-center p-4'>
      {/* Đăng kí tài khoản */}
      <div className="block text-center text-primary text-4xl sm:text-6xl font-medium font-['Oswald'] uppercase leading-none sm:leading-[100px] my-10">
        Đổi mật khẩu
      </div>

      <div className='text-center text-primaryText my-5'>
        Nhập mật khẩu mới để thay đổi mật khẩu
      </div>

      <div className='max-w-[500px] mx-auto space-y-4'>
        <PasswordTextField
          className='w-full'
          label='Mật khẩu mới'
          value={newPassword}
          handleChange={(e) => setNewPassword(e.target.value)}
          confirm
        />
        <div className='flex justify-center mt-6'>
          <Button className='bg-primary text-white h-12 text-lg' onClick={handlePasswordChange}>
            Đổi mật khẩu
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
