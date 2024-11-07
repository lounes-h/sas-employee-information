import { memo } from 'react';
import { Employee } from '../../types/Employee';
import { StyledTableRow, StyledTableCell } from './styles';
import { formatDate, calculateAge } from '../../utils/dateUtils';

interface EmployeeRowProps {
    employee: Employee;
}

const EmployeeRow = memo(({ employee }: EmployeeRowProps) => (
    <StyledTableRow>
        <StyledTableCell className="column-firstName">{employee.firstName}</StyledTableCell>
        <StyledTableCell className="column-lastName">{employee.lastName}</StyledTableCell>
        <StyledTableCell className="column-location">{employee.location}</StyledTableCell>
        <StyledTableCell className="column-birthday">{formatDate(employee.birthday)}</StyledTableCell>
        <StyledTableCell className="column-age">{calculateAge(employee.birthday)}</StyledTableCell>
    </StyledTableRow>
));

export default EmployeeRow;