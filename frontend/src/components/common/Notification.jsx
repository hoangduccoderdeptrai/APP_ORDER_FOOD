import { toast } from 'react-toastify'
import { deleteItem } from '../../features/products-slice'

// Thông báo thành công
export const SuccessfulNotification = (name) => {
  const toastId = `${name}-success`
  if (!toast.isActive(toastId)) {
    toast.success(`${name} thành công!`)
  }
}
export const newOderNotify = () => {
  return toast.success('Bạn có một Order mới đang chờ duyệt.')
}
// Thông báo thất bại
export const FailedNotification = (name) => {
  return toast.error(`${name} thất bại!`)
}

// Thông báo truy cập thất bại
export const FailedAccess = async (name) => {
  return toast.error(`${name} access. Redirecting to login.`)
}
