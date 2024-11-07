import React from 'react';
import {
  TableBody,
  TableCell,
  TableRow,
  CircularProgress,
  Typography,
  Alert,
  AlertTitle
} from '@mui/material';
import { useEmployeeContext } from '../../contexts/EmployeeContext';
import { StyledTableContainer, StyledTable, StyledTableHead, EmptyStateContainer } from './styled';
import { calculateAge } from '../../utils/dateUtils';


export const EmployeeTable: React.FC = () => {
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
        <StyledTableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Birthday</TableCell>
            <TableCell>Age (years)</TableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>


          {filteredEmployees.map((employee, index) => (
            <TableRow key={index}>
              <TableCell>{employee.firstName}</TableCell>
              <TableCell>{employee.lastName}</TableCell>
              <TableCell>{employee.location}</TableCell>
              <TableCell>
                {new Date(employee.birthday).toLocaleDateString()}
              </TableCell>
              <TableCell>{calculateAge(employee.birthday)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};