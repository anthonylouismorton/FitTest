import axios from 'axios';
import { QuantitativeFitTest } from '../../interfaces'

const apiBaseURL = 'https://localhost:7156/api/QuantitativeRespiratorFitTest';

export const quantitativefittestApi = {
  getQuantitative: async () => {
    try {
      const response = await axios.get(apiBaseURL);
      return response.data;
    } catch (error) 
    {
      throw error;
    }
  },

  createQuantitativeData: async (quantitativefittest: QuantitativeFitTest) => {
    try{
      const response = await axios.post(apiBaseURL, quantitativefittest);
      return response.data;
    }
    catch(error)
    {
      throw error;
    }
  }
};