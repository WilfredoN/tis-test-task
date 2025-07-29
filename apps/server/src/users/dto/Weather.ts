export interface WeatherCurrent {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  is_day: number;
  time: string;
}

export interface WeatherDaily {
  temperature_2m_min: number[];
  temperature_2m_max: number[];
  weathercode: number[];
  time: string[];
}

export interface WeatherApiResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather: WeatherCurrent;
  daily?: WeatherDaily;
}

export interface WeatherDTO {
  temperature: number;
  temperatureMin: number | null;
  temperatureMax: number | null;
  windSpeed: number;
  icon: string | number;
}
