import React,{ useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Respirator } from '../interfaces';
import { respiratorApi } from '../api/respirator/route';
import Link from 'next/link';

const RespiratorCard: React.FC<{ respirator: Respirator, onArchive: (respirator: Respirator) => void }> = ({ respirator, onArchive }) => {
  const [archive, setArchive] = useState<boolean>(false)

  const handleArchive = async() => {
    const updatedRespirator = { ...respirator, archived: true };
    try {
      await respiratorApi.updateRespirator(Number(updatedRespirator.respiratorID), updatedRespirator);
      setArchive(false);
      onArchive(respirator);
    } catch (error) {
      console.error("Error deleting respirator:", error);
    }
  }

  return (
    <Card sx={{ width: 275, height: 250 }}>
      {!archive ?
      <div>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Make
        </Typography>
        <Typography variant="h6" component="div">
          {respirator.make}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          Model
        </Typography>
        <Typography variant="h6" component="div">
          {respirator.model}
        </Typography>
        <Typography  sx={{ fontSize: 14 }} color="text.secondary">
          Style
        </Typography>
        {respirator.style === 'halfface' ? (
        <Typography variant="h6" component="div">
          Half Face
        </Typography>
        ): respirator.style === 'fullface' ? (
        <Typography variant="h6" component="div">
          Full Face
        </Typography>
        ): respirator.style === 'gasmask' ? (
        <Typography variant="h6" component="div">
          Gas Mask
        </Typography>
        ):(
        <Typography variant="h6" component="div">
          Filtering Facepiece
        </Typography>
        )}
      </CardContent>
      <div>
        {!respirator.archived ?
        <div className='flex justify-evenly'>
          <div>
            <Link href={`/Respirator/${respirator.respiratorID}`} passHref>
              <button className='text-blue-500 pl-2'>Edit</button>
            </Link>
          </div>
        <div>
          <button onClick={()=> (setArchive(true))} className='text-blue-500 pl-2'>Archive</button>
        </div>
        </div>
        :
        <div className='flex justify-center'>
        <p className='text-gray-400'>Archived</p>
        </div>
        }
      </div>
      </div>
      :
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
          <button onClick={handleArchive} className='text-blue-500 pl-2'>Yes</button>
        </div>
        <div>
          <button onClick={()=> (setArchive(false))} className='text-red-800 pl-2'>Cancel</button>
        </div>
      </div>
      </div>
      }
    </Card>
  );
}

export default RespiratorCard