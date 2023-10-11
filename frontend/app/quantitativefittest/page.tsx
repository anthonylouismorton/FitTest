"use client"
import React, { useState } from 'react';
import { quantitativefittestApi } from '../api/quantitativefittest/route';
const QuantitativeFitTest = () => {
  const [fittest, setFittest] = useState({
    quantitativeTestID: "",
    testpass: "",
    testdate: "",
    testtime: "",
    testexpiration: "",
    fitfactor1: "",
    fitfactor2: "",
    fitfactor3: "",
    fitfactor4: "",
    fitfactor5: "",
    fitfactor6: "",
    fitfactor7: "",
    fitfactor8: "",
    overallfitfactor: "",
    employeeID: "",
    respiratorID: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFittest({
      ...fittest,
      [e.target.name]: e.target.value
    });
  };

  const handleStyleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let style = e.target.value;
    let fitfactor ='';
    console.log(style)
    if(style === "fullface"){
      fitfactor = "500"
    }
    else if(style === "halfface"){
      fitfactor = "100"
    }
    else if(style === "gasmask"){
      fitfactor = "2000"
    }
    else if(style === "ffd"){
      fitfactor = "100"
    }

    setFittest({...fittest });
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
  console.log(fittest)
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Add Respirator</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Fit Factor 1
          </label>
          <input
            type="text"
            value={fittest.fitfactor1}
            name="make"
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Fit Factor 2
          </label>
          <input
            type="text"
            value={fittest.fitfactor2}
            name="model"
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Fit Factor
          </label>
          <input
            type="text"
            value={fittest.fitfactor3}
            name="fitfactor"
            disabled
            className="mt-1 p-2 block w-full rounded-md border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Fit Factor
          </label>
          <input
            type="text"
            value={fittest.fitfactor4}
            name="fitfactor"
            disabled
            className="mt-1 p-2 block w-full rounded-md border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Fit Factor
          </label>
          <input
            type="text"
            value={fittest.fitfactor5}
            name="fitfactor"
            disabled
            className="mt-1 p-2 block w-full rounded-md border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Fit Factor
          </label>
          <input
            type="text"
            value={fittest.fitfactor6}
            name="fitfactor"
            disabled
            className="mt-1 p-2 block w-full rounded-md border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Fit Factor
          </label>
          <input
            type="text"
            value={fittest.fitfactor7}
            name="fitfactor"
            disabled
            className="mt-1 p-2 block w-full rounded-md border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Fit Factor
          </label>
          <input
            type="text"
            value={fittest.fitfactor8}
            name="fitfactor"
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
              Create Quantitative Fit Test
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuantitativeFitTest;
