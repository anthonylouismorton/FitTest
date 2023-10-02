"use client"
import React, { useEffect, useState } from 'react';
import { apiService } from '../app/api/weather/route'; // Import your API service

export default function Home() {
  type WeatherData = {
    date: string;
    temperatureC: number;
    summary: string;
  };

  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);


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
  return (
    <div>
      <h1>Weather Forecast</h1>
      {weatherData.map((weather) => (
        <div key={weather.date}>
          <p>Date: {weather.date}</p>
          <p>Temperature: {weather.temperatureC}</p>
          <p>Summary: {weather.summary}</p>
        </div>
      ))}
    </div>
  );
  
}
