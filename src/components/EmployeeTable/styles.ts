
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
  boxShadow: theme.shadows[2],
  borderRadius: theme.shape.borderRadius,
  '&::-webkit-scrollbar': {
    width: '0.4em',
    height: '0.4em',
  },
  '&::-webkit-scrollbar-track': {
    background: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.primary.light,
    borderRadius: theme.shape.borderRadius,
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
  backgroundColor: theme.palette.tertiary.main,
  position: 'sticky', 
  top: 0,
  zIndex: 1,
  width: '100%',
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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
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
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
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
