import { useState, SyntheticEvent, Fragment } from 'react';

import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';
import { Icon } from '../icon';
import { Settings } from '@/types/app/settings';
import { useAuth } from '@/hooks/useAuth';

interface Props {
  settings: Settings;
}

const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
}));

const MenuItemStyled = styled(MenuItem)<MenuItemProps>(({ theme }) => ({
  '&:hover .MuiBox-root, &:hover .MuiBox-root svg': {
    color: theme.palette.primary.main,
  },
}));

export const UserDropdown = (props: Props) => {
  const { settings } = props;

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const router = useRouter();
  const auth = useAuth();

  const { logout } = useAuth();

  const { direction } = settings;

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url);
    }
    setAnchorEl(null);
  };

  const styles = {
    px: 4,
    py: 1.75,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      mr: 2.5,
      color: 'text.primary',
    },
  };

  const handleLogout = () => {
    logout();
    handleDropdownClose();
  };

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Avatar
          alt={auth.user?.user?.name}
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
          src={auth.user?.user?.avatar || undefined}
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, mt: 4.5 } }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: direction === 'ltr' ? 'right' : 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: direction === 'ltr' ? 'right' : 'left',
        }}
      >
        <Box sx={{ py: 1.75, px: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
              <Avatar
                alt={auth.user?.user?.name}
                src={auth.user?.user?.avatar || undefined}
                sx={{ width: '2.5rem', height: '2.5rem' }}
              />
            </Badge>
            <Box
              sx={{
                display: 'flex',
                ml: 2.5,
                alignItems: 'flex-start',
                flexDirection: 'column',
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>
                {auth.user?.user?.name}
              </Typography>
              <Typography variant='body2'>Admin</Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ my: (theme) => `${theme.spacing(2)} !important` }} />
        <MenuItemStyled
          sx={{ p: 0 }}
          onClick={() => handleDropdownClose('/pages/user-profile/profile')}
        >
          <Box sx={styles}>
            <Icon icon='tabler:user-check' />
            Meu perfil
          </Box>
        </MenuItemStyled>
        <MenuItemStyled
          sx={{ p: 0 }}
          onClick={() => handleDropdownClose('/apps/email')}
        >
          <Box sx={styles}>
            <Icon icon='tabler:mail' />
            Notificações
          </Box>
        </MenuItemStyled>
        <Divider sx={{ my: (theme) => `${theme.spacing(2)} !important` }} />
        <MenuItemStyled
          sx={{ p: 0 }}
          onClick={() => handleDropdownClose('/pages/account-settings/account')}
        >
          <Box sx={styles}>
            <Icon icon='tabler:settings' />
            Configurações
          </Box>
        </MenuItemStyled>
        <Divider sx={{ my: (theme) => `${theme.spacing(2)} !important` }} />
        <MenuItemStyled
          onClick={handleLogout}
          sx={{ py: 2, '& svg': { mr: 2, fontSize: '1.375rem' } }}
        >
          <Icon icon='tabler:logout' />
          Desconectar
        </MenuItemStyled>
      </Menu>
    </Fragment>
  );
};
