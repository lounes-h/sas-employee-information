import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useEmployeeContext } from '../../contexts/EmployeeContext';
import { StyledFormControl, StyledSelect } from './styles';
import { Month } from '../../types/Month';
const months = [
  'All months',
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const MonthSelector: React.FC = () => {
  const { selectedMonth, setSelectedMonth } = useEmployeeContext();

  return (
    <StyledFormControl fullWidth>
      <InputLabel id="month-select-label">Select a month</InputLabel>
      <StyledSelect
        labelId="month-select-label"
        id="month-select"
        value={selectedMonth}
        label="Select a month"
        onChange={(e) => setSelectedMonth(e.target.value as Month)}
        data-testid="month-selector"
      >
        {months.map((month) => (
          <MenuItem key={month} value={month}>
            {month}
          </MenuItem>
        ))}
      </StyledSelect>
    </StyledFormControl>
  );
};