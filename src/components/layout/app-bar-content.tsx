import { Settings } from '@/types/app/settings';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Icon } from '../icon';
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
      </Box>
      <Box
        className='actions-right'
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        <UserDropdown settings={settings} />
      </Box>
    </Box>
  );
};
