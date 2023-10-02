import React, { useEffect, useState } from 'react';
import { apiService } from '../api/weather/route'; // Import your API service

const Weather = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    // Fetch weather data when the component mounts
    apiService.getWeatherData()
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }, []);
  console.log(weatherData)
  return (
    <div>
      <h1>Weather Forecast</h1>
    </div>
  );
};

export default Weather;
