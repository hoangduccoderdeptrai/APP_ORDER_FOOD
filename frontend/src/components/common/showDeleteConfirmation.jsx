import React, { memo } from 'react'

const ShowDeleteConfirmation = ({ showDelete, setShowDelete, handleDelete }) => {
  console.log(showDelete, 'show delete')
  const handleRemove = async () => {
    setShowDelete(false)
    await handleDelete()
  }
  return (
    <>
      <div
        className={`z-20 fixed ${showDelete ? 'block' : 'hidden'} left-[50%] -translate-x-[50%] top-[40%] -translate-y-[40%]`}
      >
        <div className='w-[400px] px-3 py-5 rounded-md bg-[#FFFFFF] '>
          <div
            onClick={() => setShowDelete(false)}
            className='flex justify-end -mt-3 cursor-pointer'
          >
            <i className=' text-2xl bx bx-x'></i>
          </div>

          <p className='text-center text-md font-bold opacity-80 mb-5'>
            Do you want to delete this item?
          </p>
          <div className='flex justify-end gap-3 items-center'>
            <button
              onClick={() => handleRemove()}
              className='bg-[#DC3545] p-[3px_10px] rounded-[4px] text-white '
            >
              OK
            </button>
            <button
              onClick={() => setShowDelete(false)}
              className='bg-[#6C757D] p-[3px_10px] rounded-[4px] text-white'
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div className={`${showDelete ? 'fixed' : ''} inset-0 bg-black opacity-50 z-10`}></div>
    </>
  )
}

export default ShowDeleteConfirmation
