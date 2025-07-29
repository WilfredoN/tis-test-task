import {
  useInfiniteQuery,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { fetchUsers, fetchSavedUsers } from '@/lib/api'
import { UserWithWeather } from '@/types/user'

export type UsersListMode = 'all' | 'saved'

interface UseUsersListProps {
  mode: UsersListMode
}

export function useUsersList({ mode }: UseUsersListProps) {
  const queryClient = useQueryClient()
  const [savedUsers, setSavedUsers] = useState<UserWithWeather[]>([])

  const infiniteQuery = useInfiniteQuery<UserWithWeather[], Error>({
    queryKey: ['users'],
    queryFn: async ({ pageParam }: { pageParam?: unknown }) =>
      fetchUsers(typeof pageParam === 'number' ? pageParam : 1),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length === 0) return undefined
      return allPages.length + 1
    },
    refetchOnWindowFocus: false,
    initialPageParam: 1,
    enabled: mode === 'all'
  })

  const savedQuery = useQuery<UserWithWeather[], Error>({
    queryKey: ['saved-users'],
    queryFn: fetchSavedUsers,
    refetchOnWindowFocus: false,
    enabled: mode === 'saved'
  })

  useEffect(() => {
    if (mode === 'saved' && savedQuery.data) {
      setSavedUsers(savedQuery.data)
    }
  }, [mode, savedQuery.data])

  const handleSave = (user: UserWithWeather) => {
    if (mode === 'all') {
      queryClient.setQueryData<{
        pages: UserWithWeather[][]
        pageParams: unknown[]
      }>(['users'], (oldData) => {
        if (!oldData || !oldData.pages) return oldData
        return {
          ...oldData,
          pages: oldData.pages.map((page) =>
            page.filter((user) => user.id !== user.id)
          )
        }
      })
    } else {
      setSavedUsers((prev) => prev.filter((u) => u.id !== user.id))
      queryClient.setQueryData<UserWithWeather[] | undefined>(
        ['saved-users'],
        (oldData) => {
          if (!oldData) return oldData
          return oldData.filter((user) => user.id !== user.id)
        }
      )
    }
  }

  if (mode === 'all') {
    return {
      ...infiniteQuery,
      users: infiniteQuery.data?.pages.flat() || [],
      handleSave,
      fetchNextPage: infiniteQuery.fetchNextPage,
      hasNextPage: infiniteQuery.hasNextPage,
      isFetchingNextPage: infiniteQuery.isFetchingNextPage
    }
  } else {
    return {
      ...savedQuery,
      users: savedUsers,
      handleSave,
      fetchNextPage: undefined,
      hasNextPage: undefined,
      isFetchingNextPage: undefined
    }
  }
}
