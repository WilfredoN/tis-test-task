import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UserDTO } from 'src/users/dto/User';
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

  async getAll(): Promise<UserDTO[]> {
    const apiUrl = this.configService.get<string>('usersApi');
    const response = await this.httpService.axiosRef.get<{
      results: CreateUserDto[];
    }>(`${apiUrl}/?results=10`);

    const users = await Promise.all(
      response.data.results.map(async (rawData) => {
        const mappedUser = await this.mapUser({
          id: rawData.login.uuid,
          gender: rawData.gender,
          name: rawData.name,
          location: rawData.location,
          email: rawData.email,
          picture: rawData.picture,
          weather: null,
        });
        return mappedUser;
      }),
    );

    return this.mapUsersWithWeather(users);
  }

  async getSavedUsers(): Promise<UserDTO[]> {
    const users = await this.userRepository.find();
    const mappedUsers = users.map((user) => ({
      id: user.id,
      gender: user.gender,
      name: user.name,
      location: user.location,
      email: user.email,
      picture: user.picture,
      weather: null,
    }));
    return this.mapUsersWithWeather(mappedUsers);
  }

  mapUser(rawData: UserDTO): Promise<UserDTO> {
    const user = new UserDTO();
    user.id = rawData.id;
    user.gender = rawData.gender;
    user.name = rawData.name;
    user.location = rawData.location;
    user.email = rawData.email;
    user.picture = rawData.picture;

    return Promise.resolve({
      id: user.id,
      gender: user.gender,
      name: user.name,
      location: user.location,
      email: user.email,
      picture: user.picture,
      weather: user.weather ?? null,
    });
  }

  private async mapUsersWithWeather(users: UserDTO[]): Promise<UserDTO[]> {
    return Promise.all(
      users.map(async (userDTO) => {
        try {
          const lat = parseFloat(userDTO.location.coordinates.latitude);
          const lon = parseFloat(userDTO.location.coordinates.longitude);
          if (!isNaN(lat) && !isNaN(lon)) {
            const weather = await this.weatherService.getWeather(lat, lon);
            return { ...userDTO, weather };
          }
        } catch (error) {
          console.error('Error fetching weather for user:', userDTO.id, error);
        }
        return { ...userDTO, weather: null };
      }),
    );
  }

  async saveUser(user: UserDTO): Promise<UserDTO> {
    console.log('\n\n\nuser:', user);
    const userDTO: UserDTO = {
      id: user.id,
      gender: user.gender,
      name: user.name,
      location: user.location,
      email: user.email,
      picture: user.picture,
      weather: null,
    };

    const savedUser = await this.mapUser(userDTO);
    const existing = await this.userRepository.findOne({
      where: { id: savedUser.id },
    });
    if (existing) {
      await this.userRepository.update(savedUser.id, savedUser);
      return this.userRepository.findOne({ where: { id: savedUser.id } });
    }
    return this.userRepository.save(savedUser);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
