import React, { createContext, useContext, useState, useCallback } from 'react';
import { Employee } from '../types/Employee';

interface EmployeeContextType {
  employees: Employee[];
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  filteredEmployees: Employee[];
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toLocaleString('default', { month: 'long' })
  );

  const filteredEmployees = React.useMemo(() => {
    if (selectedMonth === 'All months') return employees;
    return employees.filter(employee => {
      const birthMonth = new Date(employee.birthday)
        .toLocaleString('default', { month: 'long' });
      return birthMonth === selectedMonth;
    });
  }, [employees, selectedMonth]);

  return (
    <EmployeeContext.Provider 
      value={{ 
        employees, 
        selectedMonth, 
        setSelectedMonth, 
        filteredEmployees 
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployeeContext must be used within an EmployeeProvider');
  }
  return context;
};