import { screen, within } from '@testing-library/react';
import EmployeeTable from '../../components/EmployeeTable';
import {
    renderWithContext
} from '../../__mocks__/employeeContext';
import { mockEmployees } from '../../__mocks__/mockData';
import { calculateAge, formatDate } from '../../utils/dateUtils';


describe('EmployeeTable', () => {
    describe('Table Structure', () => {
        it('renders table headers correctly', () => {
            renderWithContext(<EmployeeTable />);

            const headers = screen.getAllByRole('columnheader');
            expect(headers).toHaveLength(5);

            const headerTexts = headers.map(header => header.textContent);
            expect(headerTexts).toEqual([
                'First Name',
                'Last Name',
                'Location',
                'Birthday',
                'Age (years)'
            ]);
        });

        it('renders correct number of rows based on data', () => {
            renderWithContext(<EmployeeTable />);

            const rows = screen.getAllByRole('row');
            // Header row + data rows
            expect(rows).toHaveLength(mockEmployees.length + 1);
        });
    });

    describe('Data Display', () => {
        it('displays employee data correctly', () => {
            renderWithContext(<EmployeeTable />);

            mockEmployees.forEach(employee => {
                const employeeBithday = formatDate(employee.birthday);
                const employeeAge = calculateAge(employee.birthday);

                expect(screen.getByText(employee.firstName)).toBeInTheDocument();
                expect(screen.getByText(employee.lastName)).toBeInTheDocument();
                expect(screen.getByText(employee.location)).toBeInTheDocument();
                expect(screen.getByText(employeeBithday)).toBeInTheDocument();
                expect(screen.getByText(employeeAge)).toBeInTheDocument();
            });
        });

        it('formats dates correctly', () => {
            renderWithContext(<EmployeeTable />);

            expect(screen.getByText('Feb 11, 1984')).toBeInTheDocument();
            expect(screen.getByText('Jan 10, 1980')).toBeInTheDocument();
        });

        it('calculates ages correctly', () => {
            // Mock current date for consistent age calculations
            jest.useFakeTimers();
            jest.setSystemTime(new Date('11-08-2024'));

            renderWithContext(<EmployeeTable />);

            const rows = screen.getAllByRole('row').slice(1);
            const ages = rows.map(row => within(row).getAllByRole('cell')[4].textContent);

            expect(ages).toEqual(['40', '44']);

            jest.useRealTimers();
        });
    });

    describe('Loading State', () => {
        it('shows loading spinner when data is loading', () => {
            renderWithContext(
                <EmployeeTable />,
                { isLoading: true }
            );

            expect(screen.getByText('Loading employee data...')).toBeInTheDocument();
            expect(screen.queryByRole('table')).not.toBeInTheDocument();
        });
    });

    describe('Error State', () => {
        it('displays error message when there is an error', () => {
            const errorMessage = 'Failed to load';
            renderWithContext(
                <EmployeeTable />,
                { error: new Error(errorMessage) }
            );

            expect(screen.getByText(errorMessage)).toBeInTheDocument();
            expect(screen.queryByRole('table')).not.toBeInTheDocument();
        });
    });

    describe('Empty State', () => {
        it('shows empty state message when no employees match filter', () => {
            renderWithContext(
                <EmployeeTable />,
                {
                    filteredEmployees: [],
                    appliedFilterMonth: 'January'
                }
            );

            expect(screen.getByText(/No employees/)).toBeInTheDocument();
            expect(screen.queryByRole('table')).not.toBeInTheDocument();
        });
    });

    describe('Table Content', () => {
        it('applies correct styles to table cells', () => {
            renderWithContext(<EmployeeTable />);

            const cells = screen.getAllByRole('cell');
            cells.forEach(cell => {
                expect(cell).toHaveClass('MuiTableCell-root');
            });
        });

        it('properly aligns header with data columns', () => {
            renderWithContext(<EmployeeTable />);

            const headerRow = screen.getAllByRole('row')[0];
            const dataRow = screen.getAllByRole('row')[1];

            expect(headerRow.children.length).toBe(dataRow.children.length);
        });
    });
});