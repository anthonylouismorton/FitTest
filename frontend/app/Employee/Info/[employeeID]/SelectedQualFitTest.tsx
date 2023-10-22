import React from 'react';
import { Employee } from '@/app/interfaces';
import Link from 'next/link';

export default function SelectedQualFitTest({ setShowQualFitTest, employee, fitTestID }: { setShowQualFitTest: React.Dispatch<React.SetStateAction<boolean>>; employee: Employee; fitTestID?: number }) {
  const fittest = employee.qualitativeRespiratorFitTests?.find((f) => f.qualitativeTestID === fitTestID);

  return (
    <div className=" mt-4 bg-white p-8 rounded-lg shadow-md w-full flex flex-col justify-center">
      <div className="flex flex-row items-center justify-center w-full mb-4">
        <h2 className="text-2xl font-semibold mr-2">Qualitative Fit Test Information</h2>
        <Link href={`/Qualitativefittest/Edit/${fitTestID}`} passHref>
          <button className="text-blue-500">Edit</button>
        </Link>
      </div>
      <div className='flex flex-wrap justify-start'>
        <div className="mb-4 w-60 flex flex-col text-center ">
          <div className='font-bold text-xl mb-1'>Respirator</div>
          <div>{`${fittest?.respirator?.make} ${fittest?.respirator?.model}`}</div>
        </div>
        <div className="mb-4 w-60 flex flex-col text-center ">
          <div className='font-bold text-xl mb-1'>Style</div>
          {fittest?.respirator?.style === 'halfface' ? (
          <div>
            Half Face
          </div>
          ): fittest?.respirator?.style === 'fullface' ? (
          <div>
            Full Face
          </div>
          ): fittest?.respirator?.style === 'gasmask' ? (
          <div>
            Gas Mask
          </div>
          ):(
          <div>
            Filtering Facepiece
          </div>
          )}
        </div>
        <div className="mb-4 w-60 flex flex-col text-center ">
          <div className='font-bold text-xl mb-1'>Test Type</div>
          <div>{fittest?.testtype}</div>
        </div>
        <div className="mb-4 w-60 flex flex-col text-center ">
          <div className='font-bold text-xl mb-1'>Pass</div>
          <div>{fittest?.testpass ? "Yes" : "No"}</div>
        </div>
        <div className="mb-4 w-60 flex flex-col text-center ">
          <div className='font-bold text-xl mb-1'>Test Date</div>
          <div>{fittest?.testdate?.toString().split('T')[0]}</div>
        </div>
        <div className="mb-4 w-60 flex flex-col text-center ">
          <div className='font-bold text-xl mb-1'>Expiration</div>
          <div>{fittest?.testexpiration?.toString().split('T')[0]}</div>
        </div>
        <div className="mb-4 w-60 flex flex-col text-center ">
          <div className='font-bold text-xl mb-1'>Size</div>
          <div>{fittest?.size}</div>
        </div>
      </div>
      <div className='flex justify-center'>
        <button className='bg-blue-500 p-2 rounded text-white' onClick={() => setShowQualFitTest(false)}>
          Back to List
        </button>
      </div>
    </div>
  );  
};
