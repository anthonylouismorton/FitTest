import React from 'react';
import { useRouter } from 'next/navigation';
import { Employee } from '@/app/interfaces';

const QuantitativeFitTestTable = ({ employee, setQuantOpen, setSelectedQuantitativeFitTest } : { employee: Employee; setQuantOpen: React.Dispatch<React.SetStateAction<boolean>>; setSelectedQuantitativeFitTest: React.Dispatch<React.SetStateAction<number | undefined>> }) => {
  const router = useRouter();
  console.log(employee)
  return (
    <div className="flex flex-col mt-4 w-full">
      <div className="flex w-full items-center justify-center">
          <h1 className="font-bold text-2xl text-center mr-2">Quantitative Fit Tests</h1>
          <button className='text-blue-500' 
            onClick={()=> {router.push(`/Quantitativefittest/add`)}}
            title="Click to add new Quantitative Fit Test"
            >
              Add
          </button>
        </div>
      <table className='w-full mt-4 shadow'>
        <thead className="border-b font-medium dark:border-neutral-500">
          <tr>
            <th scope="col" className="px-6 py-4">Fit Factor</th>
            <th scope="col" className="px-6 py-4">Pass</th>
            <th scope="col" className="px-6 py-4">Respirator</th>
            <th scope="col" className="px-6 py-4">Size</th>
            <th scope="col" className="px-6 py-4">Date</th>
            <th scope="col" className="px-6 py-4">Expiration</th>
          </tr>
        </thead>
        <tbody>
          {employee.quantitativeRespiratorFitTests?.map((quantfittest, index) => (
            <tr 
             key={quantfittest.quantitativeTestID}
             className={index % 2 === 0 ? "border-b dark:border-neutral-500 bg-gray-300 cursor-pointer hover:bg-gray-400" : "border-b dark:border-neutral-500 bg-gray-100 cursor-pointer hover:bg-gray-400"}
             title="Click for more info"
             onClick={() => {
              setQuantOpen(true);
              setSelectedQuantitativeFitTest(quantfittest?.quantitativeTestID ?? undefined);
            }}
             >
              <td className="whitespace-nowrap px-6 py-4 text-center">{quantfittest.overallfitfactor}</td>
              <td className="whitespace-nowrap px-6 py-4 text-center">{quantfittest.testpass ? "Yes" : "No"}</td>
              <td className="whitespace-nowrap px-6 py-4 text-center">{`${quantfittest.respirator?.make} ${quantfittest.respirator?.model}`}</td>
              <td className="whitespace-nowrap px-6 py-4 text-center">{quantfittest.size}</td>
              <td className="whitespace-nowrap px-6 py-4 text-center">{quantfittest?.testdate ? quantfittest.testdate.toString().split('T')[0] : 'N/A'}</td>
              <td className="whitespace-nowrap px-6 py-4 text-center">{quantfittest?.testexpiration ? quantfittest.testexpiration.toString().split('T')[0] : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default QuantitativeFitTestTable;