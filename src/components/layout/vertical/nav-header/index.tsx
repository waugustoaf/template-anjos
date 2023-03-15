import { Icon } from '@/components/icon';
import { themeConfig } from '@/config/app';
import { LayoutProps } from '@/types/app/layout';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';

import { HeaderTitle, LinkStyled, MenuHeaderWrapper } from './styles';

interface Props {
  navHover: boolean;
  collapsedNavWidth: number;
  hidden: LayoutProps['hidden'];
  navigationBorderWidth: number;
  toggleNavVisibility: () => void;
  settings: LayoutProps['settings'];
  saveSettings: LayoutProps['saveSettings'];
  navMenuBranding?: LayoutProps['verticalLayoutProps']['navMenu']['branding'];
  menuLockedIcon?: LayoutProps['verticalLayoutProps']['navMenu']['lockedIcon'];
  menuUnlockedIcon?: LayoutProps['verticalLayoutProps']['navMenu']['unlockedIcon'];
}

export const VerticalNavHeader = (props: Props) => {
  const {
    hidden,
    navHover,
    settings,
    saveSettings,
    collapsedNavWidth,
    toggleNavVisibility,
    navigationBorderWidth,
    menuLockedIcon: userMenuLockedIcon,
    navMenuBranding: userNavMenuBranding,
    menuUnlockedIcon: userMenuUnlockedIcon
  } = props;

  const theme = useTheme();
  const { mode, navCollapsed } = settings;

  const menuCollapsedStyles = navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 };

  const menuHeaderPaddingLeft = () => {
    if (navCollapsed && !navHover) {
      if (userNavMenuBranding) {
        return 0;
      } else {
        return (collapsedNavWidth - navigationBorderWidth - 32) / 8;
      }
    } else {
      return 4.5;
    }
  };

  const conditionalColors = () => {
    if (mode === 'semi-dark') {
      return {
        '& .MuiTypography-root, & .MuiIconButton-root': {
          color: `rgba(${theme.palette.customColors.dark}, 0.87)`
        }
      };
    } else {
      return {
        '& .MuiTypography-root, & .MuiIconButton-root': {
          color: 'text.primary'
        }
      };
    }
  };

  const MenuLockedIcon = () => userMenuLockedIcon || <Icon icon='tabler:circle-dot' />;

  const MenuUnlockedIcon = () => userMenuUnlockedIcon || <Icon icon='tabler:circle' />;

  return (
    <MenuHeaderWrapper className='nav-header' sx={{ pl: menuHeaderPaddingLeft(), ...conditionalColors() }}>
      {userNavMenuBranding ? (
        userNavMenuBranding(props)
      ) : (
        <LinkStyled href='/'>
          <img src='/images/favicon.svg' alt={themeConfig.templateName} style={{ width: '32px' }} />
          <HeaderTitle variant='h6' sx={{ ...menuCollapsedStyles, ...(navCollapsed && !navHover ? {} : { ml: 2.5 }) }}>
            {themeConfig.templateName}
          </HeaderTitle>
        </LinkStyled>
      )}

      {hidden ? (
        <IconButton
          disableRipple
          disableFocusRipple
          onClick={toggleNavVisibility}
          sx={{
            p: 0,
            backgroundColor: 'transparent !important',
            color: `${
              mode === 'semi-dark' ? `rbga(${theme.palette.customColors.dark}, 0.6)` : theme.palette.text.secondary
            } !important`
          }}
        >
          <Icon icon='tabler:x' fontSize='1.25rem' />
        </IconButton>
      ) : userMenuLockedIcon === null && userMenuUnlockedIcon === null ? null : (
        <IconButton
          disableRipple
          disableFocusRipple
          onClick={() => saveSettings({ ...settings, navCollapsed: !navCollapsed })}
          sx={{
            p: 0,
            backgroundColor: 'transparent !important',
            '& svg': {
              fontSize: '1.25rem',
              ...menuCollapsedStyles,
              transition: 'opacity .25s ease-in-out'
            }
          }}
        >
          {navCollapsed ? MenuUnlockedIcon() : MenuLockedIcon()}
        </IconButton>
      )}
    </MenuHeaderWrapper>
  );
};
