import CustomChip from '@/@core/components/mui/chip';
import {Breadcrumb} from '@/components/breadcrumb';
import {Icon} from '@/components/icon';
import {CampaignsPipelinesModal} from '@/components/pages/campaigns/pipelines/modal';
import {PipelineFilterModal} from '@/components/pages/campaigns/pipelines/modalFilters';
import {CustomerModal} from '@/components/pages/customer/customer-modal';
import {Spinner} from '@/components/spinner';
import {apiServices} from '@/services';
import {GetCustomerCBResponse} from '@/services/customer/types';
import {IBoardCampaign} from '@/types/entities/IBoardCampaign';
import {IStrategy} from '@/types/entities/IStrategy';
import {beautifullyPhone} from '@/utils/text';
import {Autocomplete, Avatar, Box, Button, TextField, Typography, useTheme,} from '@mui/material';
import {useQuery} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

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

interface IIcons {
  message: string;
  conversation: string;
  schedule: string;
  appointment: string;
  sale: string;
}

export default function Boards() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    name: '',
    strategyId: [] as IStrategy[],
  });
  const [selectedCustomer, setSelectedCustomer] = useState<{
    customer: GetCustomerCBResponse['message'][0];
    key: string;
  } | null>(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<IBoardCampaign | null>(
    null,
  );

  const router = useRouter();
  const theme = useTheme();

  const {
    data: boards,
    isLoading,
    isError: isBoardError,
  } = useQuery(['boards'], apiServices.campaign.boards);

  const icons: IIcons = {
    message: 'message',
    conversation: 'message-plus',
    schedule: 'calendar-time',
    appointment: 'clipboard-check',
    sale: 'currency-dollar',
  };

  const { data, isError, refetch } = useQuery(
    ['customer-cb', selectedBoard, filters],
    async () =>
      apiServices.customer.getByCampaignAndBoard(
        selectedBoard?.campaignId || '',
        selectedBoard?.id || '',
        filters.name,
        filters.strategyId.map(s => s.id),
      ),
    { enabled: !!selectedBoard },
  );

  function handleSelectCustomer(
    customer: GetCustomerCBResponse['message'][0],
    key: string,
  ) {
    setSelectedCustomer({
      customer,
      key,
    });
  }

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

  if (isError || isBoardError) {
    return (
      <Typography align='center' margin='0 auto' color='error.light'>
        Nenhuma campanha ativa
      </Typography>
    );
  }

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

        <Box display='flex' alignItems='stretch' gap='0.5rem'>
          <Button
            variant='contained'
            sx={{
              bgcolor: 'success.main',
              ':hover': { bgcolor: 'success.dark' },
            }}
            onClick={() => setIsModalOpen(true)}
          >
            <Icon icon='tabler:filter' fontSize={14} />
          </Button>
          <Autocomplete
            options={boards?.data || []}
            getOptionLabel={(item) => item.name}
            isOptionEqualToValue={(a, b) => a.id === b.id}
            renderInput={(params: any) => (
              <TextField
                {...params}
                label='Quadro'
                sx={{ width: { sx: 'auto', lg: '500px' } }}
              />
            )}
            onChange={(_, value) => {
              setSelectedBoard(value);
            }}
            value={selectedBoard}
          />

          <Button
            variant='contained'
            sx={{
              bgcolor: 'success.main',
              ':hover': { bgcolor: 'success.dark' },
            }}
            onClick={() => setIsCreatingUser(true)}
          >
            <Icon
              icon='tabler:star'
              fontSize={14}
              style={{ marginRight: '0.5rem' }}
            />
            Novo cliente
          </Button>
        </Box>
      </Box>

      <Box width='100%' sx={{ overflowX: 'auto' }} display='flex' gap='0.5rem'>
        {['message', 'conversation', 'schedule', 'appointment', 'sale'].map(
          (key) => {
            // @ts-ignore
            if (!selectedBoard || !selectedBoard[key].isEnable) return null;

            // @ts-ignore
            // @ts-ignore
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
                    icon={`tabler:${icons[key as keyof IIcons]}`}
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
                      onClick={() => handleSelectCustomer(item, key)}
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
                          <Box
                            color='inherit'
                            display='flex'
                            alignItems='center'
                            gap='0.25rem'
                          >
                            <Icon fontSize='1.2rem' icon='tabler:user' />
                            {item.name}
                          </Box>
                          <Box
                            color='inherit'
                            display='flex'
                            alignItems='center'
                            gap='0.25rem'
                          >
                            <Icon
                              fontSize='1.2rem'
                              icon='tabler:brand-whatsapp'
                            />{' '}
                            {beautifullyPhone(item.whatsApp)}
                          </Box>
                          <Box
                            color='inherit'
                            display='flex'
                            alignItems='center'
                            gap='0.25rem'
                          >
                            <Icon fontSize='1.2rem' icon='tabler:mail' />{' '}
                            {item.email}
                          </Box>
                          <Box
                            color='inherit'
                            display='flex'
                            alignItems='center'
                            gap='0.25rem'
                          >
                            <Icon fontSize='1.2rem' icon='tabler:tags' />
                            <Box display='flex' gap='0.15rem' flexWrap='wrap'>

                              {item.tags.map((tag) => (
                                <CustomChip
                                  rounded
                                  skin='light'
                                  size='small'
                                  label={tag}
                                  color={'warning'}
                                  sx={{ textTransform: 'capitalize' }}
                                />
                              ))}
                            </Box>
                          </Box>
                          <Box
                            color='inherit'
                            display='flex'
                            alignItems='center'
                            gap='0.25rem'
                          >
                            <Avatar alt={item.owner.name} src={item.owner.avatar || undefined} sx={{ width: '1.3rem', height: '1.3rem' }} >
                              <Typography fontSize={12}>
                                {item.owner.name.split(' ').map((word) => word[0])}
                              </Typography>
                            </Avatar>
                            <Box display='flex' gap='0.15rem' flexWrap='wrap'>
                              {item.owner.name}
                            </Box>
                          </Box>
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

      <CustomerModal
        notRedirect
        isOpen={isCreatingUser}
        onClose={() => setIsCreatingUser(false)}
        refetch={refetch}
        defaultCustomer={{
          boardId: selectedBoard?.id,
        }}
      />

      <CampaignsPipelinesModal
        onClose={() => setSelectedCustomer(null)}
        customer={selectedCustomer?.customer}
        type={selectedCustomer?.key}
        refetch={refetch}
        boardId={selectedBoard?.id || ''}
      />

      <PipelineFilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data) => {
          console.log({ data });
          setFilters(data);
          setIsModalOpen(false);
        }}
        defaultValues={filters}
      />
    </>
  );
}
