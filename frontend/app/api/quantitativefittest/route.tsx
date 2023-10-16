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
  getQuantById: async (quantitativeTestID: number) => {
    console.log(quantitativeTestID)
    try {
      const response = await axios.get(`${apiBaseURL}/${quantitativeTestID}`);
      return response.data
    } catch (error)
    {
      throw error;
    }
  },
  deleteQuantitative: async (quantitativeTestID: number) => {
    try {
      const response = await axios.delete(`${apiBaseURL}/${quantitativeTestID}`);
      return response.data
    } catch (error)
    {
      throw error;
    }
  },
  updateQuantitativeFitTest: async (quantitativeTestID: number, updatedQuantitativeFitTest: QuantitativeFitTest) => {
    try {
      const response = await axios.put(`${apiBaseURL}/${quantitativeTestID}`, updatedQuantitativeFitTest);
      return response.data
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