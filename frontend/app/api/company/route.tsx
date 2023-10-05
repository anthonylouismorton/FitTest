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

  createCompanyData: async (company: Company) => {
    try{
      const response = await axios.post(apiBaseURL, company);
      return response.data;
    }
    catch(error)
    {
      throw error;
    }
  }
};