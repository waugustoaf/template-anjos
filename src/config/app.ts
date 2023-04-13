import { ThemeConfig } from '@/types/app';
import { Mode } from '@/types/app/layout';

export const themeConfig: ThemeConfig = {
  templateName: 'Anjo Guia',
  layout: 'vertical',
  mode: 'light' as Mode,
  direction: 'ltr',
  skin: 'default',
  contentWidth: 'boxed',
  footer: 'static',

  routingLoader: true,

  navHidden: false,
  menuTextTruncate: true,
  navSubItemIcon: 'tabler:circle',
  verticalNavToggleType: 'accordion',
  navCollapsed: false,
  navigationSize: 260,
  collapsedNavigationSize: 82,
  afterVerticalNavMenuContentPosition: 'fixed',
  beforeVerticalNavMenuContentPosition: 'fixed',
  horizontalMenuToggle: 'hover',
  horizontalMenuAnimation: true,

  appBar: 'fixed',
  appBarBlur: true,

  responsiveFontSizes: true,
  disableRipple: false,
  disableCustomizer: true,
  toastPosition: 'bottom-center',
};
