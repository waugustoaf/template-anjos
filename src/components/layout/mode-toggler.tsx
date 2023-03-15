import { Mode } from '@/types/app/layout';
import { Settings } from '@/types/app/settings';
import IconButton from '@mui/material/IconButton';
import { Icon } from '../icon';

interface Props {
  settings: Settings;
  saveSettings: (values: Settings) => void;
}

export const ModeToggler = (props: Props) => {
  const { settings, saveSettings } = props;

  const handleModeChange = (mode: Mode) => {
    saveSettings({ ...settings, mode: mode });
  };

  const handleModeToggle = () => {
    if (settings.mode === 'light') {
      handleModeChange('dark' as Mode);
    } else {
      handleModeChange('light' as Mode);
    }
  };

  return (
    <IconButton color='inherit' aria-haspopup='true' onClick={handleModeToggle}>
      <Icon
        fontSize='1.5rem'
        icon={settings.mode === 'dark' ? 'tabler:sun' : 'tabler:moon-stars'}
      />
    </IconButton>
  );
};
