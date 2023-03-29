import { ProgressDiv } from '@/components/progress-div';
import { IClinic } from '@/types/entities/IClinic';
import { Box, Typography } from '@mui/material';
import moment from 'moment';
import { useMemo } from 'react';

export function ClinicProfileDays({ clinic }: { clinic: Partial<IClinic> }) {
  const dates = useMemo(() => {
    const startDate = moment(clinic.startContract);
    const endDate = moment(clinic.endContract);
    const today = moment();

    return {
      daysUntilEnd: endDate.diff(today, 'days'),
      daysUntilStart: today.diff(startDate, 'days'),
      totalDays: endDate.diff(startDate, 'days'),
    };
  }, []);

  if (!clinic.startContract || !clinic.endContract) return null;

  return (
    <Box
      marginTop='1rem'
      display='flex'
      alignItems='stretch'
      gap='1rem'
      flexDirection='column'
      width='100%'
    >
      {dates.daysUntilEnd < 30 && (
        <Box
          padding='12px'
          bgcolor='rgba(255, 159, 67, 0.16)'
          borderRadius='6px'
          width='100%'
          marginBottom='1rem'
        >
          <Typography fontWeight='bold' color='rgba(255, 159, 67, 1)'>
            Precisa de uma atenção
          </Typography>
          <Typography
            fontSize='13px'
            color='rgba(255, 159, 67, 1)'
            marginTop='10px'
          >
            O plano vai expirar em menos de 30 dias
          </Typography>
        </Box>
      )}

      <Box
        width='100%'
        display='flex'
        alignItems='stretch'
        flexDirection='column'
        gap='0.25rem'
      >
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Typography fontWeight='bold' fontSize='13px'>
            Dias
          </Typography>
          <Typography fontWeight='bold' fontSize='13px'>
            {dates.daysUntilStart} de {dates.totalDays} dias
          </Typography>
        </Box>
        <ProgressDiv max={dates.totalDays} value={dates.daysUntilStart} />
        <Typography fontSize='12px' color='#777'>
          {dates.daysUntilEnd} dias para terminar o plano
        </Typography>
      </Box>
    </Box>
  );
}
