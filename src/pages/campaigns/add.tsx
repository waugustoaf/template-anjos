/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { mountForm } from '@/utils/form/mount-form';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';

import { useForm } from 'react-hook-form';

import { Breadcrumb } from '@/components/breadcrumb';
import { SubmitButton } from '@/components/form/submit-button';
import { Icon } from '@/components/icon';
import { campaignFormFields } from '@/forms/campaigns';
import { campaignFormSchema } from '@/forms/campaigns/schema';
import { apiServices } from '@/services';
import { ICategory } from '@/types/entities/ICategory';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { formatNumberToBase100 } from '@/utils/currency';
import { ICampaign, ICampaignFull } from '@/types/entities/ICampaign';
import { useQuery } from '@tanstack/react-query';
import { CreatedCampaigns } from '@/components/pages/campaigns/created';

export default function CategoryAddPage() {
  const [currentRoute, setCurrentRoute] = useState('main');
  const [isAutoPilot, setIsAuthPilot] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [currentData, setCurrentData] = useState({} as any);
  const [selectedStrategies, setSelectedStrategies] = useState<string[]>([]);
  const [createdData, setCreatedData] = useState<ICampaignFull | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(campaignFormSchema),
    defaultValues: {
      paidTraffic: false,
    } as any,
  });

  const { data } = useQuery([], () => apiServices.strategy.list(), {
    enabled: currentRoute === 'strategy',
  });

  useEffect(() => {
    if (currentRoute === 'strategy' && data?.data.length) {
      setSelectedStrategies(data.data.map((strategy) => strategy.id));
    }
  }, [data]);

  async function onSubmit(_data: Partial<ICampaign>) {
    setCurrentData((prevState: any) => ({
      ...prevState,
      ..._data,
    }));

    if (!isAutoPilot && !data?.data.length) {
      return setCurrentRoute('strategy');
    }

    try {
      setIsLoading(true);
      const response = await apiServices.campaign.create({
        ...currentData,
        financialGoal: currentData.financialGoal
          ? formatNumberToBase100(currentData.financialGoal)
          : undefined,
        averageTicket: currentData.averageTicket
          ? formatNumberToBase100(currentData.averageTicket)
          : undefined,
        year: parseInt(currentData.year) || new Date().getFullYear(),
        month: parseInt(currentData.month) || new Date().getMonth(),
        strategies: isAutoPilot ? [] : selectedStrategies,
        autoPilot: isAutoPilot,
      });

      toast.success('Campanha criado com sucesso.');
      setCreatedData({
        id: '9de46756-e26a-411a-87b3-102333285ca0',
        clinicId: '7f6bae13-026b-48f7-96e3-63d1c17d1143',
        autoPilot: false,
        name: 'Campanha de Páscoa',
        month: 3,
        year: 2023,
        financialGoal: 1000000,
        averageTicket: 150000,
        paidTraffic: false,
        strategies: [
          {
            id: 'd53d4443-4f1a-43c9-bdc9-512734c290c7',
            name: 'Million2',
            description: 'Estratégia',
            icon: '360',
          },
          {
            id: '0db249ce-3a06-403a-8c13-a59ad1d863cd',
            name: 'Oferta Direta 2',
            description: 'Estratégia',
            icon: '',
          },
        ],
        boards: [
          {
            id: 'd53d4443-4f1a-43c9-bdc9-512734c290c7',
            name: '03-2023 - Million2 - Lista Quente',
            campaignId: '9de46756-e26a-411a-87b3-102333285ca0',
            strategyId: '39fa530d-2abd-444c-8791-d5841aa64453',
            funnelId: '8d474d2f-5cda-4415-9218-fdd174c67bdb',
            paidTraffic: false,
            message: {
              goal: 10.8,
              count: 0,
              isEnabled: true,
            },
            conversation: {
              goal: 8,
              count: 0,
              isEnabled: true,
            },
            schedule: {
              goal: 4,
              count: 0,
              isEnabled: true,
            },
            appointment: {
              goal: 2,
              count: 0,
              isEnabled: true,
            },
            negotiation: {
              goal: 2,
              count: 0,
              isEnabled: true,
            },
            sale: {
              goal: 1,
              count: 0,
              isEnabled: true,
            },
            salesSum: 0,
            averageTicket: 150000,
            financialGoal: 500000,
            lostStep: true,
            active: true,
            strategy: {
              id: '39fa530d-2abd-444c-8791-d5841aa64453',
              funnelId: '8d474d2f-5cda-4415-9218-fdd174c67bdb',
              name: 'Million2',
              description: 'Estratégia',
              link: 'https://www.googlessssss.com.br/',
              icon: '360',
              qtdMessages: 1000,
              qtdConversations: 500,
              qtdAppointments: 200,
              qtdSchedules: 300,
              qtdNegotiations: 0,
              active: true,
            },
          },
          {
            id: '0db249ce-3a06-403a-8c13-a59ad1d863cd',
            name: '03-2023 - Oferta Direta 2 - Lista Quente',
            campaignId: '9de46756-e26a-411a-87b3-102333285ca0',
            strategyId: '212e226f-7ca3-4f1d-ab3e-f781aebe1d3d',
            funnelId: '8d474d2f-5cda-4415-9218-fdd174c67bdb',
            paidTraffic: false,
            message: {
              goal: 8,
              count: 0,
              isEnabled: true,
            },
            conversation: {
              goal: 7,
              count: 0,
              isEnabled: true,
            },
            schedule: {
              goal: 4,
              count: 0,
              isEnabled: true,
            },
            appointment: {
              goal: 2,
              count: 0,
              isEnabled: true,
            },
            negotiation: {
              goal: 2,
              count: 0,
              isEnabled: true,
            },
            sale: {
              goal: 1,
              count: 0,
              isEnabled: true,
            },
            salesSum: 0,
            averageTicket: 150000,
            financialGoal: 500000,
            lostStep: true,
            active: true,
            strategy: {
              id: '212e226f-7ca3-4f1d-ab3e-f781aebe1d3d',
              funnelId: '8d474d2f-5cda-4415-9218-fdd174c67bdb',
              name: 'Oferta Direta 2',
              description: 'Estratégia',
              link: 'https://www.google.com.br/',
              icon: '',
              qtdMessages: 1000,
              qtdConversations: 500,
              qtdAppointments: 200,
              qtdSchedules: 300,
              qtdNegotiations: 0,
              active: true,
            },
          },
        ],
      });
    } catch {
      toast.error('Erro ao criar a campanha.');
    } finally {
      setIsLoading(false);
    }
  }

  function toggleStrategy(strategyId: string) {
    setSelectedStrategies((prevState) => {
      if (prevState.includes(strategyId)) {
        return prevState.filter((strategy) => strategy !== strategyId);
      }

      return [...prevState, strategyId];
    });
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Anjos', link: '/' },
          { label: 'Campanhas', link: '/campaigns/list' },
          { label: 'Nova Campanha' },
        ]}
      />

      <Grid container spacing={6}>
        <Grid item xs={12} className='page-card-mui'>
          <Card>
            {!createdData && <CardHeader title='Adicionar nova campanha' />}

            <form onSubmit={handleSubmit(onSubmit)}>
              {createdData ? (
                <CreatedCampaigns campaign={createdData} />
              ) : (
                <>
                  {currentRoute === 'main' ? (
                    <CardContent style={{ marginTop: '-1rem' }}>
                      {mountForm({
                        errors,
                        fields: campaignFormFields({
                          autoPilot: (
                            <Button
                              variant='outlined'
                              onClick={() => setIsAuthPilot(true)}
                              sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.25rem',
                                padding: '1rem 0.5rem',
                                borderRadius: '6px',
                                width: '100%',
                                color: isAutoPilot
                                  ? 'text.disabled'
                                  : 'text.disabled',
                                borderColor: isAutoPilot
                                  ? 'primary.main'
                                  : 'text.disabled',
                                backgroundColor: isAutoPilot
                                  ? 'primary.main'
                                  : '',
                              }}
                            >
                              <Icon icon='tabler:motorbike' />
                              <Typography fontSize='15px' fontWeight='600'>
                                Piloto automático
                              </Typography>
                              <Typography fontSize='13px'>
                                Deixe que o sistema crie as estratégias
                              </Typography>
                            </Button>
                          ),
                          manual: (
                            <Button
                              variant='outlined'
                              onClick={() => setIsAuthPilot(false)}
                              sx={{
                                display: 'flex',
                                height: '100%',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.25rem',
                                padding: '1rem 0.5rem',
                                borderRadius: '6px',
                                width: '100%',
                                color: !isAutoPilot
                                  ? 'text.disabled'
                                  : 'text.disabled',
                                borderColor: !isAutoPilot
                                  ? 'primary.main'
                                  : 'text.disabled',
                                backgroundColor: !isAutoPilot
                                  ? 'primary.main'
                                  : '',
                              }}
                            >
                              <Icon icon='tabler:adjustments-horizontal' />
                              <Typography fontSize='15px' fontWeight='600'>
                                Manual
                              </Typography>
                              <Typography fontSize='13px'>
                                Configure a sua campanha escolhendo as
                                estratégias
                              </Typography>
                            </Button>
                          ),
                        }),
                        register,
                        setValue,
                      })}

                      <SubmitButton
                        isLoading={isLoading}
                        title={'Prosseguir'}
                        icon={'tabler:arrow-narrow-right'}
                      />
                    </CardContent>
                  ) : (
                    <CardContent style={{ marginTop: '-1rem' }}>
                      <Grid
                        width='100%'
                        display='grid'
                        gap='0.5rem'
                        gridTemplateColumns='1fr 1fr'
                      >
                        {data?.data.map((strategy) => (
                          <>
                            <Button
                              key={strategy.id}
                              variant='outlined'
                              onClick={() => toggleStrategy(strategy.id)}
                              sx={{
                                display: 'flex',
                                height: '100%',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.25rem',
                                padding: '1rem 0.5rem',
                                borderRadius: '6px',
                                width: '100%',
                                color: selectedStrategies.includes(strategy.id)
                                  ? 'text.disabled'
                                  : 'primary.main',
                                borderColor: selectedStrategies.includes(
                                  strategy.id,
                                )
                                  ? 'primary.main'
                                  : 'text.disabled',
                                backgroundColor: selectedStrategies.includes(
                                  strategy.id,
                                )
                                  ? 'primary.main'
                                  : '',
                              }}
                            >
                              <Icon icon={`tabler:${strategy.icon}`} />
                              <Typography fontSize='15px' fontWeight='600'>
                                USAR - {"'"}
                                {strategy.name.toUpperCase()}
                                {"'"}
                              </Typography>
                              <Typography fontSize='13px'>
                                {strategy.description}
                              </Typography>
                            </Button>
                            <Button
                              key={strategy.id}
                              variant='outlined'
                              onClick={() => toggleStrategy(strategy.id)}
                              sx={{
                                display: 'flex',
                                height: '100%',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.25rem',
                                padding: '1rem 0.5rem',
                                borderRadius: '6px',
                                width: '100%',
                                color: !selectedStrategies.includes(strategy.id)
                                  ? 'text.disabled'
                                  : 'primary.main',
                                borderColor: !selectedStrategies.includes(
                                  strategy.id,
                                )
                                  ? 'primary.main'
                                  : 'text.disabled',
                                backgroundColor: !selectedStrategies.includes(
                                  strategy.id,
                                )
                                  ? 'primary.main'
                                  : '',
                              }}
                            >
                              <Icon icon={`tabler:${strategy.icon}`} />
                              <Typography fontSize='15px' fontWeight='600'>
                                NÃO USAR - {"'"}
                                {strategy.name.toUpperCase()}
                                {"'"}
                              </Typography>
                              <Typography fontSize='13px'>
                                {strategy.description}
                              </Typography>
                            </Button>
                          </>
                        ))}
                      </Grid>

                      <SubmitButton
                        type='button'
                        onClick={() => onSubmit({})}
                        isLoading={isLoading}
                        title='Prosseguir'
                      />
                    </CardContent>
                  )}
                </>
              )}
            </form>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
