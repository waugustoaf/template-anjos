import { ProgressDiv } from '@/components/progress-div';
import { ICampaign } from '@/types/entities/ICampaign';
import { formatCurrencyToBRL, formatNumberFromBase100 } from '@/utils/currency';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface CellType {
  row: ICampaign;
}

function getColor(percentage: number) {
  if (percentage <= 30) {
    return '#EA5455';
  }

  if (percentage <= 60) {
    return '#D2AE6D';
  }

  if (percentage <= 90) {
    return '#00CFE8';
  }

  return '#28C76F';
}

export function createClinicCampaignListTable() {
  return [
    {
      flex: 0.2,
      field: 'month',
      headerName: 'MÊS',
      renderCell: ({ row }: CellType) => (
        <Box>
          <Typography fontWeight='bold'>
            {row.month}&nbsp;{row.year}
          </Typography>
          <Typography color='#777' fontSize='14px'>
            {formatCurrencyToBRL(formatNumberFromBase100(row.financialGoal))} -{' '}
            {formatCurrencyToBRL(formatNumberFromBase100(row.averageTicket))}
          </Typography>
        </Box>
      ),
    },
    {
      flex: 0.1,
      field: 'leads',
      headerName: 'LEADS/FECHADO',
      renderCell: ({ row }: CellType) => (
        <Typography fontWeight='bold'>
          {row.leads}/{row.leadsWithSale}
        </Typography>
      ),
    },
    {
      flex: 0.1,
      field: 'goals',
      headerName: 'META',
      renderCell: ({ row }: CellType) => (
        <Box width='100%'>
          <Typography fontWeight='bold'>
            {Math.round(row.goal / 100)}%
          </Typography>
          <ProgressDiv
            rawPercentage={Math.round(row.goal / 100)}
            color={getColor(row.goal / 100)}
          />
        </Box>
      ),
    },
    {
      flex: 0.1,
      field: 'finalValue',
      headerName: 'FATURAMENTO',
      renderCell: ({ row }: CellType) => (
        <Typography fontWeight='bold' width='100%' textAlign='right'>
          {formatCurrencyToBRL(formatNumberFromBase100(row.finalValue))}
        </Typography>
      ),
    },
  ];
}
