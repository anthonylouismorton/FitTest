"use client"
import React, { useState, useEffect } from 'react'
import RespiratorCard from './respiratorcards'
import { respiratorApi } from '../api/respirator/route'
import { Respirator } from '../interfaces'

export default function RespiratorCardContainer() {
  const [respiratorList, setRespiratorList] = useState<Respirator[]>([]);
  useEffect(() => {
    const getRespiratorList = async () => {
      try{
        var respiratorList = await respiratorApi.getRespiratorData();
        setRespiratorList(respiratorList)
      }
      catch(error){
        console.error('Error fetching Respirator data:', error)
      }
    }
    getRespiratorList();
  }, [])
  console.log(respiratorList)
  return(
    <div className='pt-2'>
      {respiratorList.map((respirator) => (
        <RespiratorCard key={respirator.respiratorID} respirator={respirator} />
      ))}
    </div>
  )
  
}