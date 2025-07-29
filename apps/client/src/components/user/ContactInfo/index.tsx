interface ContactInfoProps {
  email: string
  location: string
}

export const ContactInfo = ({ email, location }: ContactInfoProps) => {
  return (
    <div className='mb-4 space-y-3'>
      <div>
        <p className='text-sm font-medium text-gray-300'>Email</p>
        <p className='text-sm break-all text-white'>{email}</p>
      </div>
      <div>
        <p className='text-sm font-medium text-gray-300'>Location</p>
        <p className='text-sm text-white'>{location}</p>
      </div>
    </div>
  )
}
