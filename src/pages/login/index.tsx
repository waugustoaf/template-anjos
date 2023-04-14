import { ReactNode, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { FooterIllustrationsV2 } from '@/components/footer/illustrations-v2';
import { BlankLayout } from '@/components/layout/blank';
import { themeConfig } from '@/config/app';
import { loginFormFields } from '@/forms/login';
import { loginFormSchema } from '@/forms/login/schema';
import { useAuth } from '@/hooks/useAuth';
import {
  LinkStyled,
  LoginIllustration,
  RightWrapper,
} from '@/styles/pages/login/styles';
import { mountForm } from '@/utils/form/mount-form';
import { CircularProgress, FormControlLabel } from '@mui/material';
import { toast } from 'react-hot-toast';
import { InputCurrency } from '@/components/form/input-currency';

const schema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Email obrigatório'),
  password: yup
    .string()
    .min(6, 'Mínimo de 6 caracteres')
    .required('Senha obrigatória'),
});

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const auth = useAuth();
  const theme = useTheme();
  const hidden = useMediaQuery(theme.breakpoints.down('md'));

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginFormSchema),
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    const { email, password } = data;

    auth.login(
      { email, password, rememberMe },
      () => {
        toast('Falha ao fazer login. \n Verifique suas credenciais.', {
          icon: '🚫',
        });
      },
      () => {
        setIsLoading(false);
      },
    );
  };

  return (
    <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
      {!hidden && (
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
          <LoginIllustration
            alt='login-illustration'
            src={`/images/pages/auth-v2-login-illustration-${theme.palette.mode}.png`}
          />
          <FooterIllustrationsV2 />
        </Box>
      )}
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
              width='60'
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
                {`Bem-vindo(a) ao Anjo Guia. 👼🏼 `}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Por favor, entre em sua conta e aproveite a aventura
              </Typography>
            </Box>
            <form
              noValidate
              autoComplete='off'
              onSubmit={handleSubmit(onSubmit)}
            >
              {mountForm({
                register,
                fields: loginFormFields,
                errors,
              })}

              <Box
                sx={{
                  mb: 1.75,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <FormControlLabel
                  label='Lembrar-me'
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                  }
                />
                <LinkStyled href='/auth/forgot-password'>
                  Esqueceu a senha?
                </LinkStyled>
              </Box>
              <Button
                fullWidth
                size='large'
                type='submit'
                variant='contained'
                sx={{ mb: 4 }}
              >
                {isLoading ? (
                  <CircularProgress disableShrink color='inherit' size={20} />
                ) : (
                  'Login'
                )}
              </Button>
            </form>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  );
};

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

LoginPage.guestGuard = true;

export default LoginPage;
