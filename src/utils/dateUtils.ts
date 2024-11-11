import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import { BIRTHDAY_DATE_FORMAT } from '../constants'

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
    return dayjs(date).format(BIRTHDAY_DATE_FORMAT);
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