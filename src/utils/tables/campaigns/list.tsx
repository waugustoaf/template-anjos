import { ICampaign } from '@/types/entities/ICampaign';
import { formatNumberFromBase100Brl } from '@/utils/currency';
import Typography from '@mui/material/Typography';

interface CellType {
  row: ICampaign;
}

export function createCampaignListTable() {
  return [
    {
      flex: 0.1,
      field: 'campaign',
      minWidth: 100,
      headerName: 'Campanha',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          Nome da campanha
        </Typography>
      ),
    },
    {
      flex: 0.2,
      field: 'date',
      headerName: 'MÊS / ANO',
      renderCell: ({ row }: CellType) => (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.year} / {row.month.slice(0, 3)}
        </Typography>
      ),
    },
    {
      flex: 0.2,
      field: 'strategy',
      headerName: 'Estratégia',
      renderCell: ({ row }: CellType) => (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          Desconhecida
        </Typography>
      ),
    },
    {
      flex: 0.2,
      field: 'autoPilot',
      headerName: 'Piloto automático',
      renderCell: ({ row }: CellType) => (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.autoPilot ? 'Sim' : 'Não'}
        </Typography>
      ),
    },
    {
      flex: 0.2,
      field: 'leads',
      headerName: 'LEADS / CONVERTIDO',
      renderCell: ({ row }: CellType) => (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.leads} / {row.goal}
        </Typography>
      ),
    },
    {
      flex: 0.2,
      field: 'meta',
      headerName: 'META / REALIZADO',
      renderCell: ({ row }: CellType) => (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {formatNumberFromBase100Brl(row.financialGoal)} /{' '}
          {formatNumberFromBase100Brl(row.finalValue)}
        </Typography>
      ),
    },
  ];
}
