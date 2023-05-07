/* eslint-disable react-hooks/exhaustive-deps */
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from '@mui/lab';
import { Box, CardHeader, Typography } from '@mui/material';
import { timelineItemClasses } from '@mui/lab/TimelineItem';
import { formatDateToBRExtension } from '@/utils/date';
import { apiServices } from '@/services';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@/components/spinner';
import moment from 'moment';
import { ICustomer } from '@/types/entities/ICustomer';
import { useMemo } from 'react';
import {
  formatCurrencyToBRL,
  formatNumberFromBase100,
  formatNumberFromBase100Brl,
} from '@/utils/currency';

interface CustomerSalesProps {
  sales: ICustomer['sales'];
}

export function CustomerSales({ sales }: CustomerSalesProps) {
  const totalPrice = useMemo(
    () =>
      sales.reduce((prevValue, currState) => prevValue + currState.value, 0),
    [sales],
  );

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
      gridColumn={{ xs: '1 / 4', lg: '1 / 4' }}
    >
      <Box width='100%'>
        <Typography fontWeight='500' fontSize='18px'>Vendas realizadas</Typography>
        <Typography
          fontSize='14px'
          color='#666'
        >{`Total de ${formatNumberFromBase100Brl(totalPrice)}`}</Typography>
      </Box>

      <Box marginTop='1rem' width='100%'>
        {sales.map((sale) => (
          <Box
            key={sale.id}
            width='100%'
            marginTop='0.5rem'
            display='flex'
            alignItems='center'
            justifyContent='space-between'
          >
            <Box flex={1}>
              <Typography fontWeight='600' fontSize='16px'>
                {sale.product.name}
              </Typography>
              <Typography color='#666' fontSize='14px'>
                {moment(new Date(sale.createdAt)).format('DD/MM/yyyy')}
              </Typography>
            </Box>

            <Typography fontWeight='600' fontSize='16px'>
              {formatNumberFromBase100Brl(sale.value)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
