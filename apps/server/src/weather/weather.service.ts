import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WeatherApiResponse, WeatherDTO } from 'src/users/dto/Weather';

@Injectable()
export class WeatherService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getWeather(latitude: number, longitude: number): Promise<WeatherDTO> {
    const baseUrl = this.configService.get<string>('weatherApi');
    const url = `${baseUrl}?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_min,temperature_2m_max,weathercode&timezone=auto`;

    const response =
      await this.httpService.axiosRef.get<WeatherApiResponse>(url);
    const { current_weather, daily } = response.data;

    const weatherCodeToIcon = (code: number): string => {
      const weatherIcons: Record<number, string> = {
        0: '☀️',
        1: '🌤️',
        2: '⛅',
        3: '☁️',
        45: '🌫️',
        48: '🌫️',
        51: '🌦️',
        53: '🌦️',
        55: '🌦️',
        56: '🌧️',
        57: '🌧️',
        61: '🌧️',
        63: '🌧️',
        65: '🌧️',
        66: '❄️',
        67: '❄️',
        71: '❄️',
        73: '❄️',
        75: '❄️',
        77: '❄️',
        80: '🌧️',
        81: '🌧️',
        82: '🌧️',
        85: '❄️',
        86: '❄️',
        95: '⛈️',
        96: '⛈️',
        99: '⛈️',
      };
      return weatherIcons[code] || '❓';
    };

    return {
      temperature: current_weather.temperature,
      temperatureMin: daily?.temperature_2m_min?.[0] || null,
      temperatureMax: daily?.temperature_2m_max?.[0] || null,
      windSpeed: current_weather.windspeed,
      icon: weatherCodeToIcon(current_weather.weathercode),
    };
  }
}
