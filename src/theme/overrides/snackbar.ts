import { Skin } from '@/types/app/layout';
import { Theme } from '@mui/material/styles';

export const Snackbar = (theme: Theme, skin: Skin) => {
  return {
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          ...(skin === 'bordered' && { boxShadow: 'none' }),
          backgroundColor: `rgb(${theme.palette.customColors.main})`,
          color: theme.palette.common[theme.palette.mode === 'light' ? 'white' : 'black']
        }
      }
    }
  };
};
