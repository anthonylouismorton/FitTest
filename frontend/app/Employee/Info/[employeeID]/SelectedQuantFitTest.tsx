import React from 'react';
import { Employee } from '@/app/interfaces';
import Link from 'next/link';

export default function SelectedQuantFitTest({ setShowQuantFitTest, employee, fitTestID }: { setShowQuantFitTest: React.Dispatch<React.SetStateAction<boolean>>; employee: Employee; fitTestID?: number }) {
  const fittest = employee.quantitativeRespiratorFitTests?.find((f) => f.quantitativeTestID === fitTestID);

  return (
    <div className=" mt-4 bg-white p-8 rounded-lg shadow-md w-full flex flex-col justify-center">
      <div className="flex flex-row items-center justify-center w-full mb-4">
        <h2 className="text-2xl font-semibold mr-2">Quantitative Fit Test Information</h2>
        <Link href={`/Quantitativefittest/Edit/${fitTestID}`} passHref>
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
        <div className="mb-4 w-60 flex flex-col text-center ">
          <div className='font-bold text-xl mb-1'>Minimum Fit Factor</div>
          <div>{fittest?.respirator?.fitfactor}</div>
        </div>
        <div className="mb-4 w-60 flex flex-col text-center ">
          <div className='font-bold text-xl mb-1'>Overall Fit Factor</div>
          <div>{fittest?.overallfitfactor}</div>
        </div>
        <div className="mb-4 w-60 flex flex-col text-center ">
          <div className='font-bold text-xl mb-1'>Pass</div>
          <div>{fittest?.testpass ? 'Yes' : "No"}</div>
        </div>
        <div className="mb-4 w-60 flex flex-col text-center ">
          <div className='font-bold text-xl mb-1'>Fit Factor 1</div>
          <div>{fittest?.fitfactor1}</div>
        </div>
        <div className="mb-4 w-60 flex flex-col text-center ">
          <div className='font-bold text-xl mb-1'>Fit Factor 2</div>
          <div>{fittest?.fitfactor2}</div>
        </div>
        <div className="mb-4 w-60 flex flex-col text-center ">
          <div className='font-bold text-xl mb-1'>Fit Factor 3</div>
          <div>{fittest?.fitfactor3}</div>
        </div>
        <div className="mb-4 w-60 flex flex-col text-center ">
          <div className='font-bold text-xl mb-1'>Fit Factor 4</div>
          <div>{fittest?.fitfactor4}</div>
        </div>
        <div className="mb-4 w-60 flex flex-col text-center ">
          <div className='font-bold text-xl mb-1'>Fit Factor 5</div>
          <div>{fittest?.fitfactor5}</div>
        </div>
        <div className="mb-4 w-60 flex flex-col text-center ">
          <div className='font-bold text-xl mb-1'>Fit Factor 6</div>
          <div>{fittest?.fitfactor6}</div>
        </div>
        <div className="mb-4 w-60 flex flex-col text-center ">
          <div className='font-bold text-xl mb-1'>Fit Factor 7</div>
          <div>{fittest?.fitfactor7}</div>
        </div>
        <div className="mb-4 w-60 flex flex-col text-center ">
          <div className='font-bold text-xl mb-1'>Fit Factor 8</div>
          <div>{fittest?.fitfactor8}</div>
        </div>
      </div>
      <div className='flex justify-center'>
        <button className='bg-blue-500 p-2 rounded text-white' onClick={() => setShowQuantFitTest(false)}>
          Back to List
        </button>
      </div>
    </div>
  );  
};
