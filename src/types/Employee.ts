export interface Employee {
    firstName: string;
    lastName: string;
    location: string;
    birthday: Date;
  }

export interface EmployeeRaw {
    'First name': string;
    'Last name': string;
    'Location': string;
    'Birthday': string;
}