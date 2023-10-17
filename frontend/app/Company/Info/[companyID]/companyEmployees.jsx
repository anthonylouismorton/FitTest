import React from 'react'

const EmployeesTable = ({ employees }) => {
  console.log(employees);
  return (
    <div className="flex flex-col mt-4 w-full">
      <h1 className="w-full font-bold text-2xl text-center">Employees</h1>
      <table className='w-full mt-4 shadow'>
        <thead class="border-b font-medium dark:border-neutral-500">
          <tr>
            <th scope="col" class="px-6 py-4">Name</th>
            <th scope="col" class="px-6 py-4">Birthday</th>
            <th scope="col" class="px-6 py-4">Employee ID</th>
            <th scope="col" class="px-6 py-4">Phone Number</th>
            <th scope="col" class="px-6 py-4">Email</th>
            <th scope="col" class="px-6 py-4">Last 4</th>
          </tr>
        </thead>
        <tbody>
          {employees?.map((employee, index) => (
            <tr 
             key={employee.employeeID}
             class={index % 2 === 0 ? "border-b dark:border-neutral-500 bg-gray-300 cursor-pointer hover:bg-gray-400" : "border-b dark:border-neutral-500 bg-gray-100 cursor-pointer hover:bg-gray-400"}
             title="Click for more info" 
             >
              <td class="whitespace-nowrap px-6 py-4 text-center">{`${employee.firstname} ${employee.middlename} ${employee.lastname}`}</td>
              <td class="whitespace-nowrap px-6 py-4 text-center">{employee.birthday.split('T')[0]}</td>
              <td class="whitespace-nowrap px-6 py-4 text-center">{employee.employeeID}</td>
              <td class="whitespace-nowrap px-6 py-4 text-center">{employee.phonenumber}</td>
              <td class="whitespace-nowrap px-6 py-4 text-center">{employee.email}</td>
              <td class="whitespace-nowrap px-6 py-4 text-center">{employee.ssn.slice(-4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default EmployeesTable