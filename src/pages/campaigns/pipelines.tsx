import { Breadcrumb } from '@/components/breadcrumb';
import { Icon } from '@/components/icon';
import { Spinner } from '@/components/spinner';
import { TableHeader } from '@/components/table-header';
import { useAuth } from '@/hooks/useAuth';
import { apiServices } from '@/services';
import { GetCustomerCBResponse } from '@/services/customer/types';
import { IBoardCampaign } from '@/types/entities/IBoardCampaign';
import { api } from '@/utils/api';
import { beautifullyPhone } from '@/utils/text';
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

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
  const [selectedBoard, setSelectedBoard] = useState<IBoardCampaign | null>(
    null,
  );

  const router = useRouter();
  const theme = useTheme();

  const { data: boards, isLoading } = useQuery(
    ['boards'],
    apiServices.campaign.boards,
  );

  const { data } = useQuery(
    ['customer-cb', selectedBoard],
    async () =>
      apiServices.customer.getByCampaignAndBoard(
        selectedBoard?.campaignId || '',
        selectedBoard?.id || '',
      ),
    { enabled: !!selectedBoard },
  );

  useEffect(() => {
    if (!selectedBoard && boards?.data) {
      if (router.query.board) {
        const board = boards.data.find((b) => b.id === router.query.board);

        if (board) {
          setSelectedBoard(board);
          return;
        }
      }

      setSelectedBoard(boards.data[0]);
    }
  }, [boards]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <Box
        width='100%'
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        marginBottom='1rem'
      >
        <Breadcrumb
          items={[
            { label: 'Pipelines', link: '/campaigns/pipelines' },
            { label: 'Listagem' },
          ]}
        />

        <Autocomplete
          options={boards?.data || []}
          getOptionLabel={(item) => item.name}
          isOptionEqualToValue={(a, b) => a.id === b.id}
          renderInput={(params: any) => (
            <TextField {...params} label='Board' sx={{ width: '300px' }} />
          )}
          onChange={(_, value) => {
            setSelectedBoard(value);
          }}
          value={selectedBoard}
        />
      </Box>

      <Box width='100%' sx={{ overflowX: 'auto' }} display='flex' gap='0.5rem'>
        {['message', 'conversation', 'schedule', 'appointment', 'sale'].map(
          (key) => {
            // @ts-ignore
            if (!selectedBoard || !selectedBoard[key].isEnable) return null;

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

                {/* @ts-ignore */}
                {data?.data[key].map(
                  (item: GetCustomerCBResponse['message'][0]) => (
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
                        <Avatar alt={item.name} src={item.avatar || undefined}>
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
                            {beautifullyPhone(item.whatsApp)}
                          </Typography>
                          <Typography color='inherit'>{item.email}</Typography>
                        </Box>
                      </Box>
                    </Button>
                  ),
                )}
              </Box>
            );
          },
        )}
      </Box>
    </>
  );
}
