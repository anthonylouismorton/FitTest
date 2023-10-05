"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { employeeApi } from '../api/employee/route';
import { companyApi } from '../api/company/route';
import { Employee, Company } from '../interfaces';

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    address1: "",
    address2: "",
    address3: "",
    birthday: new Date().toISOString().split('T')[0],
    ssn: "",
    city: "",
    state: "",
    zipcode: "",
    email: "",
    phonenumber: "", 
  });
  const [selectedCompany, setSelectedCompany] = useState<string | undefined>(undefined);

  const [companyList, setCompanyList] = useState<Company[]>([]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

  const handleCompanySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCompany(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await employeeApi.createEmployeeData(employee);
      console.log('Employee data created successfully');
    } 
    catch (error) {
      console.error('Error creating employee data:', error);
    }
  };
  

  useEffect(() => {
    const getCompanyList = async () => {
      try{
        var companyList = await companyApi.getCompanyData();
        setCompanyList(companyList)
      }
      catch(error){
        console.error('Error feteching company data:', error)
      }
    }
    getCompanyList()
  }, []);
  console.log(companyList)
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Create a New Employee</h2>
        <form onSubmit={handleSubmit}>
        {Object.keys(employee).map((key) => (
          <div key={key} className="mb-4">
            <label htmlFor={key} className="block text-sm font-medium text-gray-700">
              {key}
            </label>
            <input
              type="text"
              id={key}
              name={key}
              value={employee[key as keyof typeof employee]}
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300"
            />
          </div>
        ))}
        {companyList.length > 0 &&
         <div>
          <label>Select a Company</label>
            <select
              id="companyDropdown"
              value={selectedCompany}
              onChange={handleCompanySelect}
            >
              <option value=""></option>
              {companyList.map((company) => (
                <option key={company.companyID.toString()} value={company.companyID.toString()}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
        }
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Create Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
