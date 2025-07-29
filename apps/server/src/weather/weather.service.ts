import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { WeatherApiResponse, WeatherCurrent } from 'src/users/dto/Weather';

@Injectable()
export class WeatherService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getWeather(
    latitude: number,
    longitude: number,
  ): Promise<WeatherCurrent> {
    const baseUrl = this.configService.get<string>('API_WEATHER_URL');

    const url = `${baseUrl}?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m`;

    const response =
      await this.httpService.axiosRef.get<WeatherApiResponse>(url);
    return response.data.current_weather;
  }
}
