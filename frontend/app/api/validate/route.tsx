import axios from 'axios';
import { User } from '../../interfaces'

const apiBaseURL = 'https://localhost:7156/api/ValidateUser';

export const userApi = {
  validateUser: async (user: User) => {
    try {
      const response = await axios.post(apiBaseURL, user);
      return response.data
    } catch (error)
    {
      throw error;
    }
  }
};
