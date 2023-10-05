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