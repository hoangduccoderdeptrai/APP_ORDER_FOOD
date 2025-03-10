import * as React from 'react'

const LoadingSpinner = () => {
  return (
    <div className='w-14 h-14 border-4 border-t-4 border-gray-200 border-t-primary rounded-full animate-spin' />
  )
}

LoadingSpinner.displayName = 'LoadingSpinner'

export { LoadingSpinner }
