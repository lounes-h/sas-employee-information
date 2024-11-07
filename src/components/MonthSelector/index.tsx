import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useEmployeeContext } from '../../contexts/EmployeeContext';

const months = [
  'All months',
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const MonthSelector: React.FC = () => {
  const { selectedMonth, setSelectedMonth } = useEmployeeContext();

  return (
    <FormControl fullWidth>
      <InputLabel id="month-select-label">Select a month</InputLabel>
      <Select
        labelId="month-select-label"
        id="month-select"
        value={selectedMonth}
        label="Select a month"
        onChange={(e) => setSelectedMonth(e.target.value)}
        data-testid="month-selector"
      >
        {months.map((month) => (
          <MenuItem key={month} value={month}>
            {month}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};