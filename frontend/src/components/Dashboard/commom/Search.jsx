import react, { useState } from 'react'

const Search = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div>
      {!open && (
        <div className='ml-2' onClick={handleOpen}>
          <i className='bx bx-search text-2xl'></i>
        </div>
      )}
      {
        <div
          className={`absolute w-full bg-[rgba(249,250,251,0.8)] left-auto right-0 h-[64px] lg:h-[92px] ${open ? 'top-0' : '-top-[92px]'} px-6 transition-[transform_225ms_cubic-bezier(0,0,0.2,1)] shadow-sm flex items-center z-10`}
        >
          <i className='bx bx-search text-2xl'></i>
          <input className='block w-full outline-none p-[12px_8px]' placeholder='Search ...' />
          <button
            onClick={handleClose}
            className='bg-[#1877F2] rounded-md text-white  font-bold p-2'
          >
            Search
          </button>
        </div>
      }
      {open && <div className={`fixed inset-0 z-0`} onClick={handleClose}></div>}
    </div>
  )
}

export default Search
