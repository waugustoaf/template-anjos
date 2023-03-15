import { ReactNode } from 'react';

import Link from 'next/link';

import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { BlankLayout } from '@/components/layout/blank';
import { FooterIllustrations } from '@/components/footer/illustrations';

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw',
  },
}));

const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginTop: theme.spacing(10),
  },
  [theme.breakpoints.down('md')]: {
    height: 400,
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(20),
  },
}));

export const Error401 = () => {
  return (
    <Box className='content-center'>
      <Box
        sx={{
          p: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <BoxWrapper>
          <Typography variant='h4' sx={{ mb: 1.5 }}>
            Oops, você não deveria estar aqui!
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Você não tem permissão para visualizar esta página usando as
            credenciais fornecidas durante o login.
          </Typography>
          <Typography sx={{ mb: 6, color: 'text.secondary' }}>
            Entre em contato com o administrador do site.
          </Typography>
          <Button href='/' component={Link} variant='contained'>
            Voltar para Home
          </Button>
        </BoxWrapper>
        <Img
          height='500'
          alt='error-illustration'
          src='/images/pages/401.png'
        />
      </Box>
      <FooterIllustrations />
    </Box>
  );
};

Error401.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;
