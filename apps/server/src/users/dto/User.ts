import { Location } from 'src/users/dto/Location';

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

export class CreateUserDto {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: Location;
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string;
  };
  picture: Picture;
  nat: string;
}
