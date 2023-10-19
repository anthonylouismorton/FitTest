import React from 'react';
import Link from 'next/link';

const EmployeeDetails = ({employee}) => {

  return (
    <div className="flex justify-center w-full">
      <div className="bg-white p-8 rounded-lg shadow-md w-full">
      <div className="flex flex-row items-center justify-center w-full mb-4">
        <h2 className="text-2xl font-semibold mr-2">{`${employee.firstname} ${employee.lastname} Details`}</h2>
        <Link href={`/Employee/Edit/${employee.employeeID}`} passHref>
          <button className="text-blue-500">Edit</button>
        </Link>
      </div>
      <div className='flex flex-wrap justify-between'>
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
      </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
