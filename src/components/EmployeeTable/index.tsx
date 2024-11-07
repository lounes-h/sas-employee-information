import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useEmployeeContext } from '../../contexts/EmployeeContext';

const calculateAge = (birthday: Date): number => {
  const today = new Date();
  const birthDate = new Date(birthday);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const EmployeeTable: React.FC = () => {
  const { filteredEmployees } = useEmployeeContext();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="employee table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Birthday</TableCell>
            <TableCell>Age</TableCell>
          </TableRow>
        </TableHead>
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
      </Table>
    </TableContainer>
  );
};