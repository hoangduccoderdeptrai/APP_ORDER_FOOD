import * as React from 'react'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Button } from '~/components/ui/Button'
import authApi from '~/apis/auth'
import { Link } from 'react-router-dom'
import { routes } from '~/configs'
import { useNavigate } from 'react-router-dom'

const OTPCode = () => {
  const [otpCode, setOtpCode] = useState('')
  const [cooldown, setCooldown] = useState(300)

  const navigate = useNavigate()

  useEffect(() => {
    document.getElementById('otp-0')?.focus()

    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleOtpChange = (index, value) => {
    const newOtpCode = otpCode.split('')

    if (value === '') {
      newOtpCode[index] = ''
      setOtpCode(newOtpCode.join(''))
    } else if (/^\d$/.test(value)) {
      newOtpCode[index] = value
      setOtpCode(newOtpCode.join(''))
      document.getElementById(`otp-${index + 1}`)?.focus()
    }
  }

  const handleKeyDown = (index, event) => {
    const newOtpCode = otpCode.split('')

    if (event.key === 'Backspace') {
      if (!otpCode[index]) {
        newOtpCode[index - 1] = ''
        setOtpCode(newOtpCode.join(''))
        document.getElementById(`otp-${index - 1}`)?.focus()
      } else {
        newOtpCode[index] = ''
        setOtpCode(newOtpCode.join(''))
      }
    }
  }

  const handlePaste = (event) => {
    event.preventDefault()
    const pasteData = event.clipboardData.getData('Text').slice(0, 6)
    if (/^\d{1,6}$/.test(pasteData)) {
      setOtpCode(pasteData)

      if (pasteData.length === 6) {
        document.getElementById('otp-5')?.focus()
      }
    }
  }

  const focusFirstEmptyField = () => {
    for (let i = 0; i < 6; i++) {
      if (!otpCode[i]) {
        document.getElementById(`otp-${i}`)?.focus()
        break
      }
    }
  }

  const formatCooldown = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleSubmit = async () => {
    try {
      const res = await toast.promise(
        authApi.verifyOTP(sessionStorage.getItem('email') || '', otpCode),
        {
          pending: 'Đang xử lý ...',
          success: 'Xác thực thành công!',
          error: {
            render({ data }) {
              return `${data}`
            },
          },
        },
      )

      sessionStorage.setItem('otp', otpCode)
      navigate(routes.CHANGEPASSWORD)
    } catch (error) {}
  }

  const handleSentOTP = async () => {
    try {
      const res = await toast.promise(authApi.getOTP(sessionStorage.getItem('email') || ''), {
        pending: 'Đang xử lý ...',
        success: 'Đã gửi mã xác thực!',
        error: {
          render({ data }) {
            return `${data}`
          },
        },
      })

      setCooldown(300)
    } catch (error) {}
  }

  return (
    <div className='w-full justify-center p-4'>
      {/* Đăng kí tài khoản */}
      <div className="block text-center text-primary text-4xl sm:text-6xl font-medium font-['Oswald'] uppercase leading-none sm:leading-[100px] my-10">
        Nhập mã xác thực
      </div>

      <div className='text-center text-primaryText my-6'>
        Nhập mã xác thực vừa được gửi đến mail của bạn
      </div>

      <div className='flex flex-col gap-8 max-w-[500px] mx-auto'>
        <div className='flex flex-col gap-3 mb-2'>
          <div className='flex w-full justify-center' onClick={focusFirstEmptyField}>
            <div className='flex gap-1'>
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type='text'
                  value={otpCode[index] || ''}
                  maxLength={1}
                  className='mx-[3px] h-16 w-16 rounded-xl bg-[#dad9d9] text-center focus:outline-gray-400 text-[20px]'
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onFocus={(e) => e.target.select()}
                  onPaste={handlePaste}
                  style={{ pointerEvents: 'none' }}
                />
              ))}
            </div>
          </div>
          <div className='mr-10 text-right'>
            {cooldown !== 0 ? (
              <span className='text-content'>
                Gửi lại OTP sau <span className='text-primary'>{formatCooldown(cooldown)}</span>
              </span>
            ) : (
              <span className='cursor-pointer text-primary hover:underline' onClick={handleSentOTP}>
                Gửi lại
              </span>
            )}
          </div>
        </div>
        <Button className='h-12 text-lg' onClick={handleSubmit}>
          Gửi OTP
        </Button>
      </div>
    </div>
  )
}

export default OTPCode
