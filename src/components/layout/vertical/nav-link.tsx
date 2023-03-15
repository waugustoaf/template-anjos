import { ElementType } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import Chip from '@mui/material/Chip';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Box, { BoxProps } from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import { styled, useTheme } from '@mui/material/styles';
import ListItemButton, {
  ListItemButtonProps,
} from '@mui/material/ListItemButton';
import { NavGroup, NavLink } from '@/types/app/layout';
import { Settings } from '@/types/app/settings';
import { hexToRGBA } from '@/utils/colors/hex-to-rgba';
import { themeConfig } from '@/config/app';
import { handleURLQueries } from '@/utils/next/url-queries';
import { CanViewNavLink } from '../acl/can-view-nav-link';
import { UserIcon } from '@/components/icon/user';
import { Translations } from '../translations';

interface Props {
  parent?: boolean;
  item: NavLink;
  navHover?: boolean;
  settings: Settings;
  navVisible?: boolean;
  collapsedNavWidth: number;
  navigationBorderWidth: number;
  toggleNavVisibility: () => void;
  isSubToSub?: NavGroup | undefined;
}

const MenuNavLink = styled(ListItemButton)<
  ListItemButtonProps & {
    component?: ElementType;
    href: string;
    target?: '_blank' | undefined;
  }
>(({ theme }) => ({
  width: '100%',
  marginLeft: theme.spacing(3.5),
  marginRight: theme.spacing(3.5),
  borderRadius: theme.shape.borderRadius,
  transition: 'padding-left .25s ease-in-out, padding-right .25s ease-in-out',
  '&.active': {
    '&, &:hover': {
      boxShadow: `0px 2px 6px ${hexToRGBA(theme.palette.primary.main, 0.48)}`,
      background: `linear-gradient(72.47deg, ${
        theme.direction === 'ltr'
          ? theme.palette.primary.main
          : hexToRGBA(theme.palette.primary.main, 0.7)
      } 22.16%, ${
        theme.direction === 'ltr'
          ? hexToRGBA(theme.palette.primary.main, 0.7)
          : theme.palette.primary.main
      } 76.47%)`,
      '&.Mui-focusVisible': {
        background: `linear-gradient(72.47deg, ${
          theme.palette.primary.dark
        } 22.16%, ${hexToRGBA(theme.palette.primary.dark, 0.7)} 76.47%)`,
      },
    },
    '& .MuiTypography-root, & svg': {
      color: `${theme.palette.common.white} !important`,
    },
  },
}));

const MenuItemTextMetaWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  justifyContent: 'space-between',
  transition: 'opacity .25s ease-in-out',
  ...(themeConfig.menuTextTruncate && { overflow: 'hidden' }),
}));

export const VerticalNavLink = ({
  item,
  parent,
  navHover,
  settings,
  navVisible,
  isSubToSub,
  collapsedNavWidth,
  toggleNavVisibility,
  navigationBorderWidth,
}: Props) => {
  const theme = useTheme();
  const router = useRouter();

  const { mode, navCollapsed } = settings;

  const icon = parent && !item.icon ? themeConfig.navSubItemIcon : item.icon;

  const conditionalColors = () => {
    if (mode === 'semi-dark') {
      return {
        '&:hover': {
          backgroundColor: `rgba(${theme.palette.customColors.dark}, 0.04)`,
        },
        '& .MuiTypography-root, & svg': {
          color: `rgba(${theme.palette.customColors.dark}, 0.6)`,
        },
      };
    } else
      return {
        '& .MuiTypography-root, & svg': {
          color: 'text.secondary',
        },
      };
  };

  const isNavLinkActive = () => {
    if (router.pathname === item.path || handleURLQueries(router, item.path)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <CanViewNavLink navLink={item}>
      <ListItem
        disablePadding
        className='nav-link'
        disabled={item.disabled || false}
        sx={{ mt: 1, px: '0 !important' }}
      >
        <MenuNavLink
          component={Link}
          {...(item.disabled && { tabIndex: -1 })}
          className={isNavLinkActive() ? 'active' : ''}
          href={item.path === undefined ? '/' : `${item.path}`}
          {...(item.openInNewTab ? { target: '_blank' } : null)}
          onClick={(e: any) => {
            if (item.path === undefined) {
              e.preventDefault();
              e.stopPropagation();
            }
            if (navVisible) {
              toggleNavVisibility();
            }
          }}
          sx={{
            py: 2,
            ...conditionalColors(),
            ...(item.disabled
              ? { pointerEvents: 'none' }
              : { cursor: 'pointer' }),
            px:
              navCollapsed && !navHover
                ? (collapsedNavWidth - navigationBorderWidth - 22 - 28) / 8
                : 4,
          }}
        >
          <ListItemIcon
            sx={{
              transition: 'margin .25s ease-in-out',
              ...(navCollapsed && !navHover ? { mr: 0 } : { mr: 2 }),
              ...(parent ? { ml: 1.5, mr: 3.5 } : {}), // This line should be after (navCollapsed && !navHover) condition for proper styling
              '& svg': {
                fontSize: '0.625rem',
                ...(!parent ? { fontSize: '1.375rem' } : {}),
                ...(parent && item.icon ? { fontSize: '0.875rem' } : {}),
              },
            }}
          >
            <UserIcon icon={icon as string} />
          </ListItemIcon>

          <MenuItemTextMetaWrapper
            sx={{
              ...(isSubToSub ? { ml: 2 } : {}),
              ...(navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 }),
            }}
          >
            <Typography
              {...((themeConfig.menuTextTruncate ||
                (!themeConfig.menuTextTruncate &&
                  navCollapsed &&
                  !navHover)) && {
                noWrap: true,
              })}
            >
              <Translations text={item.title} />
            </Typography>
            {item.badgeContent ? (
              <Chip
                label={item.badgeContent}
                color={item.badgeColor || 'primary'}
                sx={{
                  height: 20,
                  fontWeight: 500,
                  '& .MuiChip-label': { px: 1.5, textTransform: 'capitalize' },
                }}
              />
            ) : null}
          </MenuItemTextMetaWrapper>
        </MenuNavLink>
      </ListItem>
    </CanViewNavLink>
  );
};
