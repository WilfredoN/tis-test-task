import { deleteUser, saveUser } from '@/lib/api'
import { UserWithWeather } from '@/types/user'
import { useCallback, useState } from 'react'

export function useUserCard(
  user: UserWithWeather,
  onSave?: (user: UserWithWeather) => void
) {
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = useCallback(async () => {
    try {
      await saveUser(user)
      setIsSaved(true)
      if (onSave) {
        onSave(user)
      }
    } catch (error) {
      console.error('Failed to save user:', error)
    }
  }, [onSave, user])

  const handleDelete = useCallback(async () => {
    try {
      await deleteUser(user.id)
      setIsSaved(false)
    } catch (error) {
      console.error('Failed to delete user:', error)
    }
  }, [user.id])

  return { handleSave, isSaved, handleDelete }
}
