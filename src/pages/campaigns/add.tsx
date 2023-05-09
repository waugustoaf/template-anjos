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
import { CreatedCampaigns } from '@/components/pages/campaigns/created';
import { campaignFormFields } from '@/forms/campaigns';
import { campaignFormSchema } from '@/forms/campaigns/schema';
import { apiServices } from '@/services';
import { ICampaign, ICampaignFull } from '@/types/entities/ICampaign';
import { formatNumberToBase100 } from '@/utils/currency';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';

export default function CategoryAddPage() {
  const { user } = useAuth();

  const [currentRoute, setCurrentRoute] = useState('main');
  const [isAutoPilot, setIsAuthPilot] = useState(
    user?.clinic?.category.autoPilot,
  );
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
    let newData: any = {
      ...currentData,
      ..._data,
    };

    setCurrentData((prevState: any) => ({
      ...prevState,
      ..._data,
    }));

    if (!isAutoPilot && currentRoute === 'main') {
      return setCurrentRoute('strategy');
    }

    if (!selectedStrategies.length && !isAutoPilot) {
      return toast.error('Selecione pelo menos uma estratégia.');
    }

    const requestBody = {
      ...newData,
      financialGoal: newData.financialGoal
        ? formatNumberToBase100(newData.financialGoal)
        : undefined,
      averageTicket: newData.averageTicket
        ? formatNumberToBase100(newData.averageTicket)
        : undefined,
      year: parseInt(newData.year) || new Date().getFullYear(),
      month: parseInt(newData.month) || new Date().getMonth(),
      strategies: isAutoPilot ? [] : selectedStrategies,
      autoPilot: isAutoPilot,
    };

    try {
      setIsLoading(true);

      await apiServices.campaign.isOK(requestBody);
    } catch (error: any) {
      if (error.response?.data?.error?.includes('CAMPAIGN_ALREADY_EXISTS')) {
        return toast.error('Já existe uma campanha para esse mês e ano');
      }
    } finally {
      setIsLoading(false);
    }

    try {
      setIsLoading(true);

      const response = await apiServices.campaign.create(requestBody);

      toast.success('Campanha criado com sucesso.');
      setCreatedData(response.data);
    } catch (error: any) {
      if (error.response?.data?.error?.includes('STRATEGIES_REQUIRED')) {
        return toast.error('Piloto automático não configurado.');
      }

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
                          autoPilot: user?.clinic?.category.autoPilot ? (
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
                          ) : (
                            <></>
                          ),
                          manual: user?.clinic?.category.autoPilot ? (
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
                          ) : (
                            <></>
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
