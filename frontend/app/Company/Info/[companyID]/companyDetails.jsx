import React from 'react';
import Link from 'next/link';

const CompanyDetails = ({company}) => {

  return (
    <div className="flex justify-center w-full">
      <div className="bg-white p-8 rounded-lg shadow-md w-full">
      <div className="flex flex-row items-center justify-center w-full mb-4">
        <h2 className="text-2xl font-semibold mr-2">{`${company.name} Details`}</h2>
        <Link href={`/Company/Edit/${company.companyID}`} passHref>
          <button className="text-blue-500">Edit</button>
        </Link>
      </div>
        <div className='flex flex-wrap justify-between'>
          <div className="mb-4 w-72">
            <div className='font-bold text-xl mb-1'>Address</div>
            <div>{company.address1}</div>
          </div>
          <div className="mb-4 w-72">
            <div className='font-bold text-xl mb-1'>Address 2</div>
            <div>{company.address2 ? company.address2 : "N/A"}</div>
          </div>
          <div className="mb-4 w-72">
            <div className='font-bold text-xl mb-1'>Address 3</div>
            <div>{company.address3 ? company.address3 : "N/A"}</div>
          </div>
          <div className="mb-4 w-72">
            <div className='font-bold text-xl mb-1'>City</div>
            <div>{company.city}</div>
          </div>
          <div className="mb-4 w-72">
            <div className='font-bold text-xl mb-1'>State</div>
            <div>{company.state}</div>
          </div>
          <div className="mb-4 w-72">
            <div className='font-bold text-xl mb-1'>Zip Code</div>
            <div>{company.zipcode}</div>
          </div>
          <div className="mb-4 w-72">
            <div className='font-bold text-xl mb-1'>Email</div>
            <div>{company.email}</div>
          </div>
          <div className="mb-4 w-72">
            <div className='font-bold text-xl mb-1'>Alternate Email</div>
            <div>{company.altemail}</div>
          </div>
          <div className="mb-4 w-72">
            <div className='font-bold text-xl mb-1'>Phone Number</div>
            <div>{company.phonenumber}</div>
          </div>
          <div className="mb-4 w-72">
            <div className='font-bold text-xl mb-1'>Extension</div>
            <div>{company.phonnumberext ? company.phonnumberext : "N/A"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
