import React from 'react'

interface ErrorDisplayProps {
  message: string
}

export const ErrorDisplay = ({ message }: ErrorDisplayProps) => {
  return (
    <div className='mb-6 rounded-lg border border-red-800 bg-red-900/20 p-4'>
      <p className='text-red-200'>{message}</p>
    </div>
  )
}
