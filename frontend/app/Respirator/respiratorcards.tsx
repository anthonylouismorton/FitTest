import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Respirator } from '../interfaces';
import Link from 'next/link';

interface RespiratorCardProps {
  respirator: Respirator;
}

const RespiratorCard: React.FC<RespiratorCardProps> = ({ respirator }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Make
        </Typography>
        <Typography variant="h5" component="div">
          {respirator.make}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          Model
        </Typography>
        <Typography variant="h5" component="div">
          {respirator.model}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          Style
        </Typography>
        <Typography variant="h5" component="div">
          {respirator.style}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/Respirator/${respirator.respiratorID}`} passHref>
          <button className='text-blue-500 pl-2'>Edit</button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default RespiratorCard