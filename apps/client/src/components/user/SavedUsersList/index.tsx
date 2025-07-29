'use client'
import { ErrorDisplay } from '@/components/ErrorDisplay'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { UserCard } from '@/components/user/UserCard'
import { fetchSavedUsers } from '@/lib/api'
import { UserWithWeather } from '@/types/user'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export const SavedUsersList = () => {
  const [users, setUsers] = useState<UserWithWeather[]>([])
  const { data, isLoading, isError, error } = useQuery<UserWithWeather[]>({
    queryKey: ['saved-users'],
    queryFn: fetchSavedUsers,
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (data) {
      setUsers(data)
    }
  }, [data])

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
          <UserCard key={String(user.id)} user={user} allowDelete />
        ))}
      </div>
    </div>
  )
}
