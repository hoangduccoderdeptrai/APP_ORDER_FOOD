import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { Button } from '~/components/ui/Button'
import RequiredTextField from '~/components/ui/RequiredTextField'
import { routes } from '~/configs'
import BookingApiInstance from '~/apis/booking'

export default function BookingModal({
  className,
  children,
  disabled = false,
  user,
  restaurantId,
  items,
}) {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [phone, setPhone] = useState(user?.phone)
  const [address, setAddress] = useState(user?.address)
  const [message, setMessage] = useState('')

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleBooking = async (restaurantId, items, deliveryAddress, phone, message) => {
    try {
      const res = await BookingApiInstance.bookingFood({
        restaurantId,
        items,
        deliveryAddress,
        phone,
        message,
      })

      toast.success('Đặt món thành công!')
      navigate(routes.ORDER_TRACKING)
    } catch (error) {
      toast.success('Đã có lỗi xảy ra, thử lại sau!')
    }
  }

  return (
    <React.Fragment>
      <div className={className} onClick={handleClickOpen}>
        {children}
      </div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '12px',
            width: fullScreen ? '100%' : '520px',
            backgroundImage: 'url("/assets/images/bg-login.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            paddingBottom: '24px',
          },
        }}
      >
        <DialogTitle
          id='responsive-dialog-title'
          className='flex items-center justify-end px-6 pb-6 pt-4'
        >
          <CloseIcon onClick={handleClose} className='cursor-pointer text-white' />
        </DialogTitle>
        <DialogContent className='px-10 flex flex-col'>
          <DialogContentText
            sx={{
              color: 'white',
              fontWeight: '700',
              marginRight: 'auto',
              marginLeft: 'auto',
              textAlign: 'center',
              fontSize: '1.125rem',
              marginBottom: '32px',
            }}
          >
            Hãy nhập thông tin bên dưới để tiến hành đặt món!
          </DialogContentText>
          {/* <DialogContentText className='flex flex-col'> */}
          <RequiredTextField
            placeholder='Số điện thoại đặt món'
            className='w-[400px]'
            whiteBg
            value={phone}
            handleChange={(e) => setPhone(e.target.value)}
          />
          {/* </DialogContentText> */}
          <RequiredTextField
            placeholder='Địa chỉ giao hàng'
            className='w-[400px] mt-0'
            whiteBg
            value={address}
            handleChange={(e) => setAddress(e.target.value)}
          />

          <RequiredTextField
            placeholder='Để lại lời nhắn cho quán'
            className='w-[400px] mt-0'
            whiteBg
            value={message}
            required={false}
            handleChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions className='flex flex-col gap-4 px-6 pb-8 mt-8'>
          <Button
            onClick={() => {
              handleBooking(restaurantId, items, address, phone, message)
              handleClose()
            }}
            autoFocus
            disabled={disabled}
            className='text-xl px-12 py-6'
          >
            Đặt món
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
