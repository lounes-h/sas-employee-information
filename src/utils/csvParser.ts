import Papa from 'papaparse';
import { Employee, EmployeeRaw } from '../types/Employee';
import { parseDate } from './dateUtils';

export const parseCSVData = (csvContent: string): Employee[] => {
  const { data } = Papa.parse(csvContent, {
    header: true,
    skipEmptyLines: true,
  });

  return (data as EmployeeRaw[]).map((row) => ({
    firstName: row['First name'],
    lastName: row['Last name'],
    location: row['Location'],
    birthday: parseDate(row['Birthday'])
  }));
};
