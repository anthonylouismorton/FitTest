"use client"
import React, { useState } from 'react';
import { companyApi } from '../../api/company/route';

const Company = () => {
  const [company, setCompany] = useState({
    name: "",
    address1: "",
    address2: "",
    address3: "",
    city: "",
    state: "",
    zipcode: "",
    email: "",
    altemail: "", 
    phonenumber: "", 
    phonenumberext: "", 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompany({
      ...company,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await companyApi.createCompanyData(company);
      console.log('Company data created successfully');
    } 
    catch (error) {
      console.error('Error creating company data:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Create a New Company</h2>
        <form onSubmit={handleSubmit}>
        {Object.keys(company).map((key) => (
          <div key={key} className="mb-4">
            <label htmlFor={key} className="block text-sm font-medium text-gray-700">
              {key}
            </label>
            <input
              type="text"
              id={key}
              name={key}
              value={company[key as keyof typeof company]}
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300"
            />
          </div>
        ))}
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Create Company
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Company;
