import {Icon} from '@/components/icon';
import {ICampaignFull} from '@/types/entities/ICampaign';
import {Box, Button, Typography} from '@mui/material';
import Link from 'next/link';
import {useMemo, useState} from 'react';
import CustomAvatar from '@/@core/components/mui/avatar'
import {useTheme} from "@mui/material/styles";

interface CreatedCampaignsProps {
  campaign: ICampaignFull;
}

export function CreatedCampaigns({ campaign }: CreatedCampaignsProps) {
  const [currentStrategyCampaign, setCurrentStrategyCampaign] = useState(campaign.strategiesCampaign[0]);
  const theme = useTheme()

  const fields = useMemo(() => {
    return [
      'message',
      'conversation',
      'schedule',
      'appointment',
      'sale',
    ].reduce((prevState, currValue) => {
      const currentItem = (currentStrategyCampaign as any)[currValue as any] as any;

      if (currentItem.isEnable) {
        return [...prevState, { ...currentItem, name: currValue }];
      }

      return prevState;
    }, [] as any[]);
  }, [currentStrategyCampaign]);

  const maxValue = useMemo(() => {
    let maxValue = 0;

    fields.forEach((item) => {
      if (item.goal > maxValue) maxValue = item.goal;
    });

    return maxValue;
  }, [fields]);

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

  function getPercentage(value: number) {
    const percentage = (value * 100) / maxValue;

    return (percentage / 100) * 95;
  }

  return (
    <>
      <Typography margin='1rem auto 0' textAlign='center' fontWeight='bold'>
        Estratégias
      </Typography>
      <Box
        margin='1.5rem'
        width='95%'
        display='grid'
        gap='0.5rem'
        gridTemplateColumns={{
          sx: '1fr',
          md: '1fr 1fr',
          lg: '1fr 1fr 1fr',
          xl: '1fr 1fr 1fr 1fr',
        }}
      >
        {campaign.strategiesCampaign.map((strategyCampaign) => (
          <Button
            key={strategyCampaign.id}
            variant='outlined'
            onClick={() => setCurrentStrategyCampaign(strategyCampaign)}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '1.5rem 0.5rem',
              borderRadius: '6px',
              width: '100%',
              color:
                strategyCampaign.id === currentStrategyCampaign.id
                  ? 'text.disabled'
                  : 'text.disabled',
              borderColor:
                strategyCampaign.id === currentStrategyCampaign.id ? 'primary.main' : 'text.disabled',
              backgroundColor:
                strategyCampaign.id === currentStrategyCampaign.id ? 'primary.main' : '',
            }}
          >
            <Box display='flex' alignItems='center' justifyContent='center'>
              <CustomAvatar  sx={{ mr: 4, width: 42, height: 42 }}>
                <Icon icon={`tabler:${strategyCampaign.strategy.icon}`} />
              </CustomAvatar>
              <Typography fontSize='15px' fontWeight='600'>
                {strategyCampaign.strategy.name}
              </Typography>
            </Box>
            <Typography fontSize='13px'>
              {strategyCampaign.strategy.description}
            </Typography>

            <Typography fontSize='13px'>

                <Link href={strategyCampaign.strategy.link} target='_blank'
                      style={{ textDecoration: 'none', color: theme.palette.text.primary }}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '14px',
                    gap: '0.5rem',
                  }}
                  >
                  <Icon icon='tabler:play' style={{ marginRight: '0.01rem' }} />
                  Assistir aula da estratégia
                  </Box>
                </Link>
            </Typography>
          </Button>
        ))}
      </Box>
      <Box
        marginTop='2rem'
        marginBottom='2rem'
        display='flex'
        flexDirection='column'
        alignItems='center'
        gap='0.15rem'
        padding='1.5rem'
        paddingTop='0'
      >
        {fields.map((field, index) => (
          <Box
            key={field}
            width={`${100 - index * 20}%`}
            minWidth='fit-content'
            height='82px'
            bgcolor='white'
            color='black'
            padding='0.5rem'
            borderRadius='6px'
            display='flex'
            alignItems='center'
            justifyContent='center'
            border='2px solid'
            borderColor='primary.main'
          >
            {translate(field.name)}: {field.goal}
          </Box>
        ))}
      </Box>
      <Box
        display='flex'
        width='100%'
        justifyContent='flex-end'
        padding='0 1.5rem 1.5rem 0'
      >
        <Link
          href={`/campaigns/pipelines?board=${currentStrategyCampaign.id}`}
          style={{ textDecoration: 'none' }}
        >
          <Button variant='contained'>Ir para a Pipeline</Button>
        </Link>
      </Box>
    </>
  );
}
