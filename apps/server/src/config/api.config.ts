export default () => ({
  usersApi: process.env.API_USERS_URL,
  weatherApi:
    process.env.API_WEATHER_URL || 'https://api.open-meteo.com/v1/forecast',
});
