import React,{ useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Company } from '../interfaces';
import { companyApi } from '../api/company/route';
import Link from 'next/link';

const CompanyCard: React.FC<{ company: Company, onArchive: (company: Company) => void }> = ({ company, onArchive,}) => {
  const [archive, setArchive] = useState<boolean>(false)

  const handleArchive = async() => {
    const updatedCompany = { ...company, archived: true };
    try {
      await companyApi.updateCompany(Number(updatedCompany.companyID), updatedCompany);
      setArchive(false);
      onArchive(company);
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  }

  return (
    <Card sx={{ width: 375, height: 325 }}>
      {!archive ?
        <div>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Name
            </Typography>
            <Typography variant="h6" component="div">
              {company.name}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              Address
            </Typography>
            <Typography variant="h6" component="div">
            {company.address1}
            </Typography>
            <Typography variant="h6" component="div">
            {`${company.city}, ${company.state}, ${company.zipcode}`}
            </Typography>
            <Typography  sx={{ fontSize: 14 }} color="text.secondary">
              Phone Number
            </Typography>
            <Typography variant="h6" component="div">
              {company.phonenumber}
            </Typography>
            <Typography  sx={{ fontSize: 14 }} color="text.secondary">
              Email
            </Typography>
            <Typography variant="h6" component="div">
              {company.email}
            </Typography>
          </CardContent>
          <div>
          {!company.archived ?
            <div className='flex justify-evenly'>
              <div>
                <Link href={`/Company/Edit/${company.companyID}`} passHref>
                  <button className='text-blue-500 pl-2'>Edit</button>
                </Link>
              </div>
              <div>
                <Link href={`/Company/Info/${company.companyID}`} passHref>
                  <button className='text-blue-500 pl-2'>More Info</button>
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

export default CompanyCard