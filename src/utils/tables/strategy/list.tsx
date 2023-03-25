import { Icon } from '@/components/icon';
import { ISalesFunnel } from '@/types/entities/ISalesFunnel';

import { TextEllipsis } from '@/utils/text';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SetStateAction } from 'react';
import {IStrategy} from "@/types/entities/IStrategy";

interface CellType {
  row: IStrategy;
}

interface CreateListTableProps {
  strategyToDelete: IStrategy | null;
  setStrategyToDelete: (value: SetStateAction<IStrategy | null>) => void;
  handleDeleteStrategy: () => void;
  setStrategyToEdit: (value: SetStateAction<IStrategy | null>) => void;
}

export function createStrategyListTable({
  strategyToDelete,
  setStrategyToDelete,
  handleDeleteStrategy,
  setStrategyToEdit
}: CreateListTableProps) {
  return [
    {
      flex: 0.1,
      field: 'id',
      minWidth: 100,
      headerName: 'ID',
      renderCell: ({ row }: CellType) => (
        <Button
          sx={{ padding: '0', margin: '0' }}
          onClick={() => setStrategyToEdit(row)}
        >
          <Typography sx={{ color: 'text.secondary' }}>
            #{TextEllipsis(row.id, 5)}
          </Typography>
        </Button>
      ),
    },
    {
      flex: 0.2,
      field: 'name',
      headerName: 'Nome',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row.name}
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
            <Tooltip title='Apagar'>
              <IconButton
                size='small'
                sx={{ color: 'text.secondary' }}
                onClick={() => setStrategyToDelete(row)}
              >
                <Icon icon='tabler:trash' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Editar'>
              <IconButton
                size='small'
                sx={{ color: 'text.secondary' }}
                onClick={() => setStrategyToEdit(row)}
              >
                <Icon icon='tabler:edit' />
              </IconButton>
            </Tooltip>
          </Box>
          <Dialog
            open={!!strategyToDelete}
            onClose={() => setStrategyToDelete(null)}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>Apagar a estratégia</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                Tem certeza que deseja apagar permanentemente a estratégia{' '}
                {strategyToDelete?.name}?
              </DialogContentText>
            </DialogContent>
            <DialogActions className='dialog-actions-dense'>
              <Button onClick={() => setStrategyToDelete(null)}>
                Cancelar
              </Button>
              <Button onClick={handleDeleteStrategy}>Apagar</Button>
            </DialogActions>
          </Dialog>
        </>
      ),
    },
  ];
}
