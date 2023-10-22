import React from 'react'
import { useRouter } from 'next/navigation';
import { Employee, Company } from '../../../interfaces';

const EmployeesTable = ({ company, companyID } : {company: Company, companyID?: number}) => {
  const router = useRouter();
  const employees = (company.employees || []) as Employee[];
  return (
    <div className="flex flex-col mt-4 w-full">
      <div className="flex w-full items-center justify-center">
          <h1 className="font-bold text-2xl text-center mr-2">Employees</h1>
          <button className='text-blue-500' 
            onClick={()=> {router.push(`/Employee/Add/${companyID}`)}}
            title="Click to add an employee"
            >
              Add
          </button>
        </div>
      <table className='w-full mt-4 shadow'>
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th scope="col" className="px-6 py-4">Name</th>
            <th scope="col" className="px-6 py-4">Birthday</th>
            <th scope="col" className="px-6 py-4">Employee ID</th>
            <th scope="col" className="px-6 py-4">Phone Number</th>
            <th scope="col" className="px-6 py-4">Email</th>
            <th scope="col" className="px-6 py-4">Last 4</th>
          </tr>
        </thead>
        <tbody>
          {employees?.map((employee, index) => (
            <tr 
             key={employee.employeeID}
             className={index % 2 === 0 ? "border-b dark:border-neutral-500 bg-gray-300 cursor-pointer hover:bg-gray-400" : "border-b dark:border-neutral-500 bg-gray-100 cursor-pointer hover:bg-gray-400"}
             title="Click for more info"
             onClick={()=> router.push(`/Employee/Info/${employee.employeeID}`)} 
             >
              <td className="whitespace-nowrap px-6 py-4 text-center">{`${employee.firstname} ${employee.middlename} ${employee.lastname}`}</td>
              <td className="whitespace-nowrap px-6 py-4 text-center">{employee.birthday.split('T')[0]}</td>
              <td className="whitespace-nowrap px-6 py-4 text-center">{employee.employeeID}</td>
              <td className="whitespace-nowrap px-6 py-4 text-center">{employee.phonenumber}</td>
              <td className="whitespace-nowrap px-6 py-4 text-center">{employee.email}</td>
              <td className="whitespace-nowrap px-6 py-4 text-center">{employee.hashedssn.slice(-4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default EmployeesTable