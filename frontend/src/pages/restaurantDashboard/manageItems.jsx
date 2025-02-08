import React, { useState, useEffect } from 'react'
import LoadingOverlay from 'react-loading-overlay-ts'
import hero from '../../assets/hero.png'
import ItemForm from '../../components/Dashboard/commom/ItemForm'
import { fetchAllItem, deleteItem, addItem, updateItem } from '../../features/products-slice'
import { useDispatch, useSelector } from 'react-redux'
import {
  SuccessfulNotification,
  FailedNotification,
} from '../../components/common/Notification.jsx'
import AddCircleIcon from '@mui/icons-material/AddCircle'

const ManageItems = () => {
  const dispatch = useDispatch()
  const { itemList, isLoading, error } = useSelector((state) => state.RestaurantItems)

  const [openForm, setOpenForm] = useState(false)
  const [rawData, setRawData] = useState(null)
  const [imgFile, setImgFile] = useState(null)
  const [currentEditedId, setCurrentEditedId] = useState(null)
  const [currentUrl, setCurrentUrl] = useState(null)

  const handleCreateItem = () => {
    setCurrentEditedId(null)
    setOpenForm(true)
    setRawData({
      images: '',
      title: '',
      description: '',
      category: '',
      price: '',
      quantity: '',
      discount: '',
    })
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      const formData = new FormData()
      formData.append('title', rawData.title)
      formData.append('description', rawData.description)
      formData.append('price', rawData.price)
      formData.append('category', rawData.category)
      formData.append('quantity', rawData.quantity)
      formData.append('discount', rawData.discount)

      if (imgFile) {
        formData.append('images', imgFile)
      }

      if (currentEditedId) {
        await dispatch(updateItem({ currentEditedId, formData }))
        SuccessfulNotification('Cập nhật món')
      } else {
        await dispatch(addItem(formData))
        SuccessfulNotification('Thêm món')
      }
      dispatch(fetchAllItem())
      setOpenForm(false)
    } catch (err) {
      FailedNotification('Xử lý món')
    }
  }

  const handleDeleteItem = async (id) => {
    try {
      await dispatch(deleteItem(id))
      SuccessfulNotification('Xóa món')
      dispatch(fetchAllItem())
    } catch (err) {
      FailedNotification('Xóa món')
    }
  }

  useEffect(() => {
    dispatch(fetchAllItem())
  }, [dispatch])

  return (
    <LoadingOverlay
      active={isLoading}
      spinner
      text='Loading...'
      styles={{
        overlay: (base) => ({
          ...base,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
        }),
      }}
    >
      <div className='relative mx-5 my-2 px-3 py-4'>
        <div className='flex justify-between items-center mt-2 mb-7'>
          <h1 className='text-3xl font-bold text-[40px] text-center text-primary'>
            QUẢN LÝ CÁC MÓN ĂN
          </h1>
          <button onClick={handleCreateItem} className='px-2 py-2 text-white bg-green-500 rounded'>
            <AddCircleIcon />
            Thêm món mới
          </button>
        </div>
        <div className='bg-white shadow-md rounded-lg p-6'>
          <table className='w-full border-separate border-spacing-0'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='bg-secondary text-accent text-[20px]'>Hình ảnh</th>
                <th className='bg-secondary text-accent text-[20px]'>Tên món</th>
                <th className='bg-secondary text-accent text-[20px]'>Loại</th>
                <th className='bg-secondary text-accent text-[20px]'>Giá</th>
                <th className='bg-secondary text-accent text-[20px]'>Số lượng</th>
                <th className='bg-secondary text-accent text-[20px]'>Giảm giá</th>
                <th className='bg-secondary text-accent text-[20px]'>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {itemList?.length > 0 ? (
                itemList.map((item) => (
                  <tr key={item._id} className='border-t border-gray-300'>
                    <td className='p-4 text-center'>
                      <img
                        src={item.imageUrl[0]?.url || hero}
                        alt={item.title}
                        className='w-16 h-16 rounded-md object-cover mx-auto'
                      />
                    </td>
                    <td className='p-4 text-left'>{item.title}</td>
                    <td className='p-4'>{item.category}</td>
                    <td className='p-4'>{item.price}</td>
                    <td className='p-4'>{item.quantity}</td>
                    <td className='p-4'>{item.discount}</td>
                    <td className='p-4 text-center align-middle'>
                      <button
                        className='inline-flex items-center gap-1 px-3 py-2 bg-blue-400 text-white rounded-lg shadow hover:bg-yellow-500 transition-all duration-300'
                        onClick={() => {
                          setCurrentEditedId(item._id)
                          setRawData(item)
                          setCurrentUrl(item.imageUrl[0]?.url || null)
                          setOpenForm(true)
                        }}
                      >
                        <i className='bx bx-edit'></i> Sửa
                      </button>
                      <button
                        className='inline-flex items-center gap-1 px-3 py-2 bg-red-700 text-white rounded-lg shadow hover:bg-red-500 transition-all duration-300 ml-3'
                        onClick={() => handleDeleteItem(item._id)}
                      >
                        <i className='bx bx-trash'></i> Xóa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='7' className='text-center p-4'>
                    Không có món nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <ItemForm
          rawData={rawData}
          setRawData={setRawData}
          openForm={openForm}
          setOpenForm={setOpenForm}
          currentEditedId={currentEditedId}
          onSubmit={onSubmit}
          imgFile={imgFile}
          setImgFile={setImgFile}
          currentUrl={currentUrl}
          setCurrentUrl={setCurrentUrl}
        />
      </div>
    </LoadingOverlay>
  )
}

export default ManageItems
