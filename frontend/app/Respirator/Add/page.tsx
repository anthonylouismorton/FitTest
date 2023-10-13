"use client"
import React, { useState } from 'react';
import { respiratorApi } from '../../api/respirator/route';
import { Respirator } from '../../interfaces';
const Add = () => {
  const [respirator, setRespirator] = useState<Respirator>({
    make: "",
    model: "",
    style: "fullface",
    fitfactor: 500
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRespirator({
      ...respirator,
      [e.target.name]: e.target.value
    });
  };

  const handleStyleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const style: string = e.target.value;
    let fitfactor: number = Number(e.target.value);
    if(style === "fullface"){
      fitfactor = 500
    }
    else if(style === "halfface"){
      fitfactor = 100
    }
    else if(style === "gasmask"){
      fitfactor = 2000
    }
    else if(style === "ffd"){
      fitfactor = 100
    }

    setRespirator({...respirator, style: e.target.value, fitfactor: fitfactor });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await respiratorApi.createRespiratorData(respirator);
      console.log('Respirator data created successfully');
    } 
    catch (error) {
      console.error('Error creating respirator data:', error);
    }
  };
  console.log(respirator)
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Add Respirator</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Make
          </label>
          <input
            type="text"
            value={respirator.make}
            name="make"
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Model
          </label>
          <input
            type="text"
            value={respirator.model}
            name="model"
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Style
          </label>
          <select
            value={respirator.style}
            name="style"
            onChange={handleStyleSelect}
            className="mt-1 p-2 block w-full rounded-md border-gray-300"
            required
          >
            <option value="fullface">Full Face</option>
            <option value="halfface">Half Face</option>
            <option value="ffd">Filtering Facepiece</option>
            <option value="gasmask">Gas Mask</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Fit Factor
          </label>
          <input
            type="text"
            value={respirator.fitfactor}
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
              Create Respirator
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
