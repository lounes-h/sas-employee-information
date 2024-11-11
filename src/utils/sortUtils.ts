import { Employee } from "../types/Employee";
import dayjs from "dayjs";

export const sortByMonthAndDay = (employees: Employee[]): Employee[] => {
    return [...employees].sort((a, b) => {
        const dateA = dayjs(a.birthday);
        const dateB = dayjs(b.birthday);

        // Compare months first
        const monthDiff = dateA.month() - dateB.month();
        if (monthDiff !== 0) return monthDiff;

        // If months are the same, compare days
        return dateA.date() - dateB.date();
    });
};