import axios from 'axios';

const apiBaseURL = 'https://localhost:7156/api/Employee';

interface EmployeeData {
    firstname: String,
    middlename: String,
    lastname: String,
    address1: String,
    address2: String,
    address3: String,
    birthday: String,
    ssn: String,
    city: String,
    state: String,
    zipcode: String,
    email: String,
    phonenumber: String
}

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

  createEmployeeData: async (employeeData: EmployeeData) => {
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
