import { Icon } from '@/components/icon';
import { ISalesFunnel } from '@/types/entities/ISalesFunnel';

import { TextEllipsis } from '@/utils/text';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SetStateAction } from 'react';

interface CellType {
  row: ISalesFunnel;
}

interface CreateSalesFunnelListTableProps {
  salesFunnelToDelete: ISalesFunnel | null;
  setSalesFunnelToDelete: (value: SetStateAction<ISalesFunnel | null>) => void;
  handleDeleteSalesFunnel: () => void;
  setSalesFunnelToEdit: (value: SetStateAction<ISalesFunnel | null>) => void;
}

export function createSalesFunnelListTable({
  salesFunnelToDelete,
  setSalesFunnelToDelete,
  handleDeleteSalesFunnel,
  setSalesFunnelToEdit
}: CreateSalesFunnelListTableProps) {
  return [
    {
      flex: 0.3,
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
      flex: 0.3,
      field: 'description',
      headerName: 'Passos',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row.message ? 'Mensagem - ' : ''}
            {row.conversation ? 'Conversa - ' : ''}
            {row.schedule ? 'Agendamento - ' : ''}
            {row.appointment ? 'Consulta - ' : ''}
            {row.sale ? 'Venda ' : ''}
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
                onClick={() => setSalesFunnelToDelete(row)}
              >
                <Icon icon='tabler:trash' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Editar'>
              <IconButton
                size='small'
                sx={{ color: 'text.secondary' }}
                onClick={() => setSalesFunnelToEdit(row)}
              >
                <Icon icon='tabler:edit' />
              </IconButton>
            </Tooltip>
          </Box>
          <Dialog
            open={!!salesFunnelToDelete}
            onClose={() => setSalesFunnelToDelete(null)}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>Apagar o funil de vendas</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                Tem certeza que deseja apagar permanentemente o funil de vendas{' '}
                {salesFunnelToDelete?.name}?
              </DialogContentText>
            </DialogContent>
            <DialogActions className='dialog-actions-dense'>
              <Button onClick={() => setSalesFunnelToDelete(null)}>
                Cancelar
              </Button>
              <Button onClick={handleDeleteSalesFunnel}>Apagar</Button>
            </DialogActions>
          </Dialog>
        </>
      ),
    },
  ];
}
