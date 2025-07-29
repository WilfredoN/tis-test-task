class Street {
  number: number;
  name: string;
}

class Coordinates {
  latitude: string;
  longitude: string;
}

class Timezone {
  offset: string;
  description: string;
}

export class Location {
  street: Street;
  city: string;
  state: string;
  country: string;
  postcode: number;
  coordinates: Coordinates;
  timezone: Timezone;
}
