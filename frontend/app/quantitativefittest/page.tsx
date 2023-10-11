"use client"
import React, { useState, useEffect } from 'react';
import { quantitativefittestApi } from '../api/quantitativefittest/route';
import { respiratorApi } from '../api/respirator/route';
import { QuantitativeFitTest, Employee, Respirator } from '../interfaces';
import { employeeApi } from '../api/employee/route';
const QuantitativeFitTest = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<string | undefined>(undefined);
  const [selectedRespirator, setSelectedRespirator] = useState<string | undefined>(undefined);
  const [employeeList, setEmployeeList] = useState<Employee[]>([]);
  const [respiratorList, setRespiratorList] = useState<Respirator[]>([]);
  const [validation, setValidation] = useState({
    fitfactor1: undefined,
    fitfactor2: undefined,
    fitfactor3: undefined,
    fitfactor4: undefined,
    fitfactor5: undefined,
    fitfactor6: undefined,
    fitfactor7: undefined,
    fitfactor8: undefined,
  });
  const [fittest, setFittest] = useState<QuantitativeFitTest>({
    testpass: "",
    testdate: new Date(),
    testtime: new Date(),
    testexpiration: new Date(),
    fitfactor1: "",
    fitfactor2: "",
    fitfactor3: "",
    fitfactor4: "",
    fitfactor5: "",
    fitfactor6: "",
    fitfactor7: "",
    fitfactor8: "",
    overallfitfactor: "",
    employeeID: undefined,
    respiratorID: undefined,
    size: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFittest({
      ...fittest,
      [e.target.name]: e.target.value
    });
  };
  const handleFitFactor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const checkNumber = Number(value)
    console.log(checkNumber)
    if(Number.isNaN(checkNumber)){
      setValidation({...validation, [e.target.name]: "Numbers Only"})
    }
    else if(value.length > 7){
      setValidation({...validation, [e.target.name]: "Fit Factor must be less than 7 digits"})
    }
    else{
      console.log('in the else')
      setValidation({...validation, [e.target.name]: undefined})
      setFittest({
        ...fittest,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSizeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFittest({...fittest, size: e.target.value });
  };

  const handleEmployeeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEmployee(e.target.value);
  };

  const handleRespiratorSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRespirator(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await quantitativefittestApi.createQuantitativeData(fittest);
      console.log('Respirator data created successfully');
    } 
    catch (error) {
      console.error('Error creating fittest data:', error);
    }
  };

  useEffect(()=> {
    const getEmployeeList = async () => {
      try{
        var employeeList = await employeeApi.getEmployeeData();
        setEmployeeList(employeeList)
      }
      catch(error){
        console.error('Error feteching Employee data:', error)
      }
    }
    const getRespiratorList = async () => {
      try{
        var respiratorList = await respiratorApi.getRespiratorData();
        setRespiratorList(respiratorList)
      }
      catch(error){
        console.error('Error feteching Respirator data:', error)
      }
    }
    getEmployeeList();
    getRespiratorList();
  },[])
  console.log(fittest)
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">New Quantitative Fit Test</h2>
        <form onSubmit={handleSubmit}>
        {employeeList.length > 0 &&
         <div>
          <label className="block text-sm font-medium text-gray-700">Select Employee</label>
            <select
              value={selectedEmployee}
              onChange={handleEmployeeSelect}
            >
              <option value=""></option>
              {employeeList.map((employee) => (
                <option key={employee.employeeID?.toString()} value={employee.employeeID?.toString()}>
                  {`${employee.firstname} ${employee.lastname}`}
                </option>
              ))}
            </select>
          </div>
        }
        {respiratorList.length > 0 &&
         <div>
          <label className="block text-sm font-medium text-gray-700">Select Respirator</label>
            <select
              value={selectedRespirator}
              onChange={handleRespiratorSelect}
            >
              <option value=""></option>
              {respiratorList.map((respirator) => (
                <option key={respirator.respiratorID?.toString()} value={respirator.respiratorID?.toString()}>
                  {`${respirator.make} ${respirator.model}`}
                </option>
              ))}
            </select>
          </div>
        }
        <div className="mb-4">
          {validation.fitfactor1 && (
            <p className="text-red-500 text-xs mt-1">{validation.fitfactor1}</p>
          )}
          <label className="block text-sm font-medium text-gray-700">
            Fit Factor 1
          </label>
          <input
            type="text"
            value={fittest.fitfactor1}
            name="fitfactor1"
            onChange={handleFitFactor}
            className="mt-1 p-2 block w-full rounded-md border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          {validation.fitfactor2 && (
            <p className="text-red-500 text-xs mt-1">{validation.fitfactor2}</p>
          )}
          <label className="block text-sm font-medium text-gray-700">
            Fit Factor 2
          </label>
          <input
            type="text"
            value={fittest.fitfactor2}
            name="fitfactor2"
            onChange={handleFitFactor}
            className="mt-1 p-2 block w-full rounded-md border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          {validation.fitfactor3 && (
            <p className="text-red-500 text-xs mt-1">{validation.fitfactor3}</p>
          )}
          <label className="block text-sm font-medium text-gray-700">
            Fit Factor 3
          </label>
          <input
            type="text"
            value={fittest.fitfactor3}
            onChange={handleFitFactor}
            name="fitfactor3"
            className="mt-1 p-2 block w-full rounded-md border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          {validation.fitfactor4 && (
            <p className="text-red-500 text-xs mt-1">{validation.fitfactor4}</p>
          )}
          <label className="block text-sm font-medium text-gray-700">
            Fit Factor 4
          </label>
          <input
            type="text"
            value={fittest.fitfactor4}
            onChange={handleFitFactor}
            name="fitfactor4"
            className="mt-1 p-2 block w-full rounded-md border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          {validation.fitfactor5 && (
            <p className="text-red-500 text-xs mt-1">{validation.fitfactor5}</p>
          )}
          <label className="block text-sm font-medium text-gray-700">
            Fit Factor 5
          </label>
          <input
            type="text"
            value={fittest.fitfactor5}
            name="fitfactor5"
            onChange={handleFitFactor}
            className="mt-1 p-2 block w-full rounded-md border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          {validation.fitfactor6 && (
            <p className="text-red-500 text-xs mt-1">{validation.fitfactor6}</p>
          )}
          <label className="block text-sm font-medium text-gray-700">
            Fit Factor 6
          </label>
          <input
            type="text"
            value={fittest.fitfactor6}
            name="fitfactor6"
            onChange={handleFitFactor}
            className="mt-1 p-2 block w-full rounded-md border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          {validation.fitfactor7 && (
            <p className="text-red-500 text-xs mt-1">{validation.fitfactor7}</p>
          )}
          <label className="block text-sm font-medium text-gray-700">
            Fit Factor 7
          </label>
          <input
            type="text"
            value={fittest.fitfactor7}
            name="fitfactor7"
            onChange={handleFitFactor}
            className="mt-1 p-2 block w-full rounded-md border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          {validation.fitfactor8 && (
            <p className="text-red-500 text-xs mt-1">{validation.fitfactor8}</p>
          )}
          <label className="block text-sm font-medium text-gray-700">
            Fit Factor 8
          </label>
          <input
            type="text"
            value={fittest.fitfactor8}
            name="fitfactor8"
            onChange={handleFitFactor}
            className="mt-1 p-2 block w-full rounded-md border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Size
          </label>
          <select
            value={fittest.size}
            name="size"
            onChange={handleSizeSelect}
            className="mt-1 p-2 block w-full rounded-md border-gray-300"
            required
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Create Quantitative Fit Test
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuantitativeFitTest;
