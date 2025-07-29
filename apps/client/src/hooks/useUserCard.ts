import { useCallback } from 'react'
import { UserWithWeather } from '@/types/user'
import { saveUser } from '@/lib/api'

export function useUserCard(
  user: UserWithWeather,
  onSave?: (user: UserWithWeather) => void
) {
  const handleSave = useCallback(async () => {
    try {
      await saveUser(user)
      if (onSave) {
        onSave(user)
      }
    } catch (error) {
      console.error('Failed to save user:', error)
    }
  }, [onSave, user])

  return { handleSave }
}
