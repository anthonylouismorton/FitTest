import React,{ useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { QuantitativeFitTest } from '../interfaces';
import { quantitativefittestApi } from '../api/quantitativefittest/route'
import Link from 'next/link';

const QuantitativeFitTestCard: React.FC<{ quantitativefittest: QuantitativeFitTest }> = ({ quantitativefittest }) => {
  const handleDelete = async (id: number) => {
    try{
      await quantitativefittestApi.deleteQuantitative(Number(id));
    }catch(error){
      console.error("Error deleting Quantitative Fit Test:", error);
    }
  }

  return (
    <Card sx={{ width: 275, height: 250 }}>
      <CardContent>
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Make
        </Typography>
        <Typography variant="h6" component="div">
          {quantitativefittest.make}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          Model
        </Typography>
        <Typography variant="h6" component="div">
          {quantitativefittest.model}
        </Typography>
        <Typography  sx={{ fontSize: 14 }} color="text.secondary">
          Style
        </Typography> */}
      </CardContent>
      <div className='flex justify-evenly'>
          <div>
            <Link href={`/Respirator/${quantitativefittest.quantitativeTestID}`} passHref>
              <button className='text-blue-500 pl-2'>Edit</button>
            </Link>
          </div>
        <div>
        <button onClick={() => {
          if (quantitativefittest?.quantitativeTestID !== undefined) {
            handleDelete(quantitativefittest.quantitativeTestID);
          }
        }} className='text-blue-500 pl-2'>
          Archive
        </button>
        </div>
        </div>
    </Card>
  );
}

export default QuantitativeFitTestCard