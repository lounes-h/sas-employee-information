import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { MonthSelector } from './components/MonthSelector/index';
import { EmployeeTable } from './components/EmployeeTable/index';
import { EmployeeProvider } from './contexts/EmployeeContext';


function App() {
  return (
    <EmployeeProvider>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Employee Information
          </Typography>
          <Box sx={{ mb: 3 }}>
            <MonthSelector />
          </Box>
          <EmployeeTable />
        </Box>
      </Container>
    </EmployeeProvider>
  );
}

export default App;
