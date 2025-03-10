import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import SideNav from './components/SideNav'
import AvatarUploader from '~/components/ui/AvatarUploader'
import DisabledTextField from '~/components/ui/DisabledTextField'
import RequiredTextField from '~/components/ui/RequiredTextField'
import NumericTextField from '~/components/ui/NumericTextField'
import PasswordTextField from '~/components/ui/PasswordTextField'
import { Button } from '~/components/ui/Button'
import accountApi from '~/apis/account'
import authApi from '~/apis/auth'

const DetailAccount = () => {
  const [selectedTab, setSelectedTab] = useState('account')
  const [accountInfo, setAccountInfo] = useState(null)
  const [avatar, setAvatar] = useState(null)
  const [isChanged, setIsChanged] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const accountData = await accountApi.getAccount()
        setAccountInfo({
          name: accountData.name,
          email: accountData.email,
          phone: accountData.phone,
          name_account: accountData.name_account,
          address: accountData.address,
        })
        setAvatar(accountData.avatar?.url || null)
      } catch (error) {
        toast.error('Không thể tải thông tin tài khoản.')
        console.error('Error fetching account info:', error)
      }
    }

    fetchAccountInfo()
  }, [])

  const uploadImg = (avatar) => {
    setAvatar(avatar)
    setIsChanged(true)
  }

  const handleInputChange = (field, value) => {
    setAccountInfo((prev) => ({ ...prev, [field]: value }))
    setIsChanged(true)
  }

  const handleSave = async () => {
    try {
      const formData = new FormData()
      formData.append('phone', accountInfo.phone)
      formData.append('address', accountInfo.address)
      if (avatar instanceof File) {
        console.log('sdấdádad', avatar)
        formData.append('avatar', avatar)
      }
      await accountApi.updateAccount(formData)
      toast.success('Cập nhật thông tin thành công!')
      setIsChanged(false)
    } catch (error) {
      toast.error('Có lỗi xảy ra khi cập nhật tài khoản.')
      console.error('Error updating account:', error)
    }
  }

  const handlePasswordChange = async () => {
    try {
      await accountApi.changePassword({ oldPassword, password: newPassword })
      toast.success('Đổi mật khẩu thành công!')
      setOldPassword('')
      setNewPassword('')
    } catch (error) {
      toast.error(error.message || 'Có lỗi xảy ra khi đổi mật khẩu.')
      console.error('Error changing password:', error)
    }
  }

  const handleLogout = async () => {
    try {
      const msg = await authApi.signOut()
      toast.success(msg)
      window.location.href = '/'
    } catch (error) {
      toast.error(error.message || 'Có lỗi xảy ra khi đăng xuất.')
      console.error('Error signing out:', error)
    }
  }

  return (
    <div className='flex flex-wrap mt-[79px]'>
      <div className='w-full lg:w-1/5'>
        <SideNav selectedTab={selectedTab} onSelectTab={setSelectedTab} />
      </div>
      <div className='flex-1 w-full lg:w-4/5 px-4'>
        {selectedTab === 'account' && accountInfo && (
          <>
            <div className="block text-center text-primary text-4xl font-medium font-['Oswald'] uppercase leading-[100px] my-2">
              Hồ sơ của tôi
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-screen'>
              <div className='flex flex-col items-center'>
                <AvatarUploader currentAvatar={avatar} onAvatarChange={uploadImg} />
              </div>
              <div className='col-span-2 space-y-4'>
                <DisabledTextField className='w-full' label='Họ và tên' value={accountInfo.name} />
                <DisabledTextField className='w-full' label='Email' value={accountInfo.email} />
                <DisabledTextField
                  className='w-full'
                  label='Tên tài khoản'
                  value={accountInfo.name_account}
                />
                <NumericTextField
                  className='w-full'
                  label='Số điện thoại'
                  value={accountInfo.phone}
                  handleChange={(e) => handleInputChange('phone', e.target.value)}
                />
                <RequiredTextField
                  className='w-full'
                  label='Địa chỉ'
                  value={accountInfo.address}
                  handleChange={(e) => handleInputChange('address', e.target.value)}
                />
                <div className='flex justify-center'>
                  <Button
                    className={`mb-4 ${
                      isChanged
                        ? 'bg-primary text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!isChanged}
                    onClick={handleSave}
                  >
                    Lưu
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
        {selectedTab === 'change-password' && (
          <div className='min-h-screen'>
            <div className="block text-center text-primary text-4xl font-medium font-['Oswald'] uppercase leading-[100px] my-2">
              Đổi mật khẩu
            </div>
            <div className='max-w-[500px] mx-auto space-y-4'>
              <PasswordTextField
                className='w-full'
                label='Mật khẩu cũ'
                value={oldPassword}
                handleChange={(e) => setOldPassword(e.target.value)}
              />
              <PasswordTextField
                className='w-full'
                label='Mật khẩu mới'
                value={newPassword}
                handleChange={(e) => setNewPassword(e.target.value)}
                confirm
              />
              <div className='flex justify-center mt-6'>
                <Button className='bg-primary text-white' onClick={handlePasswordChange}>
                  Đổi mật khẩu
                </Button>
              </div>
            </div>
          </div>
        )}
        {selectedTab === 'logout' && (
          <div className='min-h-screen text-center mt-20'>
            <h5 className='text-xl font-bold'>Bạn có muốn đăng xuất?</h5>
            <Button className='mt-6 bg-red-500 text-white' onClick={handleLogout}>
              Đăng xuất
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default DetailAccount
