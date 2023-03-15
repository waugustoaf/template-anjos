import { ReactNode } from 'react';

import { deepmerge } from '@mui/utils';
import { Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles';

import { Overrides } from './overrides';
import { Typography } from './typography';

import { themeOptions } from './theme-options';

import { Settings } from '@/types/app/settings';
import Direction from '@/components/layout/direction';
import { themeConfig } from '@/config/app';
import UserThemeOptions from '@/components/layout/user-theme-options';
import { GlobalStyles as GlobalStyling } from './global-styles';

interface Props {
  settings: Settings;
  children: ReactNode;
}

export const ThemeComponent = (props: Props) => {
  const { settings, children } = props;

  const coreThemeConfig = themeOptions(settings);

  let theme = createTheme(coreThemeConfig);

  const mergeComponentOverrides = (theme: Theme, settings: Settings) =>
    deepmerge(
      { ...Overrides(theme, settings) },
      UserThemeOptions()?.components,
    );

  const mergeTypography = (theme: Theme) =>
    deepmerge(Typography(theme), UserThemeOptions()?.typography);

  theme = createTheme(theme, {
    components: { ...mergeComponentOverrides(theme, settings) },
    typography: { ...mergeTypography(theme) },
  });

  if (themeConfig.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return (
    <ThemeProvider theme={theme}>
      <Direction direction={settings.direction}>
        <CssBaseline />
        <GlobalStyles styles={() => GlobalStyling(theme) as any} />
        {children}
      </Direction>
    </ThemeProvider>
  );
};
