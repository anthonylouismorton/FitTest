import axios from 'axios';
import { Company } from '../../interfaces'

const apiBaseURL = 'https://localhost:7156/api/Company';

export const companyApi = {
  getCompanyData: async (includeArchived = false) => {
    try {
      const url = `${apiBaseURL}?includeArchived=${includeArchived ? true : false}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) 
    {
      throw error;
    }
  },
  getCompanyById: async (companyID: number) => {
    try {
      const response = await axios.get(`${apiBaseURL}/${companyID}`);
      return response.data
    } catch (error)
    {
      throw error;
    }
  },
  deleteCompany: async (companyID: number) => {
    try {
      const response = await axios.delete(`${apiBaseURL}/${companyID}`);
      return response.data
    } catch (error)
    {
      throw error;
    }
  },
  updateCompany: async (companyID: number, updatedCompany: Company) => {
    try {
      const response = await axios.put(`${apiBaseURL}/${companyID}`, updatedCompany);
      return response.data
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