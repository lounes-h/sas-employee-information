
import { styled } from '@mui/material/styles';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    Paper
} from '@mui/material';

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    maxHeight: 'calc(100vh - 250px)',
    marginTop: theme.spacing(2),
    boxShadow: 'none',
    borderRadius: 'none',
    '&::-webkit-scrollbar': {
        width: '0.4em',
        height: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
        background: theme.palette.background.paper,
        borderRadius: 'none',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.primary.light,
        borderRadius: 'none',
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
    },
}));

export const StyledTable = styled(Table)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    '& .MuiTableCell-root': {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
}));

export const StyledTableHead = styled(TableHead)(({ theme }) => ({
    position: 'sticky',
    top: 0,
    zIndex: 1,
    width: '100%',
    backgroundColor: theme.palette.primary.contrastText,
    '& .MuiTableCell-head': {
        color: theme.palette.primary.contrastText,
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        position: 'sticky',
        top: 0,
        zIndex: 1,
    },
}));

export const StyledHeaderRow = styled(TableRow)(({ theme }) => ({

}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({

    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },

    // Transition for smooth hover effect
    transition: theme.transitions.create(['background-color'], {
        duration: theme.transitions.duration.shortest,
    }),
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    padding: theme.spacing(1.5),
    '&.column-header': {
        cursor: 'pointer',
        userSelect: 'none',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    },

    '&.MuiTableCell-head': {
        color: theme.palette.primary.dark,
    }
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
    width: '100%',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 'none',
    boxShadow: 'none',
}));

// Styled components for sorting indicators
export const SortIcon = styled('span')(({ theme }) => ({
    marginLeft: theme.spacing(0.5),
    verticalAlign: 'middle',
    display: 'inline-flex',
    '& svg': {
        fontSize: '1.25rem',
    },
}));

// Custom styles for empty state
export const EmptyStateContainer = styled('div')(({ theme }) => ({
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    '& svg': {
        fontSize: '3rem',
        marginBottom: theme.spacing(2),
        color: theme.palette.action.disabled,
    },
}));
