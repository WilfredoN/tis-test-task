import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateUserDto } from 'src/users/dto/User';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  getAll(): Observable<User[]> {
    const apiUrl = this.configService.get<string>('usersApi');
    return this.httpService
      .get<{ results: User[] }>(`${apiUrl}/?results=10`)
      .pipe(map((response) => response.data.results));
  }

  async getSavedUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  mapUser(rawData: CreateUserDto): Promise<User> {
    const user = new User();
    user.id = rawData.login.uuid;
    user.gender = rawData.gender;
    user.name = rawData.name;
    user.location = rawData.location;
    user.email = rawData.email;
    user.picture = rawData.picture;

    return Promise.resolve(user);
  }

  async saveUser(user: CreateUserDto): Promise<User> {
    const savedUser = await this.mapUser(user);
    return this.userRepository.save(savedUser);
  }
}
