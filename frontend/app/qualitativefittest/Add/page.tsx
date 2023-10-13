"use client"
import React, { useState, useEffect } from 'react';
import { qualitativefittestApi } from '../../api/qualitativefittest/route';
import { respiratorApi } from '../../api/respirator/route';
import { QualitativeFitTest, Employee, Respirator } from '../../interfaces';
import { employeeApi } from '../../api/employee/route';
const QualitativeFitTest = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<string | undefined>(undefined);
  const [selectedRespirator, setSelectedRespirator] = useState<Respirator | undefined>(undefined);
  const [employeeList, setEmployeeList] = useState<Employee[]>([]);
  const [respiratorList, setRespiratorList] = useState<Respirator[]>([]);
  const [validation, setValidation] = useState({
    exercise1: undefined,
    exercise2: undefined,
    exercise3: undefined,
    exercise4: undefined,
    testpass: "",
  });
  const initialDate = new Date();
  const expirationDate = new Date(initialDate);
  expirationDate.setFullYear(initialDate.getFullYear() + 1);
  const [fittest, setFittest] = useState<QualitativeFitTest>({
    testpass: false,
    testdate: initialDate,
    testtime: initialDate,
    testexpiration: expirationDate,
    exercise1: undefined,
    exercise2: undefined,
    exercise3: undefined,
    exercise4: undefined,
    testtype: "Saccharin",
    tastethreshold: 10,
    employeeID: undefined,
    respiratorID: undefined,
    size: "Small"
  });

  const parseTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    return date;
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTime = parseTime(e.target.value);
    setFittest({ ...fittest, testtime: selectedTime });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    setFittest({ ...fittest, [e.target.name]: selectedDate });
  };
  
  const handleExercise = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const passFail = e.target.value;
    var value: boolean | undefined = undefined
    if(passFail === "pass"){
      value = true
    }
    else if(passFail === ""){
      value = undefined
    }
    else{
      value = false
    }
    setFittest({...fittest, [e.target.name]: value });
  };

  const handleSizeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFittest({...fittest, size: e.target.value });
  };

  const handleTasteThreshold= (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFittest({...fittest, tastethreshold: Number(e.target.value) });
  };

  const handleTestType= (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFittest({...fittest, testtype: e.target.value });
  };

  const handleEmployeeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const selectedEmployee = JSON.parse(selectedValue);
    setSelectedEmployee(selectedEmployee);
    setFittest({ ...fittest, employeeID: selectedEmployee.employeeID });
  };

  const handleRespiratorSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const selectedRespirator = JSON.parse(selectedValue);
    setSelectedRespirator(selectedRespirator);
    setFittest({ ...fittest, respiratorID: selectedRespirator.respiratorID });
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await qualitativefittestApi.createQualitativeData(fittest);
      console.log('Qualitative test created successfully');
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
        console.error('Error fetching Employee data:', error)
      }
    }
    const getRespiratorList = async () => {
      try{
        var respiratorList = await respiratorApi.getRespiratorData();
        setRespiratorList(respiratorList)
      }
      catch(error){
        console.error('Error fetching Respirator data:', error)
      }
    }
    getEmployeeList();
    getRespiratorList();
  },[])

  useEffect(()=> {
    if(fittest.exercise1 && fittest.exercise2 && fittest.exercise3 && fittest.exercise4){
      setFittest({...fittest, testpass: true})
    }
    else{
      setFittest({...fittest, testpass: false})
    }
  },[fittest.exercise1, fittest.exercise2, fittest.exercise3, fittest.exercise4])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">New Qualitative Fit Test</h2>
        <form onSubmit={handleSubmit}>
        {employeeList.length > 0 &&
         <div>
          <label className="block text-sm font-medium text-gray-700">Select Employee</label>
            <select
            value={selectedEmployee ? JSON.stringify(selectedEmployee) : ""}
              onChange={handleEmployeeSelect}
            >
              <option value=""></option>
              {employeeList.map((employee) => (
              <option key={employee.employeeID?.toString()} value={JSON.stringify(employee)}>
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
            value={selectedRespirator ? JSON.stringify(selectedRespirator) : ""}
            onChange={handleRespiratorSelect}
          >
            <option value=""></option>
            {respiratorList.map((respirator) => (
              <option key={respirator.respiratorID?.toString()} value={JSON.stringify(respirator)}>
                {`${respirator.make} ${respirator.model}`}
              </option>
            ))}
          </select>
          </div>
        }
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Respirator Size
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
            <option value="regular">Regular</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Test Type
          </label>
          <select
            value={fittest.testtype}
            name="size"
            onChange={handleTestType}
            className="mt-1 p-2 block w-full rounded-md border-gray-300"
            required
          >
            <option value="Saccharin">Saccharin</option>
            <option value="isoamylacetate">Isoamyl Acetate</option>
            <option value="bitrex">Bitrex (Denatonium Benzoate)</option>
            <option value="stannicchloride">Irritant Smoke (Stannic Chloride)</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Taste Threshold
          </label>
          <select
            value={fittest.tastethreshold}
            name="size"
            onChange={handleTasteThreshold}
            className="mt-1 p-2 block w-full rounded-md border-gray-300"
            required
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Fit Test Date
          </label>
          <input
            type="date"
            value={fittest.testdate.toISOString().split('T')[0]}
            name="testdate"
            onChange={handleDateChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Fit Test Time
          </label>
          <input
            type="time"
            value={formatTime(fittest.testtime)}
            name="testtime"
            onChange={handleTimeChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Expiration Date
          </label>
          <input
            type="date"
            value={fittest.testexpiration.toISOString().split('T')[0]}
            name="testexpiration"
            onChange={handleDateChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          {validation.exercise1 && (
            <p className="text-red-500 text-xs mt-1">{validation.exercise1}</p>
          )}
          <label className="block text-sm font-medium text-gray-700">Test 1</label>
          <select
            value={fittest.exercise1 !== undefined ? (fittest.exercise1 ? "pass" : "fail") : ""}
            name="exercise1"
            onChange={handleExercise}
            className="mt-1 p-2 block w-full rounded-md border-gray-300"
            required
          >
            <option value="">Select an option</option>
            <option value="pass">Pass</option>
            <option value="fail">Fail</option>
          </select>
        </div>
        <div className="mb-4">
          {validation.exercise2 && (
            <p className="text-red-500 text-xs mt-1">{validation.exercise2}</p>
          )}
          <label className="block text-sm font-medium text-gray-700">Test 2</label>
          <select
            value={fittest.exercise2 !== undefined ? (fittest.exercise2 ? "pass" : "fail") : ""}
            name="exercise2"
            onChange={handleExercise}
            className="mt-1 p-2 block w-full rounded-md border-gray-300"
            required
          >
            <option value="">Select an option</option>
            <option value="pass">Pass</option>
            <option value="fail">Fail</option>
          </select>
        </div>
        <div className="mb-4">
          {validation.exercise3 && (
            <p className="text-red-500 text-xs mt-1">{validation.exercise3}</p>
          )}
          <label className="block text-sm font-medium text-gray-700">Test 3</label>
          <select
            value={fittest.exercise3 !== undefined ? (fittest.exercise3 ? "pass" : "fail") : ""}
            name="exercise3"
            onChange={handleExercise}
            className="mt-1 p-2 block w-full rounded-md border-gray-300"
            required
          >
            <option value="">Select an option</option>
            <option value="pass">Pass</option>
            <option value="fail">Fail</option>
          </select>
        </div>
        <div className="mb-4">
          {validation.exercise4 && (
            <p className="text-red-500 text-xs mt-1">{validation.exercise4}</p>
          )}
          <label className="block text-sm font-medium text-gray-700">Test 4</label>
          <select
            value={fittest.exercise4 !== undefined ? (fittest.exercise4 ? "pass" : "fail") : ""}
            name="exercise4"
            onChange={handleExercise}
            className="mt-1 p-2 block w-full rounded-md border-gray-300"
            required
          >
            <option value="">Select an option</option>
            <option value="pass">Pass</option>
            <option value="fail">Fail</option>
          </select>
        </div>
        <div className="mb-4">
          {validation.testpass && (
            <p className="text-red-500 text-xs mt-1">{validation.testpass}</p>
          )}
          <label className="block text-sm font-medium text-gray-700">
            Overall Pass/Fail
          </label>
          <input
            type="text"
            value={fittest.testpass ? "Pass" : "Fail"}
            name="testpass"
            disabled
            className="mt-1 p-2 block w-full rounded-md border-gray-300"
            required
          />
        </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Create Qualitative Fit Test
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QualitativeFitTest;
