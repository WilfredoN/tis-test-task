import { ContactInfo } from "@/components/user/ContactInfo";
import { ProfileImage } from "@/components/user/ProfileImage";
import { UserInfo } from "@/components/user/UserInfo";
import { useUserCard } from "@/hooks/useUserCard";
import { UserWithWeather } from "@/types/user";
import { formatLocation } from "@/utils/user.utils";

interface UserCardProps {
  user: UserWithWeather;
  onSave?: (user: UserWithWeather) => void;
  showSaveButton?: boolean;
}

export const UserCard = ({
  user,
  onSave,
  showSaveButton = true,
}: UserCardProps) => {
  const { handleSave } = useUserCard(user, onSave);

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 w-full max-w-sm mx-auto border border-gray-700">
      <ProfileImage
        src={user.picture.large}
        alt={`${user.name.first} ${user.name.last}`}
      />
      <UserInfo name={user.name} gender={user.gender} />
      <ContactInfo email={user.email} location={formatLocation(user)} />
      {showSaveButton && (
        <div className="flex justify-center">
          <button
            onClick={handleSave}
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save User
          </button>
        </div>
      )}
    </div>
  );
};
