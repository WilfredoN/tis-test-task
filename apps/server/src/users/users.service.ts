import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/User';
import { WeatherCurrent } from 'src/users/dto/Weather';
import { User } from 'src/users/entities/user.entity';
import { WeatherService } from 'src/weather/weather.service';
import { Repository } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly weatherService: WeatherService,
  ) {}

  async getAll(): Promise<(User & { weather: WeatherCurrent | null })[]> {
    const apiUrl = this.configService.get<string>('usersApi');
    const response = await this.httpService.axiosRef.get<{ results: User[] }>(
      `${apiUrl}/?results=10`,
    );
    const users = response.data.results;
    return this.mapUsersWithWeather(users);
  }

  async getSavedUsers(): Promise<
    (User & { weather: WeatherCurrent | null })[]
  > {
    const users = await this.userRepository.find();
    return this.mapUsersWithWeather(users);
  }

  private async mapUsersWithWeather(
    users: User[],
  ): Promise<(User & { weather: WeatherCurrent | null })[]> {
    return Promise.all(
      users.map(async (user) => {
        try {
          const lat = parseFloat(user.location.coordinates.latitude);
          const lon = parseFloat(user.location.coordinates.longitude);
          if (!isNaN(lat) && !isNaN(lon)) {
            const weather = await this.weatherService.getWeather(lat, lon);
            return { ...user, weather };
          }
        } catch {
          console.error('Error fetching weather for user:', user.id);
        }
        return { ...user, weather: null };
      }),
    );
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

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
