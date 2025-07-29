import React from "react";
import { UserWithWeather } from "@/types/user";
import { UserCard } from "@/components/user/UserCard";

interface SavedUsersListProps {
  users: UserWithWeather[];
}

export const SavedUsersList = ({ users }: SavedUsersListProps) => {
  return (
    <>
      <div className="mb-6">
        <p className="text-gray-300">
          You have saved {users.length} user{users.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {users.map((user) => (
          <UserCard key={String(user.id)} user={user} />
        ))}
      </div>
    </>
  );
};
