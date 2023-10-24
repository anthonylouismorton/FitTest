import axios from 'axios';
import { User } from '../../interfaces'
import { apiBaseUrl } from 'next-auth/client/_utils';

const apiBaseURL = 'https://localhost:7156/api/ValidateUser';

export const validateApi = {
  validateUser: async (user: User) => {
    try {
      console.log(apiBaseUrl)
      const response = await axios.post(apiBaseURL, user);
      return response.data
    } catch (error)
    {
      throw error;
    }
  }
};
