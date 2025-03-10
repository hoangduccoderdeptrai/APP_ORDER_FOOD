import React, { useEffect, useRef, memo } from 'react'

const UploadImage = ({ imgFile, setImgFile, rawData, currentUrl, setCurrentUrl }) => {
  const inputRef = useRef(null)

  // Xử lý chọn ảnh
  const handleImage = (event) => {
    const file = event.target.files[0]
    if (file) {
      setImgFile(file) // Lưu file đã chọn
      const previewUrl = URL.createObjectURL(file) // Tạo URL để preview ảnh
      setCurrentUrl(previewUrl) // Cập nhật URL preview
    }
    if (inputRef.current) {
      inputRef.current.value = '' // Reset input để chọn lại file
    }
  }

  // Mở input chọn file khi nhấn vào vùng upload
  const handleInputClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  // Xóa ảnh hiện tại
  const handleRemoveImage = () => {
    setCurrentUrl(null) // Xóa URL preview
    setImgFile(null) // Xóa file ảnh
    if (inputRef.current) {
      inputRef.current.value = '' // Reset input file
    }
  }

  // Cập nhật URL hiện tại từ dữ liệu ban đầu khi chỉnh sửa
  useEffect(() => {
    if (rawData?.images && !imgFile) {
      setCurrentUrl(rawData.images) // Hiển thị URL ảnh từ dữ liệu gốc nếu chưa chọn ảnh mới
    }
  }, [rawData?.images, imgFile, setCurrentUrl])

  return (
    <div className='w-full grid gap-1.5'>
      <label className='text-xl text-left font-semibold'>Gửi ảnh</label>
      <div className='h-[64px] border-2 border-dashed border-gray-300 flex items-center justify-center'>
        <input
          ref={inputRef}
          onChange={handleImage}
          type='file'
          accept='image/*'
          className='hidden'
        />
        {currentUrl ? (
          <div className='flex justify-between px-5 items-center w-full'>
            <img src={currentUrl} alt='Uploaded' className='h-[50px] object-contain' />
            <button onClick={handleRemoveImage} className='text-red-500 text-xl'>
              <i className='bx bx-trash'></i>
            </button>
          </div>
        ) : (
          <div onClick={handleInputClick} className='cursor-pointer text-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              className='lucide lucide-cloud-upload mx-auto'
            >
              <path d='M12 13v8' />
              <path d='M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242' />
              <path d='m8 17 4-4 4 4' />
            </svg>
            <p>Nhấn để chọn ảnh</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(UploadImage)
