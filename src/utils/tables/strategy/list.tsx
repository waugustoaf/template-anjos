import { Icon } from '@/components/icon';
import { Theme } from '@mui/material/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Link,
  Tooltip
} from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SetStateAction } from 'react';
import {IStrategy} from "@/types/entities/IStrategy";
import {formatNumberFromBase100} from "@/utils/currency";
import CustomAvatar from "@/@core/components/mui/avatar";

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
      flex: 0.3,
      field: 'name',
      headerName: 'Nome',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            <Box display='flex' justifyContent='center' alignItems='center' width='100%'>
              <CustomAvatar skin='light' sx={{ mr: 4, width: 42, height: 42 }}>
                <Icon icon={'tabler:'+ row.icon} />
              </CustomAvatar>
              {row.name}
            </Box>
          </Typography>
        </Box>
      ),
    },
    {
      flex: 0.3,
      field: 'description',
      headerName: 'Descrição',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography noWrap sx={{ color: 'text.secondary' }}>
              {row.description}
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
                onClick={() => setStrategyToEdit({
                  ...row,
                  qtdMessages: formatNumberFromBase100(row.qtdMessages),
                  qtdConversations: formatNumberFromBase100(row.qtdConversations),
                  qtdAppointments: formatNumberFromBase100(row.qtdAppointments),
                  qtdSchedules: formatNumberFromBase100(row.qtdSchedules),
                })}
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
