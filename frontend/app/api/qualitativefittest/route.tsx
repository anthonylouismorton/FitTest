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
  getQualitativeById: async (qualitativeTestID: number) => {

    try {
      const response = await axios.get(`${apiBaseURL}/${qualitativeTestID}`);
      return response.data
    } catch (error)
    {
      throw error;
    }
  },
  deleteQualitative: async (qualitativeTestID: number) => {
    try {
      const response = await axios.delete(`${apiBaseURL}/${qualitativeTestID}`);
      return response.data
    } catch (error)
    {
      throw error;
    }
  },
  updateQualitativeFitTest: async (qualitativeTestID: number, updatedQualitativeFitTest: QualitativeFitTest) => {
    try {
      const response = await axios.put(`${apiBaseURL}/${qualitativeTestID}`, updatedQualitativeFitTest);
      return response.data
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