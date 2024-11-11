// src/context/EmployeeContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { Employee } from '../types/Employee';
import { Month } from '../types/Month';
import { useEmployees } from '../hooks/useEmployees';
import { filterEmployeesByMonth } from '../utils/filterUtils';
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

export const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

const sortByMonthAndDay = (employees: Employee[]): Employee[] => {
    return [...employees].sort((a, b) => {
        const dateA = dayjs(a.birthday);
        const dateB = dayjs(b.birthday);

        // Compare months first
        const monthDiff = dateA.month() - dateB.month();
        if (monthDiff !== 0) return monthDiff;

        // If months are the same, compare days
        return dateA.date() - dateB.date();
    });
};

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const currentMonth = dayjs().format('MMMM') as Month;

    const [selectedMonth, setSelectedMonth] = useState<Month>(currentMonth);

    const [appliedFilterMonth, setAppliedFilterMonth] = useState<Month>(currentMonth);

    const { employees, isLoading, error } = useEmployees();

    const filteredEmployees = React.useMemo(() => {
        const filtered = filterEmployeesByMonth(employees, appliedFilterMonth);
        return sortByMonthAndDay(filtered);
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