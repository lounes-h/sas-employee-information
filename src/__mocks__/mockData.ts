// src/__mocks__/mockData.ts
import { Employee } from '../types/Employee';

export const mockEmployees: Employee[] = [
    {
        firstName: 'John',
        lastName: 'Doe',
        location: 'New York, NY',
        birthday: new Date('02-11-1984'),
    },
    {
        firstName: 'Jane',
        lastName: 'Smith',
        location: 'Los Angeles, CA',
        birthday: new Date('01-10-1980'),
    }
];