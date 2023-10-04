import axios from 'axios';

const apiBaseURL = 'https://localhost:7156/api/Company';

interface CompanyData {
  name?: string;
  address1?: string;
  address2?: string;
  address3?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  email?: string;
  altemail?: string;
  phonenumber?: string;
  phonenumberext?: string;
}

export const apiService = {
  getCompanyData: async () => {
    try {
      const response = await axios.get(apiBaseURL);
      return response.data;
    } catch (error) 
    {
      throw error;
    }
  },

  createCompanyData: async (companyData: CompanyData) => {
    console.log(companyData)
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
