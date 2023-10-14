import React from 'react';
import RespiratorCardContainer from './respiratorcardcontainer';
import Link from 'next/link'
const Respirator = () => {
  return (
    <div className='p-2'>
      <button className='bg-blue-500 p-2 rounded text-white'>
        <Link href='/Respirator/Add'>
          Add Respirator
        </Link>
      </button>
      <RespiratorCardContainer/>
    </div>
  );
};

export default Respirator;
