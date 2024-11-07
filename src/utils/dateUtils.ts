import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';

// Initialize
dayjs.extend(customParseFormat);
dayjs.extend(utc);


// TODO: fix the two digit year issue

export const parseDate = (dateString: string): Date => {
    const formats = [
        'M/D/YYYY',    // e.g., 9/23/1963
        'DD-MMM-YY',   // e.g., 25-Apr-60
        'D-MMM-YY'     // e.g., 2-Apr-78
    ];

    let parsedDate = null;

    for (const format of formats) {
        parsedDate = dayjs(dateString, format, true); // strict parsing
        if (parsedDate.isValid()) {
            return parsedDate.toDate();
        }
    }

    throw new Error(`Unable to parse date: ${dateString}`);
};

export const formatDate = (date: Date): string => {
    return dayjs(date).format('MM/DD/YYYY');
};

export const calculateAge = (birthday: Date): number => {
    return dayjs().diff(dayjs(birthday), 'year');
};

export const getMonthName = (date: Date): string => {
    return dayjs(date).format('MMMM');
};

export const getCurrentMonth = (): string => {
    return dayjs().format('MMMM');
};

export const isSameMonth = (date1: Date, date2: Date): boolean => {
    return dayjs(date1).format('MMMM') === dayjs(date2).format('MMMM');
};