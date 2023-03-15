import { hexToRGBA } from '@/utils/colors/hex-to-rgba';
import { Theme } from '@mui/material/styles';


export const Backdrop = (theme: Theme) => {
  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor:
            theme.palette.mode === 'light'
              ? `rgba(${theme.palette.customColors.main}, 0.7)`
              : hexToRGBA(theme.palette.background.default, 0.7)
        },
        invisible: {
          backgroundColor: 'transparent'
        }
      }
    }
  };
};
