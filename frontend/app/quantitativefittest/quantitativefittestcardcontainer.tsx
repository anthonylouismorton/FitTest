"use client"
import React, { useState, useEffect } from 'react'
import QuantitativefittestCard from './quantitativefittestcards'
import { quantitativefittestApi } from '../api/quantitativefittest/route'
import { QuantitativeFitTest } from '../interfaces'

export default function QuantitativefittestCardContainer() {
  const [quantitativefittestList, setQuantitativefittestList] = useState<QuantitativeFitTest[]>([]);

  const handleFittestDelete = async () => {
    var updatedList = await quantitativefittestApi.getQuantitative();
    setQuantitativefittestList(updatedList)
  };

  useEffect(() => {
    const getQuantitativefittestList = async () => {
      try{
        var quantitativefittestList = await quantitativefittestApi.getQuantitative();
        setQuantitativefittestList(quantitativefittestList)
      }
      catch(error){
        console.error('Error fetching Quantitativefittest data:', error)
      }
    }
    getQuantitativefittestList();
  }, [])
  return(
    <div>
      <div className="pt-2 flex flex-wrap space-x-4 space-y-4 items-end">
        {quantitativefittestList.map((quantitativefittest) => (
          <QuantitativefittestCard key={quantitativefittest.quantitativeTestID} quantitativefittest={quantitativefittest} onDelete={handleFittestDelete}/>
        ))}
      </div>
    </div>
  )
  
}