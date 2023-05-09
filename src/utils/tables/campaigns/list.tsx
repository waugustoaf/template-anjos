import { ICampaign } from '@/types/entities/ICampaign';
import { formatNumberFromBase100Brl } from '@/utils/currency';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip
} from "@mui/material";
import {Icon} from "@/components/icon";

interface CellType {
  row: ICampaign;
}

export function createCampaignListTable(setOpenedModalId: (id: string) => void) {
  return [
    {
      flex: 0.3,
      field: 'campaign',
      minWidth: 100,
      headerName: 'Campanha',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row.campaign}</Typography>
      ),
    },
    {
      flex: 0.1,
      field: 'date',
      headerName: 'MÊS / ANO',
      renderCell: ({ row }: CellType) => (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.month} / {row.year}
        </Typography>
      ),
    },
    {
      flex: 0.2,
      field: 'strategy',
      headerName: 'Estratégia',
      renderCell: ({ row }: CellType) => (
        <Tooltip title={row.strategies}>
          <Typography noWrap sx={{ color: 'text.secondary' }}>
             {row.strategies}
          </Typography>
        </Tooltip>
      ),
    },
    {
      flex: 0.1,
      field: 'leads',
      headerName: 'LEADS / CONVERTIDO',
      renderCell: ({ row }: CellType) => (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.leads} / {row.leadsConverted || 0}
        </Typography>
      ),
    },
    {
      flex: 0.1,
      field: 'meta',
      headerName: 'META / REALIZADO',
      renderCell: ({ row }: CellType) => (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {formatNumberFromBase100Brl(row.financialGoal)}{' '} <br/>
          {formatNumberFromBase100Brl(row.financialResult || 0)}
        </Typography>
      ),
    },
    {
      flex: 0.1,
      minWidth: 140,
      sortable: false,
      field: 'actions',
      headerName: 'Ações',
      renderCell: ({ row }: CellType) => (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title='Mais informações'>
              <IconButton
                size='small'
                sx={{ color: 'text.secondary' }}
                onClick={() => setOpenedModalId(row.id)}
              >
                <Icon icon='tabler:question-mark' />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ),
    },
  ];
}
