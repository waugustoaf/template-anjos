import { ReactNode } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import {
  RightWrapper,
  VerifyEmailIllustration,
  LinkStyled,
} from '@/styles/pages/auth/verify-email/styles';
import { FooterIllustrationsV2 } from '@/components/footer/illustrations-v2';
import { BlankLayout } from '@/components/layout/blank';
import { apiServices } from '@/services';

const VerifyEmail = () => {
  const theme = useTheme();
  const auth = useAuth();
  const router = useRouter();

  const hidden = useMediaQuery(theme.breakpoints.down('md'));

  async function handleResendLink(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();

    try {
      await apiServices.auth.resendVerificationEmail(
        auth.user?.user?.email ?? '',
      );

      toast.success('Link de verificação enviado com sucesso.');

      router.push('/');
    } catch {
      toast.error('Falha ao enviar o link de verificação.');
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
          <VerifyEmailIllustration
            alt='verify-email-illustration'
            src={`/images/pages/auth-v2-verify-email-illustration-${theme.palette.mode}.png`}
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
            <svg
              width={34}
              height={23.375}
              viewBox='0 0 32 22'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                fill={theme.palette.primary.main}
                d='M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z'
              />
              <path
                fill='#161616'
                opacity={0.06}
                fillRule='evenodd'
                clipRule='evenodd'
                d='M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z'
              />
              <path
                fill='#161616'
                opacity={0.06}
                fillRule='evenodd'
                clipRule='evenodd'
                d='M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                fill={theme.palette.primary.main}
                d='M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z'
              />
            </svg>
            <Box sx={{ my: 6 }}>
              <Typography
                sx={{
                  mb: 1.5,
                  fontWeight: 500,
                  fontSize: '1.625rem',
                  lineHeight: 1.385,
                }}
              >
                Verifique seu email ✉️
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                O link de ativação da sua conta foi enviada para o email{' '}
                {auth.user?.user?.email}. Por favor, entre nesse link e ative
                sua conta.
              </Typography>
            </Box>
            <Button
              fullWidth
              variant='contained'
              onClick={() => router.push('/')}
            >
              Ignorar dessa vez
            </Button>
            <Box
              sx={{
                mt: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography sx={{ color: 'text.secondary' }}>
                Não recebeu o email?
              </Typography>
              <LinkStyled href='/' onClick={handleResendLink}>
                Reenviar
              </LinkStyled>
            </Box>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  );
};

VerifyEmail.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

VerifyEmail.guestGuard = true;

export default VerifyEmail;
