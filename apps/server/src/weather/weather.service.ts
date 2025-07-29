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

  async getWeather(latitude: number, longitude: number): Promise<any> {
    const baseUrl = this.configService.get<string>('weatherApi');
    const url = `${baseUrl}?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_min,temperature_2m_max,weathercode&timezone=auto`;

    const response =
      await this.httpService.axiosRef.get<WeatherApiResponse>(url);
    const { current_weather, daily } = response.data;

    const weatherCodeToIcon = (code: number) => {
      if (code === 0) return '☀️';
      if ([1, 2, 3].includes(code)) return '🌤️';
      if ([45, 48].includes(code)) return '🌫️';
      if ([51, 53, 55].includes(code)) return '🌦️';
      if ([56, 57].includes(code)) return '🌧️❄️';
      if ([61, 63, 65].includes(code)) return '🌧️';
      if ([66, 67].includes(code)) return '🌧️❄️';
      if ([71, 73, 75].includes(code)) return '❄️';
      if (code === 77) return '🌨️';
      if ([80, 81, 82].includes(code)) return '🌦️';
      if ([85, 86].includes(code)) return '🌨️';
      if (code === 95) return '⛈️';
      if ([96, 99].includes(code)) return '⛈️❄️';
      return code;
    };

    const todayIdx = 0;
    return {
      temperature: current_weather.temperature,
      temperatureMin: daily?.temperature_2m_min?.[todayIdx] ?? null,
      temperatureMax: daily?.temperature_2m_max?.[todayIdx] ?? null,
      windSpeed: current_weather.windspeed,
      icon: weatherCodeToIcon(current_weather.weathercode),
    };
  }
}
