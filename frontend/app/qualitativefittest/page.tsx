import React from 'react';
import QualitativeFitTestCardContainer from './qualiativefittestcardcontainer';
import Link from 'next/link'
const QualitativeFitTest = () => {
  return (
    <div className='p-2'>
      <button className='bg-blue-500 p-2 rounded text-white'>
        <Link href='/Qualitativefittest/Add'>
          Add Qualitative Fit Test
        </Link>
      </button>
      <QualitativeFitTestCardContainer/>
    </div>
  );
};

export default QualitativeFitTest;
