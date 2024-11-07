import Papa from 'papaparse';
import { Employee, EmployeeRaw } from '../types/Employee';
import { parseDate } from './dateUtils';

export const parseCSVData = (csvContent: string): Employee[] => {
  console.log('csvContent ', csvContent);
  const { data } = Papa.parse(csvContent, {
    header: true,
    skipEmptyLines: true,
  });
  console.log('data ', data);
  const newData = (data as EmployeeRaw[]).map((row: EmployeeRaw) => ({
    firstName: row['First name'],
    lastName: row['Last name'],
    location: row['Location'],
    birthday: parseDate(row['Birthday'])
}));
  console.log('newData ', newData);
  return newData;
};