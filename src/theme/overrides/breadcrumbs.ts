import { Theme } from '@mui/material/styles';

export const Breadcrumb = (theme: Theme) => {
  return {
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          '& a': {
            textDecoration: 'none',
            color: theme.palette.primary.main
          }
        },
        li: {
          color: theme.palette.text.secondary,
          '& .MuiTypography-root': {
            color: 'inherit'
          }
        }
      }
    }
  };
};
