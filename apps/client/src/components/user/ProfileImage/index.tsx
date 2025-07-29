import Image from "next/image";

interface ProfileImageProps {
  src: string;
  alt: string;
}

export const ProfileImage = ({ src, alt }: ProfileImageProps) => {
  return (
    <div className="flex justify-center mb-4">
      <div className="relative">
        <Image
          src={src}
          alt={alt}
          width={120}
          height={120}
          className="rounded-full object-cover border-4 border-white shadow-lg"
        />
      </div>
    </div>
  );
};
