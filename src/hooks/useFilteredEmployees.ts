import { useMemo } from 'react';
import { Employee } from '../types/Employee';
import {  FilterOptions } from '../types/FilterOptions';
import { filterEmployeesByMonth } from '../utils/filterUtils';

export const useFilteredEmployees = (
  employees: Employee[],
  filterOptions: FilterOptions
) => {
  const filteredEmployees = useMemo(() => {
    return filterEmployeesByMonth(employees, filterOptions.month);
  }, [employees, filterOptions.month]);

  return filteredEmployees;
};