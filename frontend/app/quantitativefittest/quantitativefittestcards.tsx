import React,{ useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { QuantitativeFitTest } from '../interfaces';
import { quantitativefittestApi } from '../api/quantitativefittest/route'
import Link from 'next/link';

const QuantitativeFitTestCard: React.FC<{ quantitativefittest: QuantitativeFitTest, onDelete: (quantitativefittest: QuantitativeFitTest) => void }> = ({ quantitativefittest, onDelete }) => {
  const [showDelete, setShowDelete] = useState<boolean>(false)
  const handleDelete = async () => {
    try{
      await quantitativefittestApi.deleteQuantitative(Number(quantitativefittest.quantitativeTestID));
      onDelete(quantitativefittest);
    }catch(error){
      console.error("Error deleting Quantitative Fit Test:", error);
    }
  }
  console.log(quantitativefittest.quantitativeTestID)
  return (
    <Card sx={{ width: 275, height: 300 }}>
      {!showDelete ? (
      <div>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Name
          </Typography>
          <Typography variant="h6" component="div">
            {quantitativefittest?.employee?.firstname || ''} {quantitativefittest?.employee?.lastname || ''}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            Respirator
          </Typography>
          <Typography variant="h6" component="div">
            {quantitativefittest?.respirator?.make || ''} {quantitativefittest?.respirator?.model || ''}
          </Typography>
          <Typography  sx={{ fontSize: 14 }} color="text.secondary">
            Overall Fit Factor
          </Typography>
          <Typography variant="h6" component="div">
            {quantitativefittest.overallfitfactor}
          </Typography>
          <Typography  sx={{ fontSize: 14 }} color="text.secondary">
            Pass
          </Typography>
          <Typography variant="h6" component="div">
            {quantitativefittest.testpass ? "Yes" : "No"}
          </Typography>
        </CardContent>
        <div className='flex justify-evenly'>
          <div>
            <Link href={`/Quantitativefittest/${quantitativefittest.quantitativeTestID}`} passHref>
              <button className='text-blue-500 pl-2'>Edit</button>
            </Link>
          </div>
          <div>
            <button onClick={() => setShowDelete(!showDelete)} className='text-blue-500 pl-2'>
              Delete
            </button>
          </div>
        </div>
      </div>
      )
      :
      (
        <div>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Are you sure?
            </Typography>
            <Typography sx={{ fontSize: 16 }}>
              This action can't be undone.
            </Typography>
          </CardContent>
          <div className='flex justify-evenly pb-1'>
            <div>
              <button onClick={handleDelete} className='text-blue-500 pl-2'>Yes</button>
            </div>
            <div>
              <button onClick={()=> (setShowDelete(false))} className='text-red-800 pl-2'>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

export default QuantitativeFitTestCard