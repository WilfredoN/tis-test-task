import { UserWithWeather } from "@/types/user";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const fetchUsers = async (): Promise<UserWithWeather[]> => {
  const response = await fetch("/api/users");
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return response.json();
};

export const saveUser = async (user: UserWithWeather): Promise<void> => {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
};

export async function fetchSavedUsers(): Promise<UserWithWeather[]> {
  const response = await fetch(`${API_BASE_URL}/users/saved`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return response.json();
}
