"use client"
import React, { useState, useEffect } from 'react'
import { employeeApi } from '../../api/employee/route';
import { companyApi } from '../../api/company/route';
import { Company, Employee } from '../../interfaces';

const Add = () => {

  const [validation, setValidation] = useState({
    birthday: false,
    company: false,
    zipCode: false,
    phone: false,
    email: false,
    state: false,
    ssn: false
  });
  const [employee, setEmployee] = useState<Employee>({
    firstname: "",
    middlename: "",
    lastname: "",
    address1: "",
    address2: "",
    address3: "",
    birthday:new Date(),
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
    const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
    const zipCodeFormat = /^\d{5}(-\d{4})?$/;
    const phoneFormat = /^\d{3}-\d{3}-\d{4}$/;
    const emailFormat = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const stateAbbreviationFormat = /^[A-Z]{2}$/;
    const ssnFormat = /^\d{3}-\d{2}-\d{4}$/;
    const checkDate = dateFormat.test(employee.birthday?.toISOString().split('T')[0]);
    const checkZip = zipCodeFormat.test(employee.zipcode);
    const checkPhone = phoneFormat.test(employee.phonenumber);
    const checkEmail = emailFormat.test(employee.email);
    const checkState = stateAbbreviationFormat.test(employee.state);
    const checkSSN = ssnFormat.test(employee.ssn);

    setValidation((prevValidation) => ({
      ...prevValidation,
      birthday: !checkDate,
      zipCode: !checkZip,
      company: !selectedCompany,
      phone: !checkPhone,
      email: !checkEmail,
      state: !checkState,
      ssn: !checkSSN
    }));

    if(selectedCompany && checkDate && checkZip && checkPhone && checkEmail && checkState && checkSSN){
      const formattedEmployee = {
        employeeID: undefined,
        firstname: employee.firstname,
        middlename: employee.middlename,
        lastname: employee.lastname,
        address1: employee.address1,
        address2: employee.address2,
        address3: employee.address3,
        birthday: new Date(employee.birthday),
        ssn: employee.ssn?.replaceAll("-",""),
        city: employee.city,
        state: employee.state,
        zipcode: employee.zipcode,
        email: employee.email,
        phonenumber: employee.phonenumber?.replaceAll("-",""),
        companyID: parseInt(selectedCompany)
      };
      console.log(formattedEmployee)
      try {
        await employeeApi.createEmployeeData(formattedEmployee);
        console.log('Employee data created successfully');
      } 
      catch (error) {
        console.error('Error creating employee data:', error);
      }
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

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Create a New Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              value={employee.firstname}
              name="firstname"
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Middle Name
            </label>
            <input
              type="text"
              value={employee.middlename}
              name="middlename"
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              value={employee.lastname}
              name="lastname"
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              value={employee.address1}
              name="address1"
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Address 2
            </label>
            <input
              type="text"
              value={employee.address2}
              name="address2"
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Address 3
            </label>
            <input
              type="text"
              value={employee.address3}
              name="address3"
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300"
            />
          </div>
          {validation.birthday && (
            <p className="text-red-500 text-xs mt-1">Date should be in YYYY-MM-DD format</p>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Birthday
            </label>
            <input
              type="text"
              placeholder='YYYY-MM-DD'
              value={employee.birthday?.toISOString().split('T')[0]}
              name="birthday"
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300"
            />
          </div>
          {validation.ssn && (
            <p className="text-red-500 text-xs mt-1">SSN should be in XXX-XX-XXXX format</p>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              SSN
            </label>
            <input
              type="text"
              value={employee.ssn}
              name="ssn"
              placeholder='XXX-XX-XXXX'
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              value={employee.city}
              name="city"
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300"
              required
            />
          </div>
          {validation.state && (
            <p className="text-red-500 text-xs mt-1">Please use state abbrevation</p>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              type="text"
              placeholder='XX'
              value={employee.state}
              name="state"
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300"
            />
          </div>
          {validation.zipCode && (
            <p className="text-red-500 text-xs mt-1">Enter a valid ZIP code</p>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Zip Code
            </label>
            <input
              type="text"
              placeholder='XXXXX'
              value={employee.zipcode}
              name="zipcode"
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300"
            />
          </div>
          {validation.email && (
            <p className="text-red-500 text-xs mt-1">Invalid email format</p>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              value={employee.email}
              name="email"
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300"
            />
          </div>
          {validation.phone && (
            <p className="text-red-500 text-xs mt-1">Phone number should be in XXX-XXX-XXXX format</p>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              placeholder='XXX-XXX-XXXX'
              name="phonenumber"
              value={employee.phonenumber}
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300"
            />
          </div>
        {companyList.length > 0 &&
         <div>
          {validation.company && (
            <p className="text-red-500 text-xs mt-1">You must select a company</p>
          )}
          <label>Select a Company</label>
            <select
              id="companyDropdown"
              value={selectedCompany}
              onChange={handleCompanySelect}
            >
              <option value=""></option>
              {companyList.map((company) => (
                <option key={company.companyID?.toString()} value={company.companyID?.toString()}>
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

export default Add;
