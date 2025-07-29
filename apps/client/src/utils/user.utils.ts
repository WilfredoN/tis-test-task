import { UserWithWeather } from "@/types/user";

export function formatLocation(user: UserWithWeather) {
  const { street, city, state, country } = user.location;
  return `${street.number} ${street.name}, ${city}, ${state}, ${country}`;
}
