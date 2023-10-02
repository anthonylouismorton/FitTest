import axios from 'axios';

const apiBaseURL = 'https://localhost:7156/WeatherForecast';

export const apiService = {
  getWeatherData: async () => {
    try {
      const response = await axios.get(apiBaseURL);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
