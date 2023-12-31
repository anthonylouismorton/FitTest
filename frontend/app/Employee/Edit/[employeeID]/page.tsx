"use client"
import React, { useState, useEffect } from 'react'
import { employeeApi } from '../../../api/employee/route';
import { Employee } from '../../../interfaces';
import { useRouter } from 'next/navigation';

const Edit = ({ params: { employeeID } } : { params: { employeeID: string } }) => {
  const router = useRouter();
  const [validation, setValidation] = useState({
    birthday: false,
    company: false,
    zipCode: false,
    phone: false,
    email: false,
    state: false,
    hashedssn: false
  });
  const [employee, setEmployee] = useState<Employee>({
    firstname: "",
    middlename: "",
    lastname: "",
    address1: "",
    address2: "",
    address3: "",
    birthday:"",
    hashedssn: "",
    city: "",
    state: "",
    zipcode: "",
    email: "",
    phonenumber: "",
    companyID: undefined,
    qualitativeRespiratorFitTests: [],
    quantitativeRespiratorFitTests: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
    const zipCodeFormat = /^\d{5}(-\d{4})?$/;
    const phoneFormat = /^\d{3}-\d{3}-\d{4}$/;
    const emailFormat = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const stateAbbreviationFormat = /^[A-Z]{2}$/;
    const hashedssnFormat = /^\d{3}-\d{2}-\d{4}$/;
    const checkDate = dateFormat.test(new Date(employee.birthday).toISOString().split('T')[0]);
    const checkZip = zipCodeFormat.test(employee.zipcode);
    const checkPhone = phoneFormat.test(employee.phonenumber);
    const checkEmail = emailFormat.test(employee.email);
    const checkState = stateAbbreviationFormat.test(employee.state);
    const checkSSN = hashedssnFormat.test(employee.hashedssn);

    setValidation((prevValidation) => ({
      ...prevValidation,
      birthday: !checkDate,
      zipCode: !checkZip,
      phone: !checkPhone,
      email: !checkEmail,
      state: !checkState,
      hashedssn: !checkSSN
    }));

    if(checkDate && checkZip && checkPhone && checkEmail && checkState && checkSSN){
      const formattedEmployee = {
        employeeID: Number(employee.employeeID),
        firstname: employee.firstname,
        middlename: employee.middlename,
        lastname: employee.lastname,
        address1: employee.address1,
        address2: employee.address2,
        address3: employee.address3,
        birthday: employee.birthday?.toString().split('T')[0],
        hashedssn: employee.hashedssn?.replaceAll("-",""),
        city: employee.city,
        state: employee.state,
        zipcode: employee.zipcode,
        email: employee.email,
        phonenumber: employee.phonenumber?.replaceAll("-",""),
        companyID: employee.companyID,
        qualitativeRespiratorFitTests: [],
        quantitativeRespiratorFitTests: []
      };
      try {
        await employeeApi.updateEmployee(Number(employeeID), formattedEmployee);
        console.log('Employee data updated successfully');
        router.back();
      } 
      catch (error) {
        console.error('Error creating employee data:', error);
      }
    }
  };
  
  useEffect(() => {
    const getEmployee = async () => {
      var employeeInfo = await employeeApi.getEmployeeById(Number(employeeID))
      setEmployee({...employeeInfo, phonenumber: employeeInfo.phonenumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'),  hashedssn: `${employeeInfo.hashedssn.slice(0,3)}-${employeeInfo.hashedssn.slice(4,6)}-${employeeInfo.hashedssn.slice(-4)}`})
    }
    getEmployee();
  }, []);

  return (
    <div className="flex items-center justify-center w-full">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Edit Employee</h2>
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
              type="date"
              placeholder='YYYY-MM-DD'
              value={employee.birthday ? new Date(employee.birthday).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
              name="birthday"
              onChange={handleChange}
              className="mt-1 p-2 block w-full rounded-md border-gray-300"
            />
          </div>
          {validation.hashedssn && (
            <p className="text-red-500 text-xs mt-1">SSN should be in XXX-XX-XXXX format</p>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              SSN
            </label>
            <input
              type="text"
              value={employee.hashedssn}
              name="hashedssn"
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
          <div className='flex justify-evenly'>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Edit
            </button>
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
              onClick={()=> router.back()}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
