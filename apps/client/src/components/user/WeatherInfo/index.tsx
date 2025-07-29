import { UserWithWeather } from '@/types/user'

interface WeatherInfoProps {
  weather?: UserWithWeather['weather']
}

export const WeatherInfo = ({ weather }: WeatherInfoProps) => {
  if (!weather) {
    return (
      <div className='mt-2 text-center text-sm text-gray-400'>
        Weather data unavailable
      </div>
    )
  }
  return (
    <div className='mt-2 flex flex-col items-center'>
      <div className='flex items-center gap-2'>
        {weather.icon && (
          <span className='h-8 w-8 text-2xl'>{weather.icon}</span>
        )}
        <span className='text-lg font-semibold text-white'>
          {weather.temperature}&deg;C
        </span>
      </div>
      <div className='mt-1 text-xs text-gray-300'>
        Min: {weather.temperatureMin}&deg;C | Max: {weather.temperatureMax}
        &deg;C
      </div>
      <div className='mt-1 text-xs text-gray-300'>
        Windspeed: {weather.windSpeed} km/h
      </div>
    </div>
  )
}
