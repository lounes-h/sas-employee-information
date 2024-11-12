import { styled } from '@mui/material/styles';
import { FormControl, Select, Box, Button, Container, Typography } from '@mui/material';

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
    minWidth: 200,
    '& .MuiOutlinedInput-root': {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
        },
    },
    '& .MuiInputLabel-root': {
        color: theme.palette.text.secondary,
        '&.Mui-focused': {
            color: theme.palette.primary.main,
        },
    },
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
    '& .MuiSelect-select': {
        padding: theme.spacing(1.5),
    },
    '& .MuiMenuItem-root': {
        padding: theme.spacing(1.5),
    },
}));

export const StyledWrapper = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
    },
}));

export const StyledFilterWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    [theme.breakpoints.down('sm')]: {
        marginTop: 30,
        marginBottom: 10
    },
}));

export const StyledFilterButton = styled(Button)(({ theme }) => ({
    minWidth: 150,
    minHeight: 46,
    marginRight: theme.spacing(2),
}));