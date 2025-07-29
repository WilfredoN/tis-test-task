import Image from 'next/image'

interface ProfileImageProps {
  src: string
  alt: string
}

export const ProfileImage = ({ src, alt }: ProfileImageProps) => {
  return (
    <div className='mb-4 flex justify-center'>
      <div className='relative'>
        <Image
          src={src}
          alt={alt}
          width={120}
          height={120}
          className='rounded-full border-4 border-white object-cover shadow-lg'
        />
      </div>
    </div>
  )
}
