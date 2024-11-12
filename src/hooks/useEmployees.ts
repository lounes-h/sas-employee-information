import { useState, useEffect } from 'react';
import { Employee } from '../types/Employee';
import { parseCSVData } from '../utils/fileUtils';

export const useEmployees = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const loadEmployees = async () => {
            try {

                const response = await fetch('/data/employee-data.csv');
                const csvContent = await response.text();

                const parsedEmployees = parseCSVData(csvContent);
                setEmployees(parsedEmployees);
                setIsLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to load employees data'));
                setIsLoading(false);
            }
        };

        loadEmployees();
    }, []);

    return { employees, isLoading, error };
};