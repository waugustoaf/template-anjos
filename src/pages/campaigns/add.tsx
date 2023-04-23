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

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
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

    if (!isAutoPilot && currentRoute === 'main') {
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
      setCreatedData(response.data);
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
                        trigger,
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
                                {(strategy.name || '').toUpperCase()}
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
                                {(strategy.name || '').toUpperCase()}
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
