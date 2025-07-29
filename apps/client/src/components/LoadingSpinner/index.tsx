import React from 'react'

interface LoadingSpinnerProps {
  message?: string
}

export const LoadingSpinner = ({
  message = 'Loading...'
}: LoadingSpinnerProps) => {
  return (
    <div className='flex items-center justify-center py-12'>
      <div className='flex items-center'>
        <div className='mr-3 h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600'></div>
        <span className='text-lg text-gray-300'>{message}</span>
      </div>
    </div>
  )
}
