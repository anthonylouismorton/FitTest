"use client"
import React, { useState } from 'react';
import { respiratorApi } from '../../api/respirator/route';
import { Respirator } from '../../interfaces';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
const Add = () => {
  const router = useRouter();
  const [respirator, setRespirator] = useState<Respirator>({
    make: "",
    model: "",
    style: "fullface",
    fitfactor: 500,
    archived: false
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
      router.push('/Respirator');
    } 
    catch (error) {
      console.error('Error creating respirator data:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h3 className="text-2xl font-semibold mb-4 text-center">Add Respirator</h3>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-md font-medium text-black">
            Make
          </label>
          <input
            type="text"
            value={respirator.make}
            name="make"
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md shadow"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-md font-medium text-black">
            Model
          </label>
          <input
            type="text"
            value={respirator.model}
            name="model"
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md shadow"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-md font-medium text-black">
            Style
          </label>
          <select
            value={respirator.style}
            name="style"
            onChange={handleStyleSelect}
            className="mt-1 p-2 block w-full rounded-md shadow"
            required
          >
            <option value="fullface">Full Face</option>
            <option value="halfface">Half Face</option>
            <option value="ffd">Filtering Facepiece</option>
            <option value="gasmask">Gas Mask</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-md font-medium text-black">
            Fit Factor
          </label>
          <input
            type="text"
            value={respirator.fitfactor}
            name="fitfactor"
            disabled
            className="mt-1 p-2 block w-full rounded-md shadow"
            required
          />
        </div>
          <div className='flex justify-between'>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Create
            </button>
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              <Link href='/Respirator'>
                Cancel
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
