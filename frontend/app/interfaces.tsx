export interface Company {
  companyID?: number;
  name?: string;
  address1?: string;
  address2?: string;
  address3?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  email?: string;
  altemail?: string;
  phonenumber?: string;
  phonenumberext?: string;
  archived?: boolean
}

export interface Employee {
  employeeID?: number;
  firstname: string,
  middlename: string,
  lastname: string,
  address1: string,
  address2: string,
  address3: string,
  birthday: Date;
  ssn: string,
  city: string,
  state: string,
  zipcode: string,
  email: string,
  phonenumber: string
  companyID: number
}

export interface Respirator {
  respiratorID?: number,
  make?: string,
  model?: string,
  style?: string,
  fitfactor?: number
  archived?: boolean
}

export interface QuantitativeFitTest{
  testpass: boolean,
  testdate: Date,
  testtime: Date,
  testexpiration: Date,
  fitfactor1: number,
  fitfactor2: number,
  fitfactor3: number,
  fitfactor4: number,
  fitfactor5: number,
  fitfactor6: number,
  fitfactor7: number,
  fitfactor8: number,
  overallfitfactor: number,
  employeeID: number | undefined,
  respiratorID: number | undefined,
  size: string,
  testtype: string
}

export interface QualitativeFitTest{
  testpass: boolean,
  testdate: Date,
  testtime: Date,
  testexpiration: Date,
  exercise1: boolean | undefined,
  exercise2: boolean | undefined,
  exercise3: boolean | undefined,
  exercise4: boolean | undefined,
  employeeID: number | undefined,
  respiratorID: number | undefined,
  size: string,
  testtype: string,
  tastethreshold: number
}