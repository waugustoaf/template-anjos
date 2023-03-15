import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const FooterContent = () => {
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box />
      {hidden ? null : (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            '& :not(:last-child)': { mr: 4 },
          }}
        >
          <MuiLink target='_blank' href=''>
            Política de Privacidade
          </MuiLink>
          <MuiLink target='_blank' href=''>
            Termos de Uso
          </MuiLink>
        </Box>
      )}
    </Box>
  );
};
