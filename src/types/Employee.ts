import { Month } from "./Month";

export interface Employee {
    firstName: string;
    lastName: string;
    location: string;
    birthday: Date;
}

export interface EmployeeRaw {
    'First name': string;
    'Last name': string;
    'Location': string;
    'Birthday': string;
}

export interface EmployeeContextType {
    employees: Employee[];
    filteredEmployees: Employee[];
    selectedMonth: Month;
    appliedFilterMonth: Month;
    setSelectedMonth: (month: Month) => void;
    applyFilter: () => void;
    isLoading: boolean;
    error: Error | null;
}