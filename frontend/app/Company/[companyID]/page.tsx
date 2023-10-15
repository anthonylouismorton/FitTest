"use client"
import React, { useState, useEffect } from 'react';
import { companyApi } from '../../api/company/route';
import { Company } from '../../interfaces';
import Link from 'next/link';

const Edit = ({ params: { companyID } } : { params: { companyID: string } }) => {
  const [company, setCompany] = useState<Company>({
    companyID: undefined,
    name: undefined,
    address1: undefined,
    address2: undefined,
    address3: undefined,
    city: undefined,
    state: undefined,
    zipcode: undefined,
    email: undefined,
    altemail: undefined,
    phonenumber: undefined,
    phonenumberext: undefined
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompany({
      ...company,
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

    setCompany({...company, style: e.target.value, fitfactor: fitfactor });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if(company.companyID){
        await companyApi.updateCompany(company.companyID, company);
        console.log('Company updated successfully');
      }
    } 
    catch (error) {
      console.error('Error creating company data:', error);
    }
  };
  useEffect(() => {
    try{
      const getCompany = async() =>{
       var companyInfo = await companyApi.getCompanyById(Number(companyID))
        setCompany(companyInfo)
      }
      getCompany();
    }catch(error){
      console.log(error)
    }
  }, [])
  console.log(company)
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      {company.companyID &&
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h3 className="text-2xl font-semibold mb-4 text-center">Edit Company</h3>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-md font-medium text-black">
            Make
          </label>
          <input
            type="text"
            value={company.make}
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
            value={company.model}
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
            value={company.style}
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
            value={company.fitfactor}
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
              Edit
            </button>
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              <Link href='/Company'>
                Cancel
              </Link>
            </button>
          </div>
        </form>
      </div>
    }
    </div>
  );
};

export default Edit;
