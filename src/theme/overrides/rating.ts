import { Theme } from '@mui/material/styles';

export const Rating = (theme: Theme) => {
  return {
    MuiRating: {
      styleOverrides: {
        root: {
          color: theme.palette.warning.main,
          '& svg': {
            flexShrink: 0
          }
        }
      }
    }
  };
};
