import { styled } from '@mui/material/styles';
import { FormControl, Select } from '@mui/material';

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  maxWidth: 200,
  marginBottom: theme.spacing(3),
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