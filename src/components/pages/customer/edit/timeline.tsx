/* eslint-disable react-hooks/exhaustive-deps */
import {Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator,} from '@mui/lab';
import {Box, Typography} from '@mui/material';
import {useRef} from 'react';
import {timelineItemClasses} from '@mui/lab/TimelineItem';
import {formatDateToBRExtension} from "@/utils/date";

export function CustomerEditTimeline() {

  /*const { data, isLoading } = useQuery({
      queryKey: ['dashboard'],
    queryFn: () => apiServices.customer.timeline('')
  });

  if (isLoading && !data) return <Spinner />;*/


  const timeline = useRef([
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
  ]).current;

  function getColorByNumber(index: number) {
    const number = index + 1;

    if (number % 3 === 0) return 'success';
    if (number % 2 === 0) return 'secondary';
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
        {timeline.map((item, index) => (
          <TimelineItem key={item.id}>
            <TimelineSeparator>
              <TimelineDot color={getColorByNumber(index)} />

              {index !== timeline.length - 1 && <TimelineConnector />}
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
