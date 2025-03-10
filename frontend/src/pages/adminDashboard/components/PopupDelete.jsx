import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Button } from '@mui/material'

export default function PopupDelete({ handleDeleteAccount, userId }) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirmDelete = () => {
    handleDeleteAccount(userId)
    setOpen(false)
  }

  return (
    <>
      <button className='bg-red-500 text-white px-4 py-2 rounded' onClick={handleClickOpen}>
        <i className='bx bx-trash'></i> Xóa tài khoản
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Xác nhận xóa tài khoản</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Bạn có chắc chắn muốn xóa tài khoản này không? Thao tác này không thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Hủy
          </Button>
          <Button onClick={handleConfirmDelete} color='error' autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
