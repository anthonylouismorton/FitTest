import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Employee, QuantitativeFitTest } from '@/app/interfaces';
import Link from 'next/link';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function QuantitativeFitTestModal({ open, setOpen, employee, fitTestID }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>>; employee: Employee; fitTestID?: number }) {
  const fittest = employee.quantitativeRespiratorFitTests?.find((f) => f.quantitativeTestID === fitTestID);
  const handleClose = () => setOpen(false);
  console.log(fittest)
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-400 bg-white border-2 border-black shadow-md p-4">
          <div className="flex flex-row items-center justify-center w-full mb-4">
            <h2 className="text-2xl font-semibold mr-2">{`${employee.firstname} ${employee.lastname} Details`}</h2>
            <Link href={`/Employee/Edit/${employee.employeeID}`} passHref>
              <button className="text-blue-500">Edit</button>
            </Link>
          </div>
          <div className='flex flex-wrap justify between'>
            <div className="mb-4 w-72">
              <div className='font-bold text-xl mb-1'>Name</div>
              <div>{`${employee.firstname} ${employee.middlename} ${employee.lastname}`}</div>
            </div>
            {/* ... (rest of your content) */}
          </div>
        </div>
      </Modal>
    </div>
  );  
};
