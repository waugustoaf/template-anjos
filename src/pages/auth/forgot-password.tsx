import { ReactNode, useState } from 'react';

import Link from 'next/link';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box, { BoxProps } from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled, useTheme } from '@mui/material/styles';
import { FooterIllustrationsV2 } from '@/components/footer/illustrations-v2';
import { Icon } from '@/components/icon';
import { BlankLayout } from '@/components/layout/blank';
import { themeConfig } from '@/config/app';
import { validateEmail } from '@/utils/functions/validators';
import { toast } from 'react-hot-toast';
import { apiServices } from '@/services';
import { CircularProgress } from '@mui/material';

const ForgotPasswordIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 650,
  marginTop: theme.spacing(12),
  marginBottom: theme.spacing(12),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550,
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500,
  },
}));

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450,
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600,
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750,
  },
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  fontSize: '1rem',
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: theme.palette.primary.main,
}));

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();

  const hidden = useMediaQuery(theme.breakpoints.down('md'));

  async function handleSubmit() {
    if (!email || !validateEmail(email)) {
      return toast.error('Insira um email válido');
    }

    try {
      setIsLoading(true);

      await apiServices.auth.requestResetToken(email);

      toast.success('Email enviado com sucesso.');
      setEmail('');
    } catch {
      toast.error('Erro ao enviar email');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            borderRadius: '20px',
            justifyContent: 'center',
            backgroundColor: 'customColors.bodyBg',
            margin: (theme) => theme.spacing(8, 0, 8, 8),
          }}
        >
          <ForgotPasswordIllustration
            alt='forgot-password-illustration'
            src={`/images/pages/auth-v2-forgot-password-illustration-${theme.palette.mode}.png`}
          />
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper>
        <Box
          sx={{
            p: [6, 12],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <img
              src='/images/favicon.svg'
              width='35'
              alt={themeConfig.templateName}
            />
            <Box sx={{ my: 6 }}>
              <Typography
                sx={{
                  mb: 1.5,
                  fontWeight: 500,
                  fontSize: '1.625rem',
                  lineHeight: 1.385,
                }}
              >
                Recuperar senha 🔒
              </Typography>
            </Box>
            <form
              noValidate
              autoComplete='off'
              onSubmit={(e) => e.preventDefault()}
            >
              <TextField
                autoFocus
                type='email'
                label='Email'
                sx={{ display: 'flex', mb: 4 }}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Button
                fullWidth
                size='large'
                type='submit'
                variant='contained'
                sx={{ mb: 4 }}
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <CircularProgress sx={{ color: '#fff' }} size={20} />
                ) : (
                  'Enviar token de senha'
                )}
              </Button>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '& svg': { mr: 1 },
                }}
              >
                <LinkStyled href='/login'>
                  <Icon fontSize='1.25rem' icon='tabler:chevron-left' />
                  <span>Voltar à tela de login</span>
                </LinkStyled>
              </Typography>
            </form>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  );
};

ForgotPassword.getLayout = (page: ReactNode) => (
  <BlankLayout>{page}</BlankLayout>
);

ForgotPassword.guestGuard = true;

export default ForgotPassword;
