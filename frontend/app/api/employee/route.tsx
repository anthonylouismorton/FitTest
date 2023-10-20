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
  getEmployeeById: async (employeeID: number) => {
    try {
      const response = await axios.get(`${apiBaseURL}/${employeeID}`);
      return response.data
    } catch (error)
    {
      throw error;
    }
  },
  updateEmployee: async (employeeID: number, updatedEmployee: Employee) => {
    try {
      const response = await axios.put(`${apiBaseURL}/${employeeID}`, updatedEmployee);
      return response.data
    } catch (error)
    {
      throw error;
    }
  },
  createEmployeeData: async (employeeData: Employee) => {

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
