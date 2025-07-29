'use client'
import { ErrorDisplay } from '@/components/ErrorDisplay'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { UserCard } from '@/components/user/UserCard'
import { useUsersList } from '@/hooks/useUsersList'

export const SavedUsersList = () => {
  const { users, isLoading, isError, error, handleSave } = useUsersList({
    mode: 'saved'
  })

  if (isLoading && users.length === 0)
    return <LoadingSpinner message='Loading saved users...' />
  if (isError)
    return <ErrorDisplay message={error?.message || 'An error occurred'} />

  return (
    <div>
      <div className='mb-6'>
        <p className='text-gray-300'>
          You have saved {users.length} user{users.length !== 1 ? 's' : ''}
        </p>
      </div>
      <div className='mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {users.map((user) => (
          <UserCard
            key={String(user.id)}
            user={user}
            allowDelete
            onSave={handleSave}
          />
        ))}
      </div>
    </div>
  )
}
