import React from 'react'

const DetailRest = ({
  restaurant,
  className,
  openForm,
  setOpenForm,
  handleActive,
  handleInActive,
  handleDeny,
}) => {
  const handleCloseForm = () => {
    setOpenForm(false)
  }
  // const restaurant = {
  //     name: "Gourmet Paradise",
  //     address: "123 Culinary Avenue, Food City",
  //     timeOpen: "10:00 AM",
  //     timeClose: "10:00 PM",
  //     imageUrl: "https://via.placeholder.com/400x300", // Replace with actual restaurant image URL
  // };
  return (
    <div className={`${className}  overflow-hidden`}>
      {/* <div className='flex justify-between mb-5 -mt-4'>
            <div className='text-2xl font-mono font-bold'>Detail Orders</div>
            <div className='cursor-pointer' onClick={() => handleCloseForm()}>
                <i className='bx bx-x text-2xl -mt-3'></i>
            </div>
        </div>
      */}

      <div className='p-4 max-w-4xl mx-auto'>
        <div className='bg-white shadow rounded-lg'>
          <div className='border-b p-4 flex justify-between'>
            <h3 className='text-lg font-semibold'>Restaurant Details</h3>
            <div className='cursor-pointer' onClick={() => handleCloseForm()}>
              <i className='bx bx-x text-2xl -mt-3'></i>
            </div>
          </div>
          <div className='p-4 flex flex-col md:flex-row gap-4'>
            {/* Restaurant Image */}
            <div className='md:w-1/2'>
              <img
                src={restaurant?.imageUrl[0]?.url}
                alt={restaurant?.name}
                className='w-full h-auto rounded-lg object-cover'
              />
            </div>

            {/* Restaurant Info */}
            <div className='md:w-1/2'>
              <h4 className='text-xl font-bold'>{restaurant?.name}</h4>
              <p className='mt-2 text-gray-700'>
                <strong>Address:</strong> {restaurant?.address?.street},{' '}
                {restaurant?.address.borough}, {restaurant?.address.city}.
              </p>
              <p className='mt-2 text-gray-700'>
                <strong>Opening Hours:</strong> {restaurant?.time_open} - {restaurant?.time_close}
              </p>
              <p className='mt-2 text-gray-700'>
                <strong>Phone Number:</strong> {restaurant?.phone}
              </p>

              {/* Status Section */}
              <div className='mt-4'>
                <h5 className='text-lg font-medium'>
                  Current Status:
                  <span
                    className={`ml-2 px-2 py-1 rounded text-white ${
                      restaurant?.status === 'Active'
                        ? 'text-green-500'
                        : restaurant?.status === 'Inactive'
                          ? 'text-yellow-500'
                          : 'text-red-500'
                    }`}
                  >
                    {restaurant?.status}
                  </span>
                </h5>
                <div className='mt-3 flex justify-center gap-1 space-x-2'>
                  <button
                    className='px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600'
                    onClick={() => {
                      handleActive(restaurant?._id, restaurant?.status)
                      handleCloseForm()
                    }}
                  >
                    Set Active
                  </button>
                  <button
                    className='px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600'
                    onClick={() => {
                      handleInActive(restaurant?._id, restaurant?.status)
                      handleCloseForm()
                    }}
                  >
                    Set Inactive
                  </button>
                  <button
                    className='px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600'
                    onClick={() => {
                      handleDeny(restaurant?._id, restaurant?.status)
                      handleCloseForm()
                    }}
                  >
                    Set Deny
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailRest
