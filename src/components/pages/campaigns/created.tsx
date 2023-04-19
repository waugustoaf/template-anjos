import { Icon } from '@/components/icon';
import { ICampaignFull } from '@/types/entities/ICampaign';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { useMemo, useState } from 'react';

interface CreatedCampaignsProps {
  campaign: ICampaignFull;
}

export function CreatedCampaigns({ campaign }: CreatedCampaignsProps) {
  const [currentBoard, setCurrentBoard] = useState(campaign.boards[0]);

  const fields = useMemo(() => {
    return [
      'message',
      'conversation',
      'schedule',
      'appointment',
      'sale',
    ].reduce((prevState, currValue) => {
      const currentItem = (currentBoard as any)[currValue as any] as any;

      if (currentItem.isEnabled) {
        return [...prevState, { ...currentItem, name: currValue }];
      }

      return prevState;
    }, [] as any[]);
  }, [currentBoard]);

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
        {campaign.boards.map((board) => (
          <Button
            key={board.id}
            variant='outlined'
            onClick={() => setCurrentBoard(board)}
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
                board.id === currentBoard.id
                  ? 'text.disabled'
                  : 'text.disabled',
              borderColor:
                board.id === currentBoard.id ? 'primary.main' : 'text.disabled',
              backgroundColor:
                board.id === currentBoard.id ? 'primary.main' : '',
            }}
          >
            <Icon icon={`tabler:${board.strategy.icon}`} />
            <Typography fontSize='15px' fontWeight='600'>
              {board.strategy.name}
            </Typography>
            <Typography fontSize='13px'>
              {board.strategy.description}
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
      >
        {fields.map((field) => (
          <Box
            key={field}
            width={`${getPercentage(field.goal)}%`}
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
          href={`/campaigns/pipelines/${currentBoard.id}`}
          style={{ textDecoration: 'none' }}
        >
          <Button variant='contained'>Ir para a Pipeline</Button>
        </Link>
      </Box>
    </>
  );
}
