import axios from 'axios';
import { QualitativeFitTest } from '../../interfaces'

const apiBaseURL = 'https://localhost:7156/api/QualitativeRespiratorFitTest';

export const qualitativefittestApi = {
  getQualitative: async () => {
    try {
      const response = await axios.get(apiBaseURL);
      return response.data;
    } catch (error) 
    {
      throw error;
    }
  },

  createQualitativeData: async (qualitativefittest: QualitativeFitTest) => {
    try{
      const response = await axios.post(apiBaseURL, qualitativefittest);
      return response.data;
    }
    catch(error)
    {
      throw error;
    }
  }
};