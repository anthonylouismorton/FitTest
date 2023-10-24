import axios from 'axios';
import { User } from '../../interfaces'

const apiBaseURL = 'https://localhost:7156/api/User';

export const userApi = {
  getUserData: async () => {
    try {
      const response = await axios.get(apiBaseURL);
      return response.data;
    } catch (error) 
    {
      throw error;
    }
  },
  validateUser: async (user: User) => {
    try {
      const response = await axios.post(`${apiBaseURL}/validate`, user);
      return response.data
    } catch (error)
    {
      throw error;
    }
  },
  getUserById: async (userID: number) => {
    try {
      const response = await axios.get(`${apiBaseURL}/${userID}`);
      return response.data
    } catch (error)
    {
      throw error;
    }
  },
  updateUser: async (userID: number, updatedUser: User) => {
    try {
      const response = await axios.put(`${apiBaseURL}/${userID}`, updatedUser);
      return response.data
    } catch (error)
    {
      throw error;
    }
  },
  createUserData: async (usersData: User) => {
    try{
      const response = await axios.post(apiBaseURL, usersData);
      return response.data;
    }
    catch(error)
    {
      throw error;
    }
  }
};
