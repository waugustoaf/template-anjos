/* eslint-disable react-hooks/exhaustive-deps */
import {Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator,} from '@mui/lab';
import {Box, Typography} from '@mui/material';
import {timelineItemClasses} from '@mui/lab/TimelineItem';
import {formatDateToBRExtension} from "@/utils/date";
import {apiServices} from "@/services";
import {useQuery} from "@tanstack/react-query";
import {Spinner} from "@/components/spinner";

interface CustomerTimelineProps {
  customerId?: string;
}



export function CustomerTimeline({customerId}: CustomerTimelineProps) {

  const { data, isLoading } = useQuery({
      queryKey: ['dashboard'],
    queryFn: () => apiServices.customer.timeline(customerId),
  });

  if (isLoading && !data) return <Spinner />;


 /* const timeline = useRef([
    {
      id: '1',
      title: 'Venda',
      description: 'Venda de pacote de emagrecimento',
      date: '2023-04-22',
    },
    {
      id: '2',
      title: 'Agendamento',
      description: 'Agendamento para dia 15/04/2023',
      date: '2023-04-15',
    },
    {
      id: '3',
      title: 'Mensagem enviada',
      description: 'Olá, tudo bem?',
      date: '2023-04-13',
    },
    {
      id: '4',
      title: 'Cadastro',
      description: '',
      date: '2023-04-13',
    },
  ]).current;*/

  function getStepName(step: string): string{
    switch (step) {
      case 'CHANGE_STEP':
        return 'Alteração de etapa';
      case 'Troca de dono':
        return 'Troca de dono';
      case 'Adição de tag':
        return 'Adição de tag';
      case 'register':
        return 'Cadastro';
      default:
        return 'Ação';
    }
  }

  function getColorByNumber(point: number) {
    switch (point) {
      case 1: // Envio de mensagem
      case 2: // Conversa
      case 3: // Agendamento
      case 4: // Consulta
      case 5: // Negociação
        return 'primary';
      case 6: // Venda
        return 'success';
      case 7: // Perdeu Cliente
        return 'error';
      case 8: // Alteração de responsável
        return 'warning';
      case 9: // Alteração da campanha
        return 'warning';
      case 10: // Remoção de tags
        return 'info';
      case 11: // Remoção de tags
        return 'info';
    }

    return 'primary';
  }

  return (
    <Box
      borderRadius='6px'
      boxShadow='0px 2px 4px rgba(15, 20, 34, 0.4)'
      padding='1rem'
      display='flex'
      alignItems='center'
      flexDirection='column'
      height='100%'
      sx={{ overflowY: 'auto' }}
      maxHeight='25rem'
      gridColumn={{ xs: '1 / 4', lg: '2 / 4' }}
    >
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
          width: '100%',
        }}
      >
        {data?.data.map((item, index) => (
          <TimelineItem key={item.id}>
            <TimelineSeparator>
              <TimelineDot color={getColorByNumber(item.point)} />
              {index !== data?.data.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Box>
                <Typography>
                  <strong>{item.title}</strong>
                </Typography>
                <Typography fontSize='14px'>{item.description}</Typography>
                <Typography fontSize='10px'>{formatDateToBRExtension(item.date)}</Typography>
              </Box>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
}
