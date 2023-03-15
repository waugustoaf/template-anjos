import { useEffect, Fragment } from 'react';

import { useRouter } from 'next/router';

import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Box, { BoxProps } from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import { styled, useTheme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';

import clsx from 'clsx';
import { LayoutProps, NavGroup } from '@/types/app/layout';
import { themeConfig } from '@/config/app';
import { hasActiveChild, removeChildren } from '@/utils/next/url-queries';
import { CanViewNavGroup } from '../acl/can-view-nav-group';
import { UserIcon } from '@/components/icon/user';
import { Translations } from '../translations';
import { Icon } from '@/components/icon';
import { VerticalNavItems } from './nav-items';

interface Props {
  item: NavGroup;
  navHover: boolean;
  parent?: NavGroup;
  navVisible?: boolean;
  groupActive: string[];
  collapsedNavWidth: number;
  currentActiveGroup: string[];
  navigationBorderWidth: number;
  settings: LayoutProps['settings'];
  isSubToSub?: NavGroup | undefined;
  saveSettings: LayoutProps['saveSettings'];
  setGroupActive: (values: string[]) => void;
  setCurrentActiveGroup: (items: string[]) => void;
}

const MenuItemTextWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  justifyContent: 'space-between',
  transition: 'opacity .25s ease-in-out',
  ...(themeConfig.menuTextTruncate && { overflow: 'hidden' }),
}));

