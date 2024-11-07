// src/context/EmployeeContext.tsx
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
  appliedFilterMonth: Month;
  setSelectedMonth: (month: Month) => void;
  applyFilter: () => void;
  isLoading: boolean;
  error: Error | null;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const currentMonth = dayjs().format('MMMM') as Month;
  
  // State for the month selected in dropdown
  const [selectedMonth, setSelectedMonth] = useLocalStorage<Month>(
    'selectedMonth',
    currentMonth
  );

  // State for the actually applied filter
  const [appliedFilterMonth, setAppliedFilterMonth] = useLocalStorage<Month>(
    'appliedFilterMonth',
    currentMonth
  );

  const { employees, isLoading, error } = useEmployees();

  const filteredEmployees = React.useMemo(() => {
    return filterEmployeesByMonth(employees, appliedFilterMonth);
  }, [employees, appliedFilterMonth]);

  const applyFilter = React.useCallback(() => {
    setAppliedFilterMonth(selectedMonth);
  }, [selectedMonth, setAppliedFilterMonth]);

  const value = React.useMemo(() => ({
    employees,
    filteredEmployees,
    selectedMonth,
    appliedFilterMonth,
    setSelectedMonth,
    applyFilter,
    isLoading,
    error,
  }), [
    employees,
    filteredEmployees,
    selectedMonth,
    appliedFilterMonth,
    setSelectedMonth,
    applyFilter,
    isLoading,
    error
  ]);

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