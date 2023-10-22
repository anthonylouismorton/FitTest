"use client"
import React, { useState, useEffect } from 'react';
import { companyApi } from '../../../api/company/route';
import { Company } from '../../../interfaces';
import Link from 'next/link';
import { useRouter } from 'next/navigation'


const Edit = ({ params: { companyID } } : { params: { companyID: string } }) => {
  const router = useRouter();
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if(company.companyID){
        await companyApi.updateCompany(company.companyID, company);
        router.back();
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
  
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      {company.companyID &&
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h3 className="text-2xl font-semibold mb-4 text-center">Edit Company</h3>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-md font-medium text-black">
            Name
          </label>
          <input
            type="text"
            value={company.name}
            name="name"
            className="mt-1 p-2 block w-full rounded-md shadow"
            required
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block text-md font-medium text-black">
            Address 1
          </label>
          <input
            type="text"
            value={company.address1}
            name="address1"
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md shadow"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-md font-medium text-black">
            Address 2
          </label>
          <input
            type="text"
            value={company.address2}
            name="address2"
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md shadow"
          />
        </div>
        <div className="mb-4">
          <label className="block text-md font-medium text-black">
            Address 3
          </label>
          <input
            type="text"
            value={company.address3}
            name="address3"
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md shadow"
          />
        </div>
        <div className="mb-4">
          <label className="block text-md font-medium text-black">
            City
          </label>
          <input
            type="text"
            value={company.city}
            name="city"
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md shadow"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-md font-medium text-black">
            State
          </label>
          <input
            type="text"
            value={company.state}
            name="state"
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md shadow"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-md font-medium text-black">
            Zip Code
          </label>
          <input
            type="text"
            value={company.zipcode}
            name="zipcode"
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md shadow"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-md font-medium text-black">
            Email
          </label>
          <input
            type="text"
            value={company.email}
            name="email"
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md shadow"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-md font-medium text-black">
            Alternate Email
          </label>
          <input
            type="text"
            value={company.altemail}
            name="altemail"
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md shadow"
          />
        </div>
        <div className="mb-4">
          <label className="block text-md font-medium text-black">
            Phone Number
          </label>
          <input
            type="text"
            value={company.phonenumber}
            name="phonenumber"
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md shadow"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-md font-medium text-black">
            Ext
          </label>
          <input
            type="text"
            value={company.phonenumberext}
            name="phonenumberext"
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md shadow"
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
