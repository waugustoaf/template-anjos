import { Skin } from '@/types/app/layout';
import { Theme } from '@mui/material/styles';

export const Autocomplete = (theme: Theme, skin: Skin) => {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          ...(skin === 'bordered' && {
            boxShadow: 'none',
            border: `1px solid ${theme.palette.divider}`,
          }),
        },
      },
    },
  };
};
