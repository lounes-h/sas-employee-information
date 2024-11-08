// src/__tests__/MonthSelector.test.tsx
import React from 'react';
import { screen, fireEvent, within } from '@testing-library/react';
import MonthSelector from '../../components/MonthSelector';
import { renderWithContext, createMockContextValue } from '../../__mocks__/employeeContext';
import { Month } from '../../types/Month';

describe('MonthSelector', () => {
    describe('Initial Render', () => {
        it('renders with initial selected a month', () => {
            renderWithContext(<MonthSelector />, {
                selectedMonth: 'January',
            });


            const nativeInput = document.querySelector('.MuiSelect-nativeInput') as HTMLInputElement;
            expect(nativeInput).toHaveValue('January');
        });

        it('renders the Apply Filter button', () => {
            renderWithContext(<MonthSelector />);

            expect(screen.getByRole('button', { name: /Apply Filter/i })).toBeInTheDocument();
        });
    });

    describe('Month Selection', () => {
        it('calls setSelectedMonth when month is changed', () => {
            const mockSetSelectedMonth = jest.fn();
            renderWithContext(<MonthSelector />, {
                setSelectedMonth: mockSetSelectedMonth
            });

            const select = screen.getByLabelText('Select a month');
            fireEvent.mouseDown(select);

            const monthOption = screen.getByRole('option', { name: 'March' });
            fireEvent.click(monthOption);

            expect(mockSetSelectedMonth).toHaveBeenCalledWith('March');
        });

        it('shows all months in the dropdown', async () => {
            renderWithContext(<MonthSelector />);

            const select = screen.getByLabelText('Select a month');
            fireEvent.mouseDown(select);

            const listbox = await screen.findByRole('listbox');

            const months: Month[] = [
                'All months',
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ];

            months.forEach(month => {
                expect(within(listbox).getByText(month)).toBeInTheDocument();
            });
        });
    });

    describe('Filter Button', () => {
        it('is disabled when selected month equals applied filter month', () => {
            renderWithContext(<MonthSelector />, {
                selectedMonth: 'January',
                appliedFilterMonth: 'January'
            });

            expect(screen.getByRole('button', { name: /Apply Filter/i })).toBeDisabled();
        });

        it('is enabled when selected month differs from applied filter month', () => {
            renderWithContext(<MonthSelector />, {
                selectedMonth: 'February',
                appliedFilterMonth: 'January'
            });

            expect(screen.getByRole('button', { name: /Apply Filter/i })).toBeEnabled();
        });

        it('calls applyFilter when clicked', () => {
            const mockApplyFilter = jest.fn();
            renderWithContext(<MonthSelector />, {
                selectedMonth: 'February',
                appliedFilterMonth: 'January',
                applyFilter: mockApplyFilter
            });

            fireEvent.click(screen.getByRole('button', { name: /Apply Filter/i }));
            expect(mockApplyFilter).toHaveBeenCalled();
        });
    });

    describe('Loading State', () => {
        it('disables button when loading', () => {
            renderWithContext(<MonthSelector />, {
                isLoading: true
            });

            expect(screen.getByRole('button', { name: /Apply Filter/i })).toBeDisabled();
        });
    });

    describe('Complete Interaction Flow', () => {
        // it('handles the full filter flow correctly', async () => {
        // });
    });

    describe('Error States', () => {
        it('handles empty selected month gracefully', () => {
            renderWithContext(<MonthSelector />, {
                selectedMonth: 'All months', // Set initial value to "All months"
                appliedFilterMonth: 'All months'
            });

            const nativeInput = document.querySelector('.MuiSelect-nativeInput') as HTMLInputElement;
            expect(nativeInput).toHaveValue('All months');
        });
    });

    describe('Button States', () => {
        it('disables Apply Filter button during loading', () => {
            renderWithContext(<MonthSelector />, {
                isLoading: true,
                selectedMonth: 'February',
                appliedFilterMonth: 'January'
            });

            expect(screen.getByRole('button', { name: /Apply Filter/i })).toBeDisabled();
        });

        it('disables Apply Filter button when no change in selection', () => {
            renderWithContext(<MonthSelector />, {
                selectedMonth: 'January',
                appliedFilterMonth: 'January'
            });

            expect(screen.getByRole('button', { name: /Apply Filter/i })).toBeDisabled();
        });

        it('enables Apply Filter button when month selection changes', () => {
            renderWithContext(<MonthSelector />, {
                selectedMonth: 'February',
                appliedFilterMonth: 'January'
            });

            expect(screen.getByRole('button', { name: /Apply Filter/i })).toBeEnabled();
        });
    });
});