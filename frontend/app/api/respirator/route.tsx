import axios from 'axios';
import { Respirator } from '../../interfaces'

const apiBaseURL = 'https://localhost:7156/api/Respirator';

export const respiratorApi = {
  getRespiratorData: async (includeArchived = false) => {
    try {
      const url = `${apiBaseURL}?includeArchived=${includeArchived ? true : false}`;
      const response = await axios.get(url);
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
  deleteRespirator: async (respiratorID: number) => {
    try {
      const response = await axios.delete(`${apiBaseURL}/${respiratorID}`);
      return response.data
    } catch (error)
    {
      throw error;
    }
  },
  updateRespirator: async (respiratorID: number, updatedRespirator: Respirator) => {
    try {
      const response = await axios.put(`${apiBaseURL}/${respiratorID}`, updatedRespirator);
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