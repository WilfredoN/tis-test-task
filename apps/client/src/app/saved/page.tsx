'use client'

import { SavedUsersList } from '@/components/user/SavedUsersList'

export default function SavedUsers() {
  return (
    <div className='min-h-screen bg-gray-900'>
      <main className='mx-auto max-w-7xl px-4 py-8'>
        <SavedUsersList />
      </main>
    </div>
  )
}
