// src/context/EmployeeContext.tsx
import { createContext, useContext, useState, FC, ReactNode, useMemo, useCallback } from 'react';
import { Month } from '../types/Month';
import { useEmployees } from '../hooks/useEmployees';
import { filterEmployeesByMonth } from '../utils/filterUtils';
import { EmployeeContextType } from '../types/Employee';
import { sortByMonthAndDay } from '../utils/sortUtils';
import { getCurrentMonth } from '../utils/dateUtils';



export const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const currentMonth = getCurrentMonth() as Month;

    const [selectedMonth, setSelectedMonth] = useState<Month>(currentMonth);

    const [appliedFilterMonth, setAppliedFilterMonth] = useState<Month>(currentMonth);

    const { employees, isLoading, error } = useEmployees();

    const applyFilter = useCallback(() => {
        setAppliedFilterMonth(selectedMonth);
    }, [selectedMonth, setAppliedFilterMonth]);

    const filteredEmployees = useMemo(() => {
        const filtered = filterEmployeesByMonth(employees, appliedFilterMonth);
        return sortByMonthAndDay(filtered);
    }, [employees, appliedFilterMonth]);

    const value = useMemo(() => ({
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