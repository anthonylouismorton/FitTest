"use client"
import React, { useState, useEffect } from 'react'
import CompanyCard from './companycard'
import { companyApi } from '../api/company/route'
import { Company } from '../interfaces'

export default function CompanyCardContainer() {
  const [companyList, setCompanyList] = useState<Company[]>([]);
  const [archivedRecords, setArchivedRecords] = useState(false)
  const handleArchiveCompany = async () => {
    var updatedList = await companyApi.getCompanyData();
    setCompanyList(updatedList)
 
  };

  useEffect(() => {
    const getCompanyList = async () => {
      try{
        var companyList = await companyApi.getCompanyData(archivedRecords);
        setCompanyList(companyList)
      }
      catch(error){
        console.error('Error fetching Company data:', error)
      }
    }
    getCompanyList();
  }, [archivedRecords])

  return(
    <div>
      <div className='pb-2'>
        <input type='checkbox' checked={archivedRecords} onChange={()=> setArchivedRecords(!archivedRecords)}/>
        <label className='pl-2'>Include Archived Companies</label>
      </div>
      <div className="pt-2 flex flex-wrap space-x-4 space-y-4 items-end">
        {companyList.map((company) => (
          <CompanyCard key={company.companyID} company={company} onArchive={handleArchiveCompany}/>
        ))}
      </div>
    </div>
  )
  
}