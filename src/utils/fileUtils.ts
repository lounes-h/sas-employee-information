import Papa from 'papaparse';
import { Employee, EmployeeRaw } from '../types/Employee';
import { parseDate } from './dateUtils';

export const parseCSVData = (csvContent: string): Employee[] => {
    const { data } = Papa.parse(csvContent, {
        header: true,
        transform: (value) => value.trim(),
        skipEmptyLines: true,
    });

    return (data as EmployeeRaw[]).map((row: EmployeeRaw) => ({
        firstName: row['First name'],
        lastName: row['Last name'],
        location: row['Location'],
        birthday: parseDate(row['Birthday'])
    }));
};