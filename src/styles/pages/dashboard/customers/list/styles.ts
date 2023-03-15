import { styled } from '@mui/material/styles';
import Link from 'next/link';

export const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: '1rem',
  textDecoration: 'none',
  color: theme.palette.info.main
}));
