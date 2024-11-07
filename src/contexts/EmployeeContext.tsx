
import React, { createContext, useContext } from 'react';
import { Employee } from '../types/Employee';
import { Month } from '../types/Month';
import { useEmployees } from '../hooks/useEmployees';
import { filterEmployeesByMonth } from '../utils/filterUtils';
import { useLocalStorage } from '../hooks/useLocalStorage';
import dayjs from 'dayjs';

interface EmployeeContextType {
  employees: Employee[];
  filteredEmployees: Employee[];
  selectedMonth: Month;
  setSelectedMonth: (month: Month) => void;
  isLoading: boolean;
  error: Error | null;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const currentMonth = dayjs().format('MMMM') as Month;
  
  const [selectedMonth, setSelectedMonth] = useLocalStorage<Month>(
    'selectedMonth',
    currentMonth
  );

  const { employees, isLoading, error } = useEmployees();

  const filteredEmployees = React.useMemo(() => {
    return filterEmployeesByMonth(employees, selectedMonth);
  }, [employees, selectedMonth]);

  const value = React.useMemo(() => ({
    employees,
    filteredEmployees,
    selectedMonth,
    setSelectedMonth,
    isLoading,
    error,
  }), [employees, filteredEmployees, selectedMonth, isLoading, error]);

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error('useEmployeeContext must be used within an EmployeeProvider');
  }
  return context;
};