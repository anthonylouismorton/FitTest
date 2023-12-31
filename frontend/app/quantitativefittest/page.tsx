import React from 'react';
import QuantitativeFitTestCardContainer from './quantitativefittestcardcontainer';
import Link from 'next/link'
const QuantitativeFitTest = () => {
  return (
    <div className='p-2'>
      <button className='bg-blue-500 p-2 rounded text-white'>
        <Link href='/Quantitativefittest/Add'>
          Add Quantitative Fit Test
        </Link>
      </button>
      <QuantitativeFitTestCardContainer/>
    </div>
  );
};

export default QuantitativeFitTest;
