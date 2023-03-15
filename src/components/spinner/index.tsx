import { themeConfig } from '@/config/app';
import Box, { BoxProps } from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export const Spinner = ({ sx }: { sx?: BoxProps['sx'] }) => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx,
      }}
    >
      <img
        src='/images/favicon.svg'
        alt={themeConfig.templateName}
        style={{ width: '40vw', maxWidth: '124px' }}
      />
      <CircularProgress disableShrink sx={{ mt: 6 }} />
    </Box>
  );
};
