import { Icon } from '@/components/icon';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/utils/api';
import { beautifullyPhone } from '@/utils/text';
import { Avatar, Box, Button, Typography, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

type DataProps = Record<
  string,
  {
    isEnabled: boolean;
    items: {
      id: string;
      name: string;
      phone: string;
      email: string;
      avatar?: string;
    }[];
  }
>;

function translate(key: string) {
  const translations: Record<string, string> = {
    message: 'Mensagens',
    conversation: 'Conversas',
    schedule: 'Agendamentos',
    appointment: 'Consultas',
    sale: 'Vendas',
  };

  return translations[key];
}

export default function Boards() {
  const router = useRouter();
  const theme = useTheme();

  const { user } = useAuth();
  const { campaignId, slug } = router.query as {
    campaignId: string;
    slug: string;
  };

  const { data: funnels } = useQuery(
    ['funnels', user?.clinic?.id],
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return [
        { id: '123', name: 'Funnel 1' },
        { id: '456', name: 'Funnel 2' },
      ];
    },
  );

  const { data } = useQuery(['boards', campaignId, slug], async () => {
    const response = await fetch('/api/boards');
    const json = await response.json();

    return json.data as DataProps;
  });

  return (
    <Box width='100%' sx={{ overflowX: 'auto' }} display='flex' gap='0.5rem'>
      {[
        'message',
        'conversation',
        'schedule',
        'appointment',
        'sale',
      ].map((key) => {
        if (!data || !data[key].isEnabled) return null;

        return (
          <Box key={key} width='80%' maxWidth='280px'>
            <Typography
              width='100%'
              borderRadius='6px'
              border='1px solid'
              borderColor='primary.main'
              padding='0.75rem'
              marginBottom='1rem'
              display='flex'
              alignItems='center'
              gap='0.25rem'
            >
              <Icon
                icon='tabler:clipboard-check'
                color={theme.palette.primary.main}
              />
              {translate(key)}
            </Typography>

            {data[key].items.map((item) => (
              <Button
                key={item.id}
                variant='text'
                sx={{
                  cursor: 'pointer',
                  color: 'black',
                  width: '100%',
                  backgroundColor: 'white',
                  border: '1px solid',
                  borderColor: 'primary.main',
                  padding: '0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  fontWeight: 'bold',
                  marginTop: '0.15rem',
                  textTransform: 'none',
                  alignItems: 'flex-start',

                  ':hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                  },
                }}
              >
                <Box display='flex' gap='0.5rem'>
                  <Avatar
                    alt={item.name}
                    src={item.avatar || undefined}
                  >
                    <Typography fontSize={12}>
                      {item.name.split(' ').map((word) => word[0])}
                    </Typography>
                  </Avatar>

                  <Box
                    display='flex'
                    flexDirection='column'
                    alignItems='flex-start'
                  >
                    <Typography color='inherit'>{item.name}</Typography>
                    <Typography color='inherit'>
                      {beautifullyPhone(item.phone)}
                    </Typography>
                    <Typography color='inherit'>{item.email}</Typography>
                  </Box>
                </Box>
              </Button>
            ))}
          </Box>
        );
      })}
    </Box>
  );
}
