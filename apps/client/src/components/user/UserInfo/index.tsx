import { UserWithWeather } from '@/types/user'

export const UserInfo = ({
  name,
  gender
}: {
  name: UserWithWeather['name']
  gender: string
}) => {
  const fullName = `${name.title} ${name.first} ${name.last}`
  return (
    <div className='mb-4 text-center'>
      <h3 className='mb-1 text-xl font-bold text-white'>{fullName}</h3>
      <p className='mb-2 text-sm text-gray-300 capitalize'>{gender}</p>
    </div>
  )
}
