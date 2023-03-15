import { Theme } from '@mui/material/styles';

export const Typography = (theme: Theme) => {
  return {
    MuiTypography: {
      styleOverrides: {
        gutterBottom: {
          marginBottom: theme.spacing(2)
        }
      }
    }
  };
};
