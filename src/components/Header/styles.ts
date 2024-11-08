import { styled } from '@mui/material/styles';
import { AppBar } from '@mui/material';

export const StyledHeader = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.primary.dark}`,
    height: 54,
    minHeight: 54,
    '& .MuiToolbar-root': {
        height: 54,
        minHeight: 54,
    },
}));

export const StyledLogo = styled('img')({
    height: '35px',
    width: 'auto',
    objectFit: 'contain',
    marginRight: '1rem',
});