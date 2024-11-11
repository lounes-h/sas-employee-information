import { FC } from 'react';
import {
    TableBody,
    CircularProgress,
    Typography,
    Alert,
    AlertTitle
} from '@mui/material';
import { useEmployeeContext } from '../../contexts/EmployeeContext';
import { StyledTableContainer, StyledTable, EmptyStateContainer } from './styles';
import EmployeeRow from './EmployeeRow';
import TableHeader from './TableHeader';

const EmployeeTable: FC = () => {
    const { filteredEmployees, isLoading, error } = useEmployeeContext();

    if (error) {
        return (
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {error.message}
            </Alert>
        );
    }

    if (isLoading) {
        return (
            <EmptyStateContainer>
                <CircularProgress />
                <Typography variant="h6">
                    Loading employee data...
                </Typography>
            </EmptyStateContainer>
        );
    }

    if (filteredEmployees.length === 0) {
        return (
            <EmptyStateContainer>
                <Typography variant="h6">
                    No employees data found
                </Typography>
            </EmptyStateContainer>
        );
    }

    return (
        <StyledTableContainer>
            <StyledTable aria-label="employee table">
                <TableHeader />
                <TableBody>
                    {filteredEmployees.map((employee, index) => (
                        <EmployeeRow key={`${employee.firstName}-${employee.lastName}-${employee.birthday.getTime()}`}
                            employee={employee} />
                    ))}
                </TableBody>
            </StyledTable>
        </StyledTableContainer>
    );
};

export default EmployeeTable;