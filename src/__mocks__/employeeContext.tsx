// src/__mocks__/employeeContext.tsx
import { ReactNode, FC, ReactElement } from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { EmployeeContext } from '../contexts/EmployeeContext';
import theme from '../styles/theme';
import { Employee } from '../types/Employee';
import { Month } from '../types/Month';
import { mockEmployees } from './mockData';

export type MockContextValue = {
    employees: Employee[];
    filteredEmployees: Employee[];
    selectedMonth: Month;
    appliedFilterMonth: Month;
    setSelectedMonth: (month: Month) => void;
    applyFilter: () => void;
    isLoading: boolean;
    error: Error | null;
};

export const createMockContextValue = (
    overrides: Partial<MockContextValue> = {}
): MockContextValue => ({
    employees: mockEmployees,
    filteredEmployees: mockEmployees,
    selectedMonth: 'All months',
    appliedFilterMonth: 'All months',
    setSelectedMonth: jest.fn(),
    applyFilter: jest.fn(),
    isLoading: false,
    error: null,
    ...overrides
});

interface MockProviderProps {
    contextValue?: Partial<MockContextValue>;
    children: ReactNode;
}

export const MockEmployeeProvider: FC<MockProviderProps> = ({
    contextValue = {},
    children
}) => {
    const value = createMockContextValue(contextValue);

    return (
        <ThemeProvider theme={theme}>
            <EmployeeContext.Provider value={value}>
                {children}
            </EmployeeContext.Provider>
        </ThemeProvider>
    );
};

export const renderWithContext = (
    ui: ReactElement,
    contextValue: Partial<MockContextValue> = {}
) => {
    return render(
        <MockEmployeeProvider contextValue={contextValue}>
            {ui}
        </MockEmployeeProvider>
    );
};