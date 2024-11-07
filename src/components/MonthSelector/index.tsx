import React from 'react';
import { MenuItem, Typography, InputLabel } from '@mui/material';
import { useEmployeeContext } from '../../contexts/EmployeeContext';
import { StyledFormControl, StyledSelect, StyledWrapper, StyledFilterWrapper, StyledFilterButton } from './styles';
import { Month } from '../../types/Month';

const months = [
  'All months',
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const MonthSelector: React.FC = () => {

  const { 
    selectedMonth, 
    appliedFilterMonth,
    setSelectedMonth, 
    applyFilter,
    isLoading 
  } = useEmployeeContext();

  return (
    <StyledWrapper>
      <Typography variant="h3" component="h1" gutterBottom>
        Employee Information
      </Typography>
      <StyledFilterWrapper>
        <StyledFilterButton variant="contained" color="primary" onClick={applyFilter}
        disabled={isLoading || selectedMonth === appliedFilterMonth}>Apply Filter</StyledFilterButton>
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

      </StyledFilterWrapper>
    </StyledWrapper>
  );
};