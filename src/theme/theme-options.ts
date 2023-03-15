import { deepmerge } from '@mui/utils';
import { ThemeOptions } from '@mui/material';

import { DefaultPalette } from './palette';
import { spacing } from './spacing';
import { Shadows } from './shadows';
import { breakpoints } from './breakpoints';
import { Settings } from '@/types/app/settings';
import UserThemeOptions from '@/components/layout/user-theme-options';

export const themeOptions = (settings: Settings): ThemeOptions => {
  const { skin, mode, direction, themeColor } = settings;

  const userThemeConfig: any = Object.assign({}, UserThemeOptions());

  const userFontFamily = userThemeConfig.typography?.fontFamily;

  delete userThemeConfig.components;
  delete userThemeConfig.typography;

  const mergedThemeConfig = deepmerge(
    {
      direction,
      palette: DefaultPalette(mode === 'semi-dark' ? 'light' : mode, skin),
      typography: {
        fontFamily:
          userFontFamily ||
          [
            'Public Sans',
            'sans-serif',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
      },
      shadows: Shadows(mode === 'semi-dark' ? 'light' : mode),
      ...spacing,
      breakpoints: breakpoints(),
      shape: {
        borderRadius: 6,
      },
      mixins: {
        toolbar: {
          minHeight: 64,
        },
      },
    },
    userThemeConfig,
  );

  return deepmerge(mergedThemeConfig, {
    palette: {
      primary: {
        ...mergedThemeConfig.palette[themeColor],
      },
    },
  });
};
