import axios from 'axios';
import { Company } from '../../interfaces'

const apiBaseURL = 'https://localhost:7156/api/Company';

export const companyApi = {
  getCompanyData: async () => {
    try {
      const response = await axios.get(apiBaseURL);
      return response.data;
    } catch (error) 
    {
      throw error;
    }
  },

  createCompanyData: async (companyData: Company) => {
    try{
      const response = await axios.post(apiBaseURL, companyData);
      return response.data;
    }
    catch(error)
    {
      throw error;
    }
  }
};
