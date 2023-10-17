import React,{ useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { QualitativeFitTest } from '../interfaces';
import { qualitativefittestApi } from '../api/qualitativefittest/route'
import Link from 'next/link';

const QualitativeFitTestCard: React.FC<{ qualitativefittest: QualitativeFitTest, onDelete: (qualitativefittest: QualitativeFitTest) => void }> = ({ qualitativefittest, onDelete }) => {
  const [showDelete, setShowDelete] = useState<boolean>(false)
  const handleDelete = async () => {
    try{
      await qualitativefittestApi.deleteQualitative(Number(qualitativefittest.qualitativeTestID));
      onDelete(qualitativefittest);
    }catch(error){
      console.error("Error deleting Qualitative Fit Test:", error);
    }
  }
  console.log(qualitativefittest.qualitativeTestID)
  return (
    <Card sx={{ width: 275, height: 300 }}>
      {!showDelete ? (
      <div>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Name
          </Typography>
          <Typography variant="h6" component="div">
            {qualitativefittest?.employee?.firstname || ''} {qualitativefittest?.employee?.lastname || ''}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            Respirator
          </Typography>
          <Typography variant="h6" component="div">
            {qualitativefittest?.respirator?.make || ''} {qualitativefittest?.respirator?.model || ''}
          </Typography>
          <Typography  sx={{ fontSize: 14 }} color="text.secondary">
            Test Type
          </Typography>
          <Typography variant="h6" component="div">
            {qualitativefittest.testtype}
          </Typography>
          <Typography  sx={{ fontSize: 14 }} color="text.secondary">
            Pass
          </Typography>
          <Typography variant="h6" component="div">
            {qualitativefittest.testpass ? "Yes" : "No"}
          </Typography>
        </CardContent>
        <div className='flex justify-evenly'>
          <div>
            <Link href={`/Qualitativefittest/${qualitativefittest.qualitativeTestID}`} passHref>
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

export default QualitativeFitTestCard