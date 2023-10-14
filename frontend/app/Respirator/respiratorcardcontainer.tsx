"use client"
import React, { useState, useEffect } from 'react'
import RespiratorCard from './respiratorcards'
import { respiratorApi } from '../api/respirator/route'
import { Respirator } from '../interfaces'

export default function RespiratorCardContainer() {
  const [respiratorList, setRespiratorList] = useState<Respirator[]>([]);
  const [archivedRecords, setArchivedRecords] = useState(false)
  const handleArchiveRespirator = async () => {
    var updatedList = await respiratorApi.getRespiratorData();
    setRespiratorList(updatedList)
 
  };

  useEffect(() => {
    const getRespiratorList = async () => {
      try{
        var respiratorList = await respiratorApi.getRespiratorData(archivedRecords);
        setRespiratorList(respiratorList)
      }
      catch(error){
        console.error('Error fetching Respirator data:', error)
      }
    }
    getRespiratorList();
  }, [archivedRecords])

  return(
    <div>
      <div className='pb-2'>
        <input type='checkbox' checked={archivedRecords} onChange={()=> setArchivedRecords(!archivedRecords)}/>
        <label className='pl-2'>Include Archived Respirators</label>
      </div>
      <div className="pt-2 flex flex-wrap space-x-4 space-y-4 items-end">
        {respiratorList.map((respirator) => (
          <RespiratorCard key={respirator.respiratorID} respirator={respirator} onArchive={handleArchiveRespirator} />
        ))}
      </div>
    </div>
  )
  
}