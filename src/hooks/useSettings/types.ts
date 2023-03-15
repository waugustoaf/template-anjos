import {
  Skin,
  Mode,
  AppBar,
  Footer,
  ThemeColor,
  ContentWidth,
  VerticalNavToggle,
} from '@/types/app/layout';
import { Direction } from '@mui/material';

export type Settings = {
  skin: Skin;
  mode: Mode;
  appBar?: AppBar;
  footer?: Footer;
  navHidden?: boolean;
  appBarBlur: boolean;
  direction: Direction;
  navCollapsed: boolean;
  themeColor: ThemeColor;
  contentWidth: ContentWidth;
  layout?: 'vertical' | 'horizontal';
  lastLayout?: 'vertical' | 'horizontal';
  verticalNavToggleType: VerticalNavToggle;
  toastPosition?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
};

export type PageSpecificSettings = {
  skin?: Skin;
  mode?: Mode;
  appBar?: AppBar;
  footer?: Footer;
  navHidden?: boolean;
  appBarBlur?: boolean;
  direction?: Direction;
  navCollapsed?: boolean;
  themeColor?: ThemeColor;
  contentWidth?: ContentWidth;
  layout?: 'vertical' | 'horizontal';
  lastLayout?: 'vertical' | 'horizontal';
  verticalNavToggleType?: VerticalNavToggle;
  toastPosition?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
};
export type SettingsContextValue = {
  settings: Settings;
  saveSettings: (updatedSettings: Settings) => void;
};
