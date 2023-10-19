"use client"
import React, { useState, useEffect } from 'react';
import { employeeApi } from '../../../api/employee/route';
import { Employee, QuantitativeFitTest } from '../../../interfaces';
import EmployeeDetails from './employeeDetails';
import EmployeeQuantFitTests from './employeeQuantFitTests';
import EmployeeQualFitTests from './employeeQualtFitTests';
import QuantitativeFitTestModal from './SelectedQuantFitTest';
const Info = ({ params: { employeeID } } : { params: { employeeID: string } }) => {
  const [quantOpen, setQuantOpen] = useState<boolean>(false);
  const [selectedQuantitativeFitTest, setSelectedQuantitativeFitTest] = useState<number | undefined>(undefined);
  const [employee, setEmployee] = useState<Employee>({
    firstname: "",
    middlename: "",
    lastname: "",
    address1: "",
    address2: "",
    address3: "",
    birthday: "",
    ssn: "",
    city: "",
    state: "",
    zipcode: "",
    email: "",
    phonenumber: "",
  });
  const handleOpen = () => setQuantOpen(true);
  const handleClose = () => setQuantOpen(false);
  useEffect(() => {
    const getEmployee = async () => {
      var employee = await employeeApi.getEmployeeById(Number(employeeID))
      console.log(employee)
      setEmployee(employee)
    }
    getEmployee();

  }, []);
  console.log(selectedQuantitativeFitTest)
  return (
    <div className="flex flex-col mt-4 px-2 items-center justify-center w-full">
      <QuantitativeFitTestModal fitTestID={selectedQuantitativeFitTest} open={quantOpen} setOpen={setQuantOpen} employee={employee} />
      <EmployeeDetails employee={employee}/>
      <EmployeeQuantFitTests setSelectedQuantitativeFitTest={setSelectedQuantitativeFitTest} employee={employee} setQuantOpen={setQuantOpen}/>
      <EmployeeQualFitTests employee={employee}/>
    </div>
  );
};

export default Info;
