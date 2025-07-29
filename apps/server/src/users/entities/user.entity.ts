import { Location } from 'src/users/dto/Location';
import { Name, Picture } from 'src/users/dto/User';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: Name;

  @Column({ type: 'json' })
  gender: string;

  @Column({ type: 'json' })
  location: Location;

  @Column()
  email: string;

  @Column({ type: 'json' })
  picture: Picture;
}
