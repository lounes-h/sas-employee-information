import { useState, useEffect } from 'react';
import { Employee } from '../types/Employee';
import { parseCSVData } from '../utils/csvParser';

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        // Load the CSV file
        const response = await fetch('/data/programming-challenge-data.csv');
        const csvContent = await response.text();
        console.log('csvContent ', csvContent);
        
        const parsedEmployees = parseCSVData(csvContent);
        console.log('parsedEmployees ', parsedEmployees);
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