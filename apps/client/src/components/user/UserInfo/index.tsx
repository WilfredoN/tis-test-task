import { UserWithWeather } from "@/types/user";

export const UserInfo = ({
  name,
  gender,
}: {
  name: UserWithWeather["name"];
  gender: string;
}) => {
  const fullName = `${name.title} ${name.first} ${name.last}`;
  return (
    <div className="text-center mb-4">
      <h3 className="text-xl font-bold text-white mb-1">{fullName}</h3>
      <p className="text-sm text-gray-300 capitalize mb-2">{gender}</p>
    </div>
  );
};
