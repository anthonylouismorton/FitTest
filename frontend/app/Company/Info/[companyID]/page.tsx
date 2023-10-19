"use client"
import React, { useState, useEffect } from 'react';
import { companyApi } from '../../../api/company/route';
import CompanyDetails from './companyDetails';
import { Company } from '../../../interfaces';
import CompanyEmployees from './companyEmployees';

const Info = ({ params: { companyID } } : { params: { companyID: string } }) => {
  var [company, setCompany] = useState<Company>({
    name: "",
    address1: "",
    address2: "",
    address3: "",
    city: "",
    state: "",
    zipcode: "",
    email: "",
    altemail: "", 
    phonenumber: "", 
    phonenumberext: "", 
    employees: undefined
  });

  useEffect(() => {
    try{
      const getCompany = async() => {
       var companyInfo = await companyApi.getCompanyById(Number(companyID))
        setCompany(companyInfo)
      }
      getCompany();
    }catch(error){
      console.log(error)
    }
  }, [])
  console.log(company)
  return (
    <div className="flex flex-col mt-4 px-2 items-center justify-center w-full">
      <CompanyDetails company={company}/>
      <CompanyEmployees employees ={company.employees} companyID={company.companyID}/>
    </div>
  );
};

export default Info;
