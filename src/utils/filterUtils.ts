import { Employee } from '../types/Employee';
import { getMonthName } from './dateUtils';

export const filterEmployeesByMonth = (
  employees: Employee[], 
  selectedMonth: string
): Employee[] => {
  if (selectedMonth === 'All months') {
    return employees;
  }
  
  return employees.filter(employee => 
    getMonthName(employee.birthday) === selectedMonth
  );
};
