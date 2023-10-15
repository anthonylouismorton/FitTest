import React from 'react';
import CompanyCardContainer from './companycardcontainer';
import Link from 'next/link'
const Company = () => {
  return (
    <div className='p-2'>
      <button className='bg-blue-500 p-2 rounded text-white'>
        <Link href='/Company/Add'>
          Add Company
        </Link>
      </button>
      <CompanyCardContainer/>
    </div>
  );
};

export default Company;
