"use client"
import React, { useState, useEffect } from 'react'
import QualitativefittestCard from './qualitativefittestcards'
import { qualitativefittestApi } from '../api/qualitativefittest/route'
import { QualitativeFitTest } from '../interfaces'

export default function QualitativefittestCardContainer() {
  const [qualitativefittestList, setQualitativefittestList] = useState<QualitativeFitTest[]>([]);

  const handleFittestDelete = async () => {
    var updatedList = await qualitativefittestApi.getQualitative();
    setQualitativefittestList(updatedList)
  };

  useEffect(() => {
    const getQualitativefittestList = async () => {
      try{
        var qualitativefittestList = await qualitativefittestApi.getQualitative();
        setQualitativefittestList(qualitativefittestList)
      }
      catch(error){
        console.error('Error fetching Qualitativefittest data:', error)
      }
    }
    getQualitativefittestList();
  }, [])
  console.log(qualitativefittestList)
  return(
    <div>
      <div className="pt-2 flex flex-wrap space-x-4 space-y-4 items-end">
        {qualitativefittestList.map((qualitativefittest) => (
          <QualitativefittestCard key={qualitativefittest.qualitativeTestID} qualitativefittest={qualitativefittest} onDelete={handleFittestDelete}/>
        ))}
      </div>
    </div>
  )
  
}