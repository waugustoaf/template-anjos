import { hexToRGBA } from '@/utils/colors/hex-to-rgba';
import { Theme } from '@mui/material/styles';

export const Pagination = (theme: Theme) => {
  return {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          '&:not(.MuiPaginationItem-outlined):not(.Mui-disabled)': {
            transition: theme.transitions.create(['color', 'background-color', 'box-shadow'], {
              duration: 250,
              easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }),
            '&.Mui-selected': {
              boxShadow: theme.shadows[2]
            }
          }
        },
        outlined: {
          borderColor: `rgba(${theme.palette.customColors.main}, 0.22)`
        },
        outlinedPrimary: {
          '&.Mui-selected': {
            backgroundColor: hexToRGBA(theme.palette.primary.main, 0.16)
          }
        },
        outlinedSecondary: {
          '&.Mui-selected': {
            backgroundColor: hexToRGBA(theme.palette.secondary.main, 0.16)
          }
        }
      }
    }
  };
};
