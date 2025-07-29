import { ContactInfo } from '@/components/user/ContactInfo'
import { ProfileImage } from '@/components/user/ProfileImage'
import { UserInfo } from '@/components/user/UserInfo'
import { WeatherInfo } from '@/components/user/WeatherInfo'
import { useUserCard } from '@/hooks/useUserCard'
import { UserWithWeather } from '@/types/user'
import { formatLocation } from '@/utils/user.utils'

interface UserCardProps {
  user: UserWithWeather
  onSave?: (user: UserWithWeather) => void
  showSaveButton?: boolean
  allowDelete?: boolean
}

export const UserCard = ({
  user,
  onSave,
  showSaveButton = true,
  allowDelete = false
}: UserCardProps) => {
  const { handleSave, handleDelete, isSaved } = useUserCard(user, onSave)

  const handleButtonClick = () => {
    if (isSaved || allowDelete) {
      handleDelete()
    } else {
      handleSave()
    }
    if (onSave) {
      onSave(user)
    }
  }

  return (
    <div className='mx-auto flex w-full max-w-sm flex-col justify-between gap-2 rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-md'>
      <ProfileImage
        src={user.picture.large}
        alt={`${user.name.first} ${user.name.last}`}
      />
      <UserInfo name={user.name} gender={user.gender} />
      <ContactInfo email={user.email} location={formatLocation(user)} />
      <WeatherInfo weather={user.weather} />
      {showSaveButton && (
        <div className='flex justify-center'>
          <button
            onClick={handleButtonClick}
            className='cursor-pointer rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
          >
            {isSaved || allowDelete ? 'Remove User' : 'Save User'}
          </button>
        </div>
      )}
    </div>
  )
}
