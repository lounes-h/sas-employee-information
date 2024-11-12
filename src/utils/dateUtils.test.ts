// src/__tests__/dateUtils.test.ts
import { parseDate, formatDate, calculateAge, getMonthName, getCurrentMonth } from './dateUtils';
import { BIRTHDAY_DATE_FORMAT } from '../constants';

describe('dateUtils', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date(2024, 0, 15)); // Set to January 15, 2024
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    describe('parseDate', () => {
        it('parses M/D/YYYY format correctly', () => {
            const result = parseDate('9/23/1963');
            expect(result.getFullYear()).toBe(1963);
            expect(result.getMonth()).toBe(8); // September is 8 (0-based)
            expect(result.getDate()).toBe(23);
        });

        it('parses DD-MMM-YY format correctly', () => {
            const result = parseDate('25-Apr-60');
            expect(result.getFullYear()).toBe(1960);
            expect(result.getMonth()).toBe(3); // April is 3 (0-based)
            expect(result.getDate()).toBe(25);
        });

        it('parses D-MMM-YY format correctly', () => {
            const result = parseDate('2-Apr-78');
            expect(result.getFullYear()).toBe(1978);
            expect(result.getMonth()).toBe(3);
            expect(result.getDate()).toBe(2);
        });

        // TODO: Add test for two-digit year issue
        it('should interpret two-digit years as 1900s', () => {
            const testCases = [
                { input: '25-Apr-20', expectedYear: 1920 },
                { input: '17-Jul-64', expectedYear: 1964 },
                { input: '2-Apr-78', expectedYear: 1978 },
                { input: '31-Dec-99', expectedYear: 1999 }
            ];

            testCases.forEach(({ input, expectedYear }) => {
                const result = parseDate(input);
                expect(result.getFullYear()).toBe(expectedYear);
            });
        });
    });

    describe('formatDate', () => {
        it('formats date according to BIRTHDAY_DATE_FORMAT', () => {
            const date = new Date(1990, 5, 15); // June 15, 1990
            expect(formatDate(date)).toBe('Jun 15, 1990');
        });

        it('formats single digit days with leading zero', () => {
            const date = new Date(1990, 5, 5); // June 5, 1990
            expect(formatDate(date)).toBe('Jun 05, 1990');
        });

        it('formats various dates consistently', () => {
            const testCases = [
                { date: new Date(1990, 0, 1), expected: 'Jan 01, 1990' },
                { date: new Date(1990, 11, 31), expected: 'Dec 31, 1990' },
                { date: new Date(1990, 9, 5), expected: 'Oct 05, 1990' },
                { date: new Date(1990, 3, 15), expected: 'Apr 15, 1990' }
            ];

            testCases.forEach(({ date, expected }) => {
                expect(formatDate(date)).toBe(expected);
            });
        });

        it('uses three-letter month abbreviations', () => {
            const testCases = [
                { date: new Date(1990, 0, 1), month: 'Jan' },
                { date: new Date(1990, 1, 1), month: 'Feb' },
                { date: new Date(1990, 2, 1), month: 'Mar' },
                { date: new Date(1990, 3, 1), month: 'Apr' },
                { date: new Date(1990, 4, 1), month: 'May' },
                { date: new Date(1990, 5, 1), month: 'Jun' },
                { date: new Date(1990, 6, 1), month: 'Jul' },
                { date: new Date(1990, 7, 1), month: 'Aug' },
                { date: new Date(1990, 8, 1), month: 'Sep' },
                { date: new Date(1990, 9, 1), month: 'Oct' },
                { date: new Date(1990, 10, 1), month: 'Nov' },
                { date: new Date(1990, 11, 1), month: 'Dec' }
            ];

            testCases.forEach(({ date, month }) => {
                expect(formatDate(date)).toContain(month);
            });
        });
    });

    describe('calculateAge', () => {
        it('calculates age correctly', () => {

            const testCases = [
                { birthDate: new Date(1990, 0, 1), expectedAge: 34 },
                { birthDate: new Date(1990, 0, 20), expectedAge: 33 },
                { birthDate: new Date(1960, 6, 15), expectedAge: 63 }
            ];

            testCases.forEach(({ birthDate, expectedAge }) => {
                expect(calculateAge(birthDate)).toBe(expectedAge);
            });
        });

        it('handles edge cases around birth year', () => {
            const testCases = [
                { birthDate: new Date(2023, 11, 31), expectedAge: 0 },
                { birthDate: new Date(2023, 0, 15), expectedAge: 1 },
                { birthDate: new Date(2023, 0, 16), expectedAge: 0 }
            ];

            testCases.forEach(({ birthDate, expectedAge }) => {
                expect(calculateAge(birthDate)).toBe(expectedAge);
            });
        });
    });

    describe('getMonthName', () => {
        it('returns correct month names', () => {
            const testCases = [
                { date: new Date(2023, 0, 1), expected: 'January' },
                { date: new Date(2023, 5, 15), expected: 'June' },
                { date: new Date(2023, 11, 31), expected: 'December' }
            ];

            testCases.forEach(({ date, expected }) => {
                expect(getMonthName(date)).toBe(expected);
            });
        });
    });

    describe('getCurrentMonth', () => {
        it('returns current month name', () => {
            expect(getCurrentMonth()).toBe('January');
        });
    });
});