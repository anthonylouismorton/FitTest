"use client"
import React, { useState, useEffect } from 'react';
import { quantitativefittestApi } from '../../api/quantitativefittest/route';
import { respiratorApi } from '../../api/respirator/route';
import { QuantitativeFitTest, Respirator } from '../../interfaces';
import Link from 'next/link';
import { useRouter } from 'next/navigation'

const Edit = ({ params: { quantitativeTestID } } : { params: { quantitativeTestID: string } }) => {
  const router = useRouter();
  const [selectedRespirator, setSelectedRespirator] = useState<Respirator | undefined>(undefined);
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
    testpass: "",
  });

  const [fittest, setFittest] = useState<QuantitativeFitTest>({
    testpass: false,
    testdate: undefined,
    testexpiration: undefined,
    fitfactor1: 0,
    fitfactor2: 0,
    fitfactor3: 0,
    fitfactor4: 0,
    fitfactor5: 0,
    fitfactor6: 0,
    fitfactor7: 0,
    fitfactor8: 0,
    overallfitfactor: 0,
    testtype: "QNFT",
    employeeID: undefined,
    respiratorID: undefined,
    size: "Small"
  });
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    setFittest({ ...fittest, [e.target.name]: selectedDate });
  };
  
  const handleFitFactor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if(Number.isNaN(value)){
      setValidation({...validation, [e.target.name]: "Numbers Only"})
    }
    else if(e.target.value.length > 7){
      setValidation({...validation, [e.target.name]: "Fit Factor must be less than 7 digits"})
    }
    else{
      setValidation({...validation, [e.target.name]: undefined})
      setFittest({
        ...fittest,
        [e.target.name]: value
      });
    }
  };

  const handleSizeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFittest({...fittest, size: e.target.value });
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
      await quantitativefittestApi.updateQuantitativeFitTest(Number(fittest.quantitativeTestID), fittest);
      console.log('Quantitative test created successfully');
      router.push('/Quantitativefittest')
    } 
    catch (error) {
      console.error('Error creating fittest data:', error);
    }
  };

  useEffect(()=> {
    const getRespiratorList = async () => {
      try{
        var respiratorList = await respiratorApi.getRespiratorData();
        setRespiratorList(respiratorList)
      }
      catch(error){
        console.error('Error fetching Respirator data:', error)
      }
    }
    const getQuantFitTest = async() => {
      try{
        console.log(quantitativeTestID)
        var quantitativefittestInfo = await quantitativefittestApi.getQuantById(Number(quantitativeTestID))
         setFittest(quantitativefittestInfo)
      }catch(error){
        console.error('Error fetching Quantitative Fit Test data:', error)
      }
     }
     getQuantFitTest();
    getRespiratorList();
  },[])

  useEffect(()=> {
    var totalFitFactor = Math.round(
        (fittest.fitfactor1 +
          fittest.fitfactor2 +
          fittest.fitfactor3 +
          fittest.fitfactor4 +
          fittest.fitfactor5 +
          fittest.fitfactor6 +
          fittest.fitfactor7 +
          fittest.fitfactor8) /
          8
      );
  
    const updatedFittest = { ...fittest, overallfitfactor: totalFitFactor };
    setFittest(updatedFittest);
  
    const minFitFactor = Number(selectedRespirator?.fitfactor);
  
    if (selectedRespirator) {
      if (minFitFactor > totalFitFactor) {
        setValidation({
          ...validation,
          testpass: `Overall Fit Factor must be above ${selectedRespirator?.fitfactor}`,
        });
        setFittest({ ...updatedFittest, testpass: false });
      } else {
        setValidation({ ...validation, testpass: "" });
        setFittest({ ...updatedFittest, testpass: true });
      }
    }

  },[fittest.fitfactor1, fittest.fitfactor2, fittest.fitfactor3, fittest.fitfactor4, fittest.fitfactor5, fittest.fitfactor6, fittest.fitfactor7, fittest.fitfactor8, selectedRespirator])
  console.log(fittest.testdate)
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Edit Quantitative Fit Test</h2>
        <form onSubmit={handleSubmit}>
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
            Fit Test Date
          </label>
          <input
            type="date"
            value={fittest.testdate ? new Date(fittest.testdate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
            name="testdate"
            onChange={handleDateChange}
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
            value={fittest.testexpiration ? new Date(fittest.testexpiration).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
            name="testexpiration"
            onChange={handleDateChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300"
            required
          />
        </div>
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
          {validation.testpass && (
            <p className="text-red-500 text-xs mt-1">{validation.testpass}</p>
          )}
          <label className="block text-sm font-medium text-gray-700">
            Overall Fit Factor
          </label>
          <input
            type="text"
            value={fittest.overallfitfactor}
            name="fitfactor8"
            disabled
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
        <div className='flex justify-between'>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Edit
            </button>
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              <Link href='/Quantitativefittest'>
                Cancel
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
