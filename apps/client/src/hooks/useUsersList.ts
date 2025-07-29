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

  if (mode === 'all') {
    const query = useInfiniteQuery<UserWithWeather[], Error>({
      queryKey: ['users'],
      queryFn: async ({ pageParam }: { pageParam?: unknown }) =>
        fetchUsers(typeof pageParam === 'number' ? pageParam : 1),
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage || lastPage.length === 0) return undefined
        return allPages.length + 1
      },
      refetchOnWindowFocus: false,
      initialPageParam: 1
    })

    const handleSave = (savedUser: UserWithWeather) => {
      // FIXME: infer types
      queryClient.setQueryData(['users'], (oldData: any) => {
        if (!oldData || !oldData.pages) return oldData
        return {
          ...oldData,
          pages: oldData.pages.map((page: UserWithWeather[]) =>
            page.filter((user) => user.id !== savedUser.id)
          )
        }
      })
    }

    return {
      ...query,
      users: query.data?.pages.flat() || [],
      handleSave,
      fetchNextPage: query.fetchNextPage,
      hasNextPage: query.hasNextPage,
      isFetchingNextPage: query.isFetchingNextPage
    }
  } else {
    const query = useQuery<UserWithWeather[], Error>({
      queryKey: ['saved-users'],
      queryFn: fetchSavedUsers,
      refetchOnWindowFocus: false
    })

    useEffect(() => {
      if (query.data) {
        setSavedUsers(query.data)
      }
    }, [query.data])

    const handleSave = (removedUser: UserWithWeather) => {
      setSavedUsers((prev) => prev.filter((user) => user.id !== removedUser.id))
      queryClient.setQueryData(
        ['saved-users'],
        (oldData: UserWithWeather[] | undefined) => {
          if (!oldData) return oldData
          return oldData.filter((user) => user.id !== removedUser.id)
        }
      )
    }

    return {
      ...query,
      users: savedUsers,
      handleSave,
      fetchNextPage: undefined,
      hasNextPage: undefined,
      isFetchingNextPage: undefined
    }
  }
}
