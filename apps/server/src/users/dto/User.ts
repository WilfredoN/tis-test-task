export class Name {
  title: string;
  first: string;
  last: string;
}

export class Picture {
  large: string;
  medium: string;
  thumbnail: string;
}

export class UserDTO {
  gender: string;
  name: Name;
  location: Location;
  email: string;
  picture: Picture;
}
