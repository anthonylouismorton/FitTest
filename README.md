# Fit Test Database

## Table of Contents

- [Description](#description)
- [Database Diagram](#database-diagram)
- [Database Schema](#database-schema)
- [Technologies Used](#technologies-used)
- [Contact](#contact)

## Description

This project is a comprehensive fit test database that empowers users to efficiently manage respirator fit tests for multiple companies and their employees. Users have the flexibility to add respirator makes and models, as well as create both quantitative and qualitative fit tests for individual employees. This enables users to establish a clear record of the types of respirators an employee is authorized to wear and the specific protocols employed during each test. This versatile database is particularly valuable for companies providing respiratory protection testing services, offering a user-friendly solution to maintain compliance with OSHA standards. It can also be easily adapted to meet the unique needs of individual companies with varying divisions, ensuring they can effectively monitor personnel respiratory fit tests for regulatory compliance.

## Database Diagram

![Database Diagram](./databaseDiagram.png)

## Database Schema

### Tables

#### `Company`

- **Description**: This table stores information about a company.

- **Key Fields**:
  - `companyID` (Primary Key): Unique identifier for each company.
  - `name`: Company's name.
  - `phonenumber`: Company's phone number.
  - `email`: Company's email address.
  - `archived`: Boolean value that determines if a company has been archived and can no longer be assigned employees.

#### `Employee`

- **Description**: This table stores information about employees.

- **Key Fields**:
  - `employeeID` (Primary Key): Unique identifier for each employee.
  - `companyID` (Foreign Key): References the `companyID` in the `Company` table to associate an employee with a company.
  - `firstname`, `middlename`, `lastname`: Employee's name components.
  - `birthay`: Employee's birthday.

#### `Respirator`

- **Description**: This table stores information about respirators that can be used in creating fit tests.

- **Key Fields**:
  - `respiratorID` (Primary Key): Unique identifier for each respirator.
  - `make`: Manufacturer make of the respirator.
  - `model`: Manufacturer model of the respirator.
  - `style`: The respirator style (e.g., half face, full face).
  - `fitfactor`: OSHA-assigned protection factor.
  - `archived`: Boolean value to archive respirators.

#### `QuantitativeRespiratorFitTest`

- **Description**: This table stores information about quantitative fit tests.

- **Key Fields**:
  - `quantitativeTestID` (Primary Key): Unique identifier for each quantitative fit test.
  - `employeeID` (Foreign Key): References the `employeeID` in the `Employee` table to associate a quantitative fit test with an employee.
  - `respiratorID` (Foreign Key): References the `respiratorID` in the `Respirator` table to associate a quantitative fit test with a respirator.
  - `testdate`: Date of the fit test.
  - `testexpiration`: Fit test expiration date.
  - `overallfitfactor`: Overall fit factor during the test.
  - `testpass`: Boolean value indicating if the test passed.

#### `QualitativeRespiratorFitTest`

- **Description**: This table stores information about qualitative fit tests.

- **Key Fields**:
  - `qualitativeTestID` (Primary Key): Unique identifier for each qualitative fit test.
  - `employeeID` (Foreign Key): References the `employeeID` in the `Employee` table to associate a qualitative fit test with an employee.
  - `respiratorID` (Foreign Key): References the `respiratorID` in the `Respirator` table to associate a qualitative fit test with a respirator.
  - `testdate`: Date of the fit test.
  - `testexpiration`: Fit test expiration date.
  - `testtype`: OSHA protocol used for the test.
  - `testpass`: Boolean value indicating if the test passed.

### Relationships

- The `Company` table has a one-to-many relationship with the `Employee` table. Each company can have multiple employees.
- The `Employee` table has a one-to-many relationship with the `QualitativeRespiratorFitTest` table. Each employee can have multiple qualitative respirator fit tests.
- The `Employee` table has a one-to-many relationship with the `QuantitativeRespiratorFitTest` table. Each employee can have multiple quantitative respirator fit tests.
- The `Respirator` table has a one-to-many relationship with both the `QuantitativeRespiratorFitTest` and `QualitativeRespiratorFitTest` tables. Each respirator can be assigned to multiple fit tests.

## Technologies Used

- **Frontend Framework and Language:** TypeScript, Next.js, Material UI, and Tailwind CSS
- **Backend Framework and Language:** C# and ASP.NET Core Web API
- **Database Management System (DBMS):** SQL (Structured Query Language)
- **Database Software:** Microsoft SQL Server
  
## Contact
Email: anthonymorton760@gmail.com
LinkedIn: https://www.linkedin.com/in/anthony-louis-morton/
