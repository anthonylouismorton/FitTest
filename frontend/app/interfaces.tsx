export interface Company {
  companyID?: Number;
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
}

export interface Employee {
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
  make: string,
  model: string,
  style: string,
  fitfactor: string
}

export interface QuantitativeFitTest{
  testpass: string,
  testdate: Date,
  testtime: Date,
  testexpiration: Date,
  fitfactor1: string,
  fitfactor2: string,
  fitfactor3: string,
  fitfactor4: string,
  fitfactor5: string,
  fitfactor6: string,
  fitfactor7: string,
  fitfactor8: string,
  overallfitfactor: string,
  employeeID: number,
  respiratorID: number
}