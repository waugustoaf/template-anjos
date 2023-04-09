import { reverseArray } from '@/utils/array';
import {
  Breadcrumbs,
  Link as MuiLink,
  Typography,
  useTheme,
} from '@mui/material';
import Link from 'next/link';

interface Item {
  label: string;
  link?: string;
}

interface BreadcrumbProps {
  items: Item[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const theme = useTheme();
  const [last, ...rest] = reverseArray(items);

  return (
    <Breadcrumbs sx={{ mb: 3 }}>
      {rest.reverse().map(({ label, link }) => {
        if (!link) {
          return (
            <Typography
              color={`${theme.palette.text.primary} !important`}
              fontWeight='500'
              key={label}
            >
              {label}
            </Typography>
          );
        }

        return (
          <Link key={label} href={link || ''} passHref>
            <MuiLink
              color={`${theme.palette.text.primary} !important`}
              fontWeight='bold'
              underline='hover'
            >
              {label}
            </MuiLink>
          </Link>
        );
      })}

      <Typography fontWeight='bold' className='last'>
        {last.label}
      </Typography>
    </Breadcrumbs>
  );
}
