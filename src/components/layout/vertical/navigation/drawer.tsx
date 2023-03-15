import { LayoutProps } from '@/types/app/layout';
import { styled, useTheme } from '@mui/material/styles';
import MuiSwipeableDrawer, {
  SwipeableDrawerProps,
} from '@mui/material/SwipeableDrawer';

interface Props {
  navWidth: number;
  navHover: boolean;
  navVisible: boolean;
  collapsedNavWidth: number;
  hidden: LayoutProps['hidden'];
  navigationBorderWidth: number;
  settings: LayoutProps['settings'];
  children: LayoutProps['children'];
  setNavHover: (values: boolean) => void;
  setNavVisible: (value: boolean) => void;
  navMenuProps: LayoutProps['verticalLayoutProps']['navMenu']['componentProps'];
}

const SwipeableDrawer = styled(MuiSwipeableDrawer)<SwipeableDrawerProps>({
  overflowX: 'hidden',
  transition: 'width .25s ease-in-out',
  '& ul': {
    listStyle: 'none',
  },
  '& .MuiListItem-gutters': {
    paddingLeft: 4,
    paddingRight: 4,
  },
  '& .MuiDrawer-paper': {
    left: 'unset',
    right: 'unset',
    overflowX: 'hidden',
    transition: 'width .25s ease-in-out, box-shadow .25s ease-in-out',
  },
});

export const Drawer = (props: Props) => {
  const {
    hidden,
    children,
    navHover,
    navWidth,
    settings,
    navVisible,
    setNavHover,
    navMenuProps,
    setNavVisible,
    collapsedNavWidth,
    navigationBorderWidth,
  } = props;

  const theme = useTheme();

  const { mode, skin, navCollapsed } = settings;

  let flag = true;

  const drawerColors = () => {
    if (mode === 'semi-dark') {
      return {
        backgroundColor: 'customColors.darkPaperBg',
      };
    } else
      return {
        backgroundColor: 'background.paper',
      };
  };

  const MobileDrawerProps = {
    open: navVisible,
    onOpen: () => setNavVisible(true),
    onClose: () => setNavVisible(false),
    ModalProps: {
      keepMounted: true,
    },
  };

  const DesktopDrawerProps = {
    open: true,
    onOpen: () => null,
    onClose: () => null,
    onMouseEnter: () => {
      if (flag || navCollapsed) {
        setNavHover(true);
        flag = false;
      }
    },
    onMouseLeave: () => {
      if (navCollapsed) {
        setNavHover(false);
      }
    },
  };

  let userNavMenuStyle = {};
  let userNavMenuPaperStyle = {};
  if (navMenuProps && navMenuProps.sx) {
    userNavMenuStyle = navMenuProps.sx;
  }
  if (navMenuProps && navMenuProps.PaperProps && navMenuProps.PaperProps.sx) {
    userNavMenuPaperStyle = navMenuProps.PaperProps.sx;
  }
  const userNavMenuProps = Object.assign({}, navMenuProps);
  delete userNavMenuProps.sx;
  delete userNavMenuProps.PaperProps;

  return (
    <SwipeableDrawer
      className='layout-vertical-nav'
      variant={hidden ? 'temporary' : 'permanent'}
      {...(hidden ? { ...MobileDrawerProps } : { ...DesktopDrawerProps })}
      PaperProps={{
        sx: {
          ...drawerColors(),
          ...(!hidden && skin !== 'bordered' && { boxShadow: 6 }),
          width: navCollapsed && !navHover ? collapsedNavWidth : navWidth,
          borderRight:
            navigationBorderWidth === 0
              ? 0
              : `${navigationBorderWidth}px solid ${theme.palette.divider}`,
          ...userNavMenuPaperStyle,
        },
        ...navMenuProps?.PaperProps,
      }}
      sx={{
        width: navCollapsed ? collapsedNavWidth : navWidth,
        ...userNavMenuStyle,
      }}
      {...userNavMenuProps}
    >
      {children}
    </SwipeableDrawer>
  );
};
