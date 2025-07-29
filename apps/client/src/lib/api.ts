import { UserWithWeather } from '@/types/user'

export const fetchUsers = async (
  page: number = 1,
  results: number = 10
): Promise<UserWithWeather[]> => {
  const response = await fetch(`/api/users?page=${page}&results=${results}`)
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }
  return response.json()
}

export const saveUser = async (user: UserWithWeather): Promise<void> => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }
}

export async function fetchSavedUsers(): Promise<UserWithWeather[]> {
  const response = await fetch('/api/users/saved')
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`)
  }
  return response.json()
}