export const VerticalNavGroup = (props: Props) => {
  const {
    item,
    parent,
    settings,
    navHover,
    navVisible,
    isSubToSub,
    groupActive,
    setGroupActive,
    collapsedNavWidth,
    currentActiveGroup,
    setCurrentActiveGroup,
    navigationBorderWidth,
  } = props;

  const theme = useTheme();
  const router = useRouter();
  const currentURL = router.asPath;
  const { direction, mode, navCollapsed, verticalNavToggleType } = settings;

  const toggleActiveGroup = (item: NavGroup, parent: NavGroup | undefined) => {
    let openGroup = groupActive;

    if (openGroup.includes(item.title)) {
      openGroup.splice(openGroup.indexOf(item.title), 1);

      if (item.children) {
        removeChildren(item.children, openGroup, currentActiveGroup);
      }
    } else if (parent) {
      if (parent.children) {
        removeChildren(parent.children, openGroup, currentActiveGroup);
      }

      if (!openGroup.includes(item.title)) {
        openGroup.push(item.title);
      }
    } else {
      openGroup = [];

      if (currentActiveGroup.every((elem) => groupActive.includes(elem))) {
        openGroup.push(...currentActiveGroup);
      }

      if (!openGroup.includes(item.title)) {
        openGroup.push(item.title);
      }
    }
    setGroupActive([...openGroup]);
  };

  const handleGroupClick = () => {
    const openGroup = groupActive;
    if (verticalNavToggleType === 'collapse') {
      if (openGroup.includes(item.title)) {
        openGroup.splice(openGroup.indexOf(item.title), 1);
      } else {
        openGroup.push(item.title);
      }
      setGroupActive([...openGroup]);
    } else {
      toggleActiveGroup(item, parent);
    }
  };

  useEffect(() => {
    if (hasActiveChild(item, currentURL)) {
      if (!groupActive.includes(item.title)) groupActive.push(item.title);
    } else {
      const index = groupActive.indexOf(item.title);
      if (index > -1) groupActive.splice(index, 1);
    }
    setGroupActive([...groupActive]);
    setCurrentActiveGroup([...groupActive]);

    if (navCollapsed && !navHover) {
      setGroupActive([]);
    }
  }, [router.asPath]);

  useEffect(() => {
    if (navCollapsed && !navHover) {
      setGroupActive([]);
    }

    if (
      (navCollapsed && navHover) ||
      (groupActive.length === 0 && !navCollapsed)
    ) {
      setGroupActive([...currentActiveGroup]);
    }
  }, [navCollapsed, navHover]);

  useEffect(() => {
    if (groupActive.length === 0 && !navCollapsed) {
      setGroupActive([]);
    }
  }, [navHover]);

  const icon = parent && !item.icon ? themeConfig.navSubItemIcon : item.icon;

  const menuGroupCollapsedStyles =
    navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 };

  const conditionalColors = () => {
    if (mode === 'semi-dark') {
      return {
        '&:hover': {
          backgroundColor: `rgba(${theme.palette.customColors.dark}, 0.04)`,
        },
        '& .MuiTypography-root, & :not(.menu-item-meta) > svg': {
          color: `rgba(${theme.palette.customColors.dark}, 0.6)`,
        },
        '&.Mui-selected': {
          backgroundColor: `rgba(${theme.palette.customColors.dark}, 0.08)`,
          '&:hover': {
            backgroundColor: `rgba(${theme.palette.customColors.dark}, 0.12)`,
          },
          '& .MuiTypography-root': {
            fontWeight: 500,
          },
          '& .MuiTypography-root, & :not(.menu-item-meta) > svg': {
            color: `rgba(${theme.palette.customColors.dark}, 0.87)`,
          },
          '& .menu-item-meta > svg': {
            color: `rgba(${theme.palette.customColors.dark}, 0.6)`,
          },
        },
      };
    } else {
      return {
        '& .MuiTypography-root, & :not(.menu-item-meta) > svg': {
          color: 'text.secondary',
        },
        '&.Mui-selected': {
          backgroundColor: 'action.hover',
          '&:hover': {
            backgroundColor: 'action.hover',
          },
          '& .MuiTypography-root, & :not(.menu-item-meta) > svg': {
            color: 'text.primary',
          },
          '& .menu-item-meta > svg': {
            color: 'text.secondary',
          },
        },
      };
    }
  };

  return (
    <CanViewNavGroup navGroup={item}>
      <Fragment>
        <ListItem
          disablePadding
          className='nav-group'
          onClick={handleGroupClick}
          sx={{ mt: 1, px: '0 !important', flexDirection: 'column' }}
        >
          <ListItemButton
            className={clsx({
              'Mui-selected':
                groupActive.includes(item.title) ||
                currentActiveGroup.includes(item.title),
            })}
            sx={{
              py: 2,
              mx: 3.5,
              borderRadius: 1,
              ...conditionalColors(),
              width: `calc(100% - ${theme.spacing(3.5 * 2)})`,
              transition:
                'padding-left .25s ease-in-out, padding-right .25s ease-in-out',
              px:
                navCollapsed && !navHover
                  ? (collapsedNavWidth - navigationBorderWidth - 22 - 28) / 8
                  : 4,
              '&.Mui-selected.Mui-focusVisible': {
                backgroundColor: 'action.focus',
                '&:hover': {
                  backgroundColor: 'action.focus',
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                transition: 'margin .25s ease-in-out',
                ...(parent && navCollapsed && !navHover ? {} : { mr: 2 }),
                ...(navCollapsed && !navHover ? { mr: 0 } : {}),
                ...(parent && item.children ? { ml: 1.5, mr: 3.5 } : {}),
              }}
            >
              <UserIcon
                icon={icon as string}
                {...(parent && { fontSize: '0.625rem' })}
              />
            </ListItemIcon>
            <MenuItemTextWrapper
              sx={{
                ...menuGroupCollapsedStyles,
                ...(isSubToSub ? { ml: 2 } : {}),
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
              <Box
                className='menu-item-meta'
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '& svg': {
                    transition: 'transform .25s ease-in-out',
                    color:
                      mode === 'semi-dark'
                        ? `rgba(${theme.palette.customColors.dark}, 0.38)`
                        : 'text.disabled',
                    ...(groupActive.includes(item.title) && {
                      transform:
                        direction === 'ltr'
                          ? 'rotate(90deg)'
                          : 'rotate(-90deg)',
                    }),
                  },
                }}
              >
                {item.badgeContent ? (
                  <Chip
                    label={item.badgeContent}
                    color={item.badgeColor || 'primary'}
                    sx={{
                      mr: 1.5,
                      height: 20,
                      fontWeight: 500,
                      '& .MuiChip-label': {
                        px: 1.5,
                        textTransform: 'capitalize',
                      },
                    }}
                  />
                ) : null}
                <Icon
                  fontSize='1.125rem'
                  icon={
                    direction === 'ltr'
                      ? 'tabler:chevron-right'
                      : 'tabler:chevron-left'
                  }
                />
              </Box>
            </MenuItemTextWrapper>
          </ListItemButton>
          <Collapse
            component='ul'
            onClick={(e) => e.stopPropagation()}
            in={groupActive.includes(item.title)}
            sx={{
              pl: 0,
              width: '100%',
              ...menuGroupCollapsedStyles,
              transition: 'all 0.25s ease-in-out',
            }}
          >
            <VerticalNavItems
              {...props}
              parent={item}
              navVisible={navVisible}
              verticalNavItems={item.children}
              isSubToSub={parent && item.children ? item : undefined}
            />
          </Collapse>
        </ListItem>
      </Fragment>
    </CanViewNavGroup>
  );
};
