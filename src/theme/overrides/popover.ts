import { Skin } from '@/types/app/layout';
import { Theme } from '@mui/material/styles';

export const Popover = (theme: Theme, skin: Skin) => {
  return {
    MuiPopover: {
      styleOverrides: {
        root: {
          '& .MuiPopover-paper': {
            boxShadow: theme.shadows[skin === 'bordered' ? 0 : 6],
            ...(skin === 'bordered' && { border: `1px solid ${theme.palette.divider}` })
          }
        }
      }
    }
  };
};
