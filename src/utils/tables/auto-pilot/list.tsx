import { Icon } from '@/components/icon';
import {IAutoPilot, IAutoPilotWitMonthDescription, IGetAutoPilot} from '@/types/entities/IAutoPilot';

import { TextEllipsis } from '@/utils/text';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SetStateAction } from 'react';
import {apiServices} from "@/services";

interface CellType {
  row: IGetAutoPilot;
}

interface CreateAutoPilotListTableProps {
  autoPilotToDelete: IAutoPilot | null;
  setAutoPilotToDelete: (value: SetStateAction<IGetAutoPilot | null>) => void;
  handleDeleteAutoPilot: () => void;
  setAutoPilotToEdit: (value: SetStateAction<IGetAutoPilot | null>) => void;
}

export function createAutoPilotListTable({
  autoPilotToDelete,
  setAutoPilotToDelete,
  handleDeleteAutoPilot,
  setAutoPilotToEdit,
}: CreateAutoPilotListTableProps) {

  return [
    {
      flex: 0.1,
      field: 'year',
      headerName: 'Ano',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row.year}
          </Typography>
        </Box>
      ),
    },
    {
      flex: 0.1,
      field: 'monthDescription',
      headerName: 'Mês',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row.monthDescription}
          </Typography>
        </Box>
      ),
    },
    {
      flex: 0.4,
      field: 'strategies',
      headerName: 'Estratégias',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row.strategies.map((strategy) => strategy.name).join(', ')}
          </Typography>
        </Box>
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
            <Tooltip title='Editar'>
              <IconButton
                size='small'
                sx={{ color: 'text.secondary' }}
                onClick={() => setAutoPilotToEdit(row)}
              >
                <Icon icon='tabler:edit' />
              </IconButton>
            </Tooltip>
          </Box>
          <Dialog
            open={!!autoPilotToDelete}
            onClose={() => setAutoPilotToDelete(null)}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>
              Apagar o piloto automático
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                Tem certeza que deseja apagar permanentemente o piloto automático{' '}
                {autoPilotToDelete?.month} / {autoPilotToDelete?.year}?
              </DialogContentText>
            </DialogContent>
            <DialogActions className='dialog-actions-dense'>
              <Button onClick={() => setAutoPilotToDelete(null)}>Cancelar</Button>
              <Button onClick={handleDeleteAutoPilot}>Apagar</Button>
            </DialogActions>
          </Dialog>
        </>
      ),
    },
  ];
}
