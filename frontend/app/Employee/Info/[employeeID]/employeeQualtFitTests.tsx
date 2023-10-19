import React from 'react'
import { useRouter } from 'next/navigation';
import { Employee } from '../../../interfaces';
const QualitativeFitTestTable = ({ employee } : { employee: Employee}) => {
  const router = useRouter();
  
  return (
    <div className="flex flex-col mt-4 w-full">
      <div className="flex w-full items-center justify-center">
          <h1 className="font-bold text-2xl text-center mr-2">Qualitative Fit Tests</h1>
          <button className='text-blue-500' 
            onClick={()=> {router.push(`/Qualitativefittest/add`)}}
            title="Click to add new Qualitative Fit Test"
            >
              Add
          </button>
        </div>
      <table className='w-full mt-4 shadow'>
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th scope="col" className="px-6 py-4">Test Type</th>
            <th scope="col" className="px-6 py-4">Pass</th>
            <th scope="col" className="px-6 py-4">Respirator</th>
            <th scope="col" className="px-6 py-4">Size</th>
            <th scope="col" className="px-6 py-4">Date</th>
            <th scope="col" className="px-6 py-4">Expiration</th>
          </tr>
        </thead>
        <tbody>
          {employee.qualitativeRespiratorFitTests?.map((qualfittest, index) => (
            <tr 
             key={qualfittest.qualitativeTestID}
             className={index % 2 === 0 ? "border-b dark:border-neutral-500 bg-gray-300 cursor-pointer hover:bg-gray-400" : "border-b dark:border-neutral-500 bg-gray-100 cursor-pointer hover:bg-gray-400"}
             title="Click for more info"
             onClick={()=> router.push(`/Qualitativefittest/Info/${qualfittest.qualitativeTestID}`)} 
             >
              <td className="whitespace-nowrap px-6 py-4 text-center">{qualfittest.testtype}</td>
              <td className="whitespace-nowrap px-6 py-4 text-center">{qualfittest.testpass ? "Yes" : "No"}</td>
              <td className="whitespace-nowrap px-6 py-4 text-center">{`${qualfittest.respirator?.make} ${qualfittest.respirator?.model}`}</td>
              <td className="whitespace-nowrap px-6 py-4 text-center">{qualfittest.size}</td>
              <td className="whitespace-nowrap px-6 py-4 text-center">{qualfittest?.testdate ? qualfittest.testdate.toString().split('T')[0] : 'N/A'}</td>
              <td className="whitespace-nowrap px-6 py-4 text-center">{qualfittest?.testexpiration ? qualfittest.testexpiration.toString().split('T')[0] : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default QualitativeFitTestTable;