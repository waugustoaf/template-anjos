import { useAuth } from '@/hooks/useAuth';
import { Settings } from '@/types/app/settings';
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Input,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useMemo, useState } from 'react';
import { Icon } from '../icon';
import { AppBarContentClinic } from './app-bar-content-clinic';
import { ModeToggler } from './mode-toggler';
import { UserDropdown } from './user-dropdown';

interface Props {
  hidden: boolean;
  settings: Settings;
  toggleNavVisibility: () => void;
  saveSettings: (values: Settings) => void;
}

export const AppBarContent = (props: Props) => {
  const { hidden, settings, saveSettings, toggleNavVisibility } = props;
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function onClose() {
    setIsModalOpen(false);
  }

  function onOpen() {
    if ((user?.user?.grantType || 10) < 100) {
      return;
    }

    setIsModalOpen(true);
  }

  const clinicShowName = useMemo(() => {  
    if (!user?.clinic?.fantasyName) {
      return '';
    }

    const words = user?.clinic?.fantasyName.split(' ');

    const firstWordLetter = words[0].charAt(0);
    const lastWordLetter = words[words.length - 1].charAt(0);

    return `${firstWordLetter}${lastWordLetter}`;
  }, [user?.clinic]);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        className='actions-left'
        sx={{ mr: 2, display: 'flex', alignItems: 'center' }}
      >
        {hidden && !settings.navHidden ? (
          <IconButton
            color='inherit'
            sx={{ ml: -2.75 }}
            onClick={toggleNavVisibility}
          >
            <Icon fontSize='1.5rem' icon='tabler:menu-2' />
          </IconButton>
        ) : null}

        <Button
          variant='text'
          onClick={onOpen}
          sx={{ padding: 0, minWidth: 0 }}
        >
          <Box display='flex' alignItems='center' gap='0.25rem'>
            <Avatar
              title='Alterar clínica'
              alt={user?.clinic?.fantasyName}
              src={user?.clinic?.avatar || undefined}
            >
              {clinicShowName}
            </Avatar>

            <Typography sx={{ display: { xs: 'none', md: 'block' } }}>
              {user?.clinic?.fantasyName}
            </Typography>
          </Box>
        </Button>
      </Box>
      <Box
        className='actions-right'
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        <UserDropdown settings={settings} />
      </Box>

      <Dialog open={isModalOpen} onClose={onClose}>
        <DialogTitle>Alterar clínica</DialogTitle>
        <DialogContent>
          <AppBarContentClinic onClose={onClose} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};
