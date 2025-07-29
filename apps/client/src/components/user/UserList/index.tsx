'use client'

import { ErrorDisplay } from '@/components/ErrorDisplay'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { UserCard } from '@/components/user/UserCard'
import { useUsersList } from '@/hooks/useUsersList'

export const UserList = () => {
  const {
    users,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    handleSave
  } = useUsersList({ mode: 'all' })

  if (isLoading) return <LoadingSpinner />
  if (isError)
    return <ErrorDisplay message={error?.message || 'An error occurred'} />

  return (
    <div>
      <div className='mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {users.map((user, index) => (
          <UserCard
            key={`${user.id}-${index}`}
            user={user}
            onSave={handleSave}
          />
        ))}
      </div>
      <div className='flex justify-center'>
        <button
          onClick={() => fetchNextPage?.()}
          disabled={isFetchingNextPage || !hasNextPage}
          className='rounded-lg bg-blue-600 px-8 py-3 font-medium text-white hover:bg-blue-700 disabled:bg-blue-400'
        >
          {isFetchingNextPage
            ? 'Loading...'
            : hasNextPage
              ? 'Load More Users'
              : 'No More Users'}
        </button>
      </div>
    </div>
  )
}
