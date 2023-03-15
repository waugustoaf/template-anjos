import { Direction } from '@mui/material';
import {
  Skin,
  Mode,
  AppBar,
  Footer,
  ContentWidth,
  VerticalNavToggle,
  HorizontalMenuToggle,
} from '@/types/app/layout';

export type ThemeConfig = {
  skin: Skin;
  mode: Mode;
  appBar: AppBar;
  footer: Footer;
  navHidden: boolean;
  appBarBlur: boolean;
  direction: Direction;
  templateName: string;
  navCollapsed: boolean;
  routingLoader: boolean;
  disableRipple: boolean;
  navigationSize: number;
  navSubItemIcon: string;
  menuTextTruncate: boolean;
  contentWidth: ContentWidth;
  disableCustomizer: boolean;
  responsiveFontSizes: boolean;
  collapsedNavigationSize: number;
  horizontalMenuAnimation: boolean;
  layout: 'vertical' | 'horizontal';
  verticalNavToggleType: VerticalNavToggle;
  horizontalMenuToggle: HorizontalMenuToggle;
  afterVerticalNavMenuContentPosition: 'fixed' | 'static';
  beforeVerticalNavMenuContentPosition: 'fixed' | 'static';
  toastPosition:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
};
