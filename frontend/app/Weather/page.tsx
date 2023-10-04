import React, { useEffect, useState } from 'react';
import { apiService } from '../api/weather/route';

const Weather = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    apiService.getWeatherData()
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Weather Forecast</h1>
    </div>
  );
};

export default Weather;
