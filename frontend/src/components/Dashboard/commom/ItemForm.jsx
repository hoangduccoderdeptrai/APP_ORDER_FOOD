import React from 'react'
import UploadImage from './UploadImage'
import { FormData } from '../../../configs/FormDate'

const ItemForm = ({
  rawData,
  setRawData,
  openForm,
  setOpenForm,
  currentEditedId,
  onSubmit,
  imgFile,
  setImgFile,
  currentUrl,
  setCurrentUrl,
}) => {
  const handleCloseForm = () => {
    setOpenForm(false)
    setRawData(null)
    setImgFile(null)
    setCurrentUrl(null)
  }

  const renderFormFields = () => {
    return FormData.map((field) => {
      let inputElement

      if (field.componentType === 'input') {
        inputElement = (
          <input
            type={field.type}
            placeholder={field.placeholder}
            value={rawData?.[field.name] || ''}
            onChange={(e) => setRawData({ ...rawData, [field.name]: e.target.value })}
            className='border px-3 py-2 rounded w-full'
          />
        )
      } else if (field.componentType === 'textarea') {
        inputElement = (
          <textarea
            placeholder={field.placeholder}
            value={rawData?.[field.name] || ''}
            onChange={(e) => setRawData({ ...rawData, [field.name]: e.target.value })}
            className='border px-3 py-2 rounded w-full'
          ></textarea>
        )
      } else if (field.componentType === 'select') {
        inputElement = (
          <select
            value={rawData?.[field.name] || ''}
            onChange={(e) => setRawData({ ...rawData, [field.name]: e.target.value })}
            className='border px-3 py-2 rounded w-full'
          >
            <option value='' disabled>
              Chọn {field.placeholder}
            </option>
            {field.options.map((option) => (
              <option key={option.id} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>
        )
      }

      return (
        <div key={field.name} className='mb-4'>
          <label className='block font-semibold mb-1'>{field.lable}</label>
          {inputElement}
        </div>
      )
    })
  }

  return (
    <div
      className={`${
        openForm ? 'block' : 'hidden'
      } fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50`}
    >
      <div className='bg-white w-full max-w-2xl max-h-[90vh] p-6 rounded-lg shadow-lg relative overflow-y-auto'>
        <h3 className="text-3xl font-medium font-['Oswald'] text-center text-primary uppercase mb-5">
          {currentEditedId ? 'Chỉnh sửa món' : 'Thêm món mới'}
        </h3>
        <form className='text-left' onSubmit={onSubmit}>
          {renderFormFields()}
          <UploadImage
            imgFile={imgFile}
            setImgFile={setImgFile}
            rawData={rawData}
            currentUrl={currentUrl}
            setCurrentUrl={setCurrentUrl}
          />
          <div className='flex justify-end mt-6'>
            <button type='submit' className='bg-green-600 text-white px-4 py-2 rounded'>
              Lưu
            </button>
            <button
              type='button'
              onClick={handleCloseForm}
              className='ml-4 bg-gray-500 text-white px-4 py-2 rounded'
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ItemForm
