import axios from 'axios';
import { Respirator } from '../../interfaces'

const apiBaseURL = 'https://localhost:7156/api/Respirator';

export const respiratorApi = {
  getRespiratorData: async () => {
    try {
      const response = await axios.get(apiBaseURL);
      return response.data;
    } catch (error) 
    {
      throw error;
    }
  },
  getRespiratorById: async (respiratorID: number) => {
    try {
      const response = await axios.get(`${apiBaseURL}/${respiratorID}`);
      return response.data
    } catch (error)
    {
      throw error;
    }
  },
  createRespiratorData: async (respirator: Respirator) => {
    try{
      const response = await axios.post(apiBaseURL, respirator);
      return response.data;
    }
    catch(error)
    {
      throw error;
    }
  }

};