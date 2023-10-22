"use client"
import React, { useState, useEffect } from 'react';
import { employeeApi } from '../../../api/employee/route';
import { Employee } from '../../../interfaces';
import EmployeeDetails from './employeeDetails';
import EmployeeQuantFitTests from './employeeQuantFitTests';
import EmployeeQualFitTests from './employeeQualtFitTests';
import SelectedQuantFitTest from './SelectedQuantFitTest';
import SelectedQualFItTest from './SelectedQualFitTest';
import { useRouter } from 'next/navigation';

const Info = ({ params: { employeeID } } : { params: { employeeID: string } }) => {
  const router = useRouter();
  const [showQuantFitTest, setShowQuantFitTest] = useState<boolean>(false);
  const [showQualFitTest, setShowQualFitTest] = useState<boolean>(false);
  const [selectedQuantitativeFitTest, setSelectedQuantitativeFitTest] = useState<number | undefined>(undefined);
  const [selectedQualitativeFitTest, setSelectedQualitativeFitTest] = useState<number | undefined>(undefined);
  const [employee, setEmployee] = useState<Employee>({
    firstname: "",
    middlename: "",
    lastname: "",
    address1: "",
    address2: "",
    address3: "",
    birthday: "",
    hashedssn: "",
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
  console.log(employee)
  return (
    <div>
      <button className='text-blue-500 p-2' onClick={() => {router.push(`/Company/Info/${employee.companyID}`)}}>
        Back to Company
      </button>
      <div className="flex flex-col mt-4 px-2 items-center justify-center w-full">
        <EmployeeDetails employee={employee}/>
        {!showQuantFitTest && !showQualFitTest && (
          <div className='w-full'>
            <EmployeeQuantFitTests setSelectedQuantitativeFitTest={setSelectedQuantitativeFitTest} employee={employee} setShowQuantFitTest={setShowQuantFitTest}/>
            <EmployeeQualFitTests employee={employee} setSelectedQualitativeFitTest={setSelectedQualitativeFitTest} setShowQualFitTest={setShowQualFitTest}/>
          </div>
        )}
        {showQuantFitTest &&
          <SelectedQuantFitTest fitTestID={selectedQuantitativeFitTest} setShowQuantFitTest={setShowQuantFitTest} employee={employee} />
        }
        {showQualFitTest &&
          <SelectedQualFItTest fitTestID={selectedQualitativeFitTest} setShowQualFitTest={setShowQualFitTest} employee={employee} />
        }
      </div>
    </div>
  );
};

export default Info;
