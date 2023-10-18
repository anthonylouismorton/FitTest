"use client"
import React, { useState, useEffect } from 'react'
import { employeeApi } from '../../../api/employee/route';
import { companyApi } from '../../../api/company/route';
import { Company, Employee } from '../../../interfaces';
import { useRouter } from 'next/navigation';

const Info = ({ params: { employeeID } } : { params: { employeeID: string } }) => {
  const router = useRouter();
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
  
  useEffect(() => {
    const getEmployee = async () => {
      var employee = await employeeApi.getEmployeeById(Number(employeeID))
      setEmployee(employee)
    }
    getEmployee();

  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full">
        <h2 className="text-2xl font-semibold mb-4">{`${employee.firstname} ${employee.lastname} info`}</h2>
          <div className="mb-4 w-72">
            <div className='font-bold text-xl mb-1'>Name</div>
            <div>{`${employee.firstname} ${employee.middlename} ${employee.lastname}`}</div>
          </div>
          <div className="mb-4 w-72">
            <div className='font-bold text-xl mb-1'>Address</div>
            <div>{`${employee.address1} ${employee.address2} ${employee.address3}`}</div>
            <div>{`${employee.city}, ${employee.state} ${employee.zipcode}`}</div>
          </div>
          <div className="mb-4 w-72">
            <div className='font-bold text-xl mb-1'>Birthday</div>
            <div>{employee.birthday ? new Date(employee.birthday).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}</div>
          </div>
          <div className="mb-4 w-72">
            <div className='font-bold text-xl mb-1'>SSN</div>
            <div>{`XXX-XX-${employee.ssn.slice(-4)}`}</div>
          </div>
          <div className="mb-4 w-72">
            <div className='font-bold text-xl mb-1'>Email</div>
            <div>{employee.email}</div>
          </div>
          <div className="mb-4 w-72">
            <div className='font-bold text-xl mb-1'>Phone Number</div>
            <div>{employee.phonenumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}</div>
          </div>
          <div>
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Edit
            </button>
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Back
            </button>
          </div>
      </div>
    </div>
  );
};

export default Info;
