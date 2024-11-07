import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';
import { Container, Box } from '@mui/material';
import { MonthSelector } from './components/MonthSelector/index';
import { EmployeeTable } from './components/EmployeeTable/index';
import { EmployeeProvider } from './contexts/EmployeeContext';
import { Header } from './components/Header/index';


function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <EmployeeProvider>
                <Header />
                <Container maxWidth={false}>
                    <Box sx={{ my: 4 }}>
                        <Box sx={{ mb: 3 }}>
                            <MonthSelector />
                        </Box>
                        <EmployeeTable />
                    </Box>
                </Container>
            </EmployeeProvider>
        </ThemeProvider>
    );
}

export default App;
