import axios from 'axios';
import { Employee } from '../../interfaces'

const apiBaseURL = 'https://localhost:7156/api/Employee';

export const employeeApi = {
  getEmployeeData: async () => {
    try {
      const response = await axios.get(apiBaseURL);
      return response.data;
    } catch (error) 
    {
      throw error;
    }
  },

  createEmployeeData: async (employeeData: Employee) => {
    console.log(employeeData)
    try{
      const response = await axios.post(apiBaseURL, employeeData);
      return response.data;
    }
    catch(error)
    {
      throw error;
    }
  }
};
