import { Icon } from '@/components/icon';
import { ICustomer } from '@/types/entities/ICustomer';
import { formatDateToBR } from '@/utils/date';

import { beautifullyPhone, TextEllipsis } from '@/utils/text';
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
import Link from 'next/link';
import { SetStateAction } from 'react';

interface CellType {
  row: ICustomer;
}

interface CreateCustomerListTableProps {
  customerToDelete: ICustomer | null;
  setCustomerToDelete: (value: SetStateAction<ICustomer | null>) => void;
  handleDeleteCustomer: () => void;
}

export function createCustomerListTable({
  customerToDelete,
  setCustomerToDelete,
  handleDeleteCustomer,
}: CreateCustomerListTableProps) {
  return [
    {
      flex: 0.1,
      field: 'id',
      minWidth: 100,
      headerName: 'ID',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          #{TextEllipsis(row.id, 5)}
        </Typography>
      ),
    },
    {
      flex: 0.2,
      field: 'name',
      headerName: 'Cliente',
      renderCell: ({ row: { name, cellphone } }: CellType) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
            {name}
          </Typography>
          <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
            {beautifullyPhone(cellphone)}
          </Typography>
        </Box>
      ),
    },
    {
      flex: 0.2,
      field: 'whatsApp',
      headerName: 'WhatsApp',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {beautifullyPhone(row.whatsapp)}
        </Typography>
      ),
    },
    {
      flex: 0.2,
      field: 'active',
      headerName: 'Atividade',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
        </Typography>
      ),
    },
    {
      flex: 0.2,
      field: 'createdAt',
      headerName: 'Ativo desde',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {formatDateToBR(row.createdAt)}
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
            <Tooltip title='Apagar cliente'>
              <IconButton
                size='small'
                sx={{ color: 'text.secondary' }}
                onClick={() => setCustomerToDelete(row)}
              >
                <Icon icon='tabler:trash' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Visualizar'>
              <IconButton
                size='small'
                component={Link}
                sx={{ color: 'text.secondary' }}
                href={`/dashboard/customers/edit/${row.id}`}
              >
                <Icon icon='tabler:edit' />
              </IconButton>
            </Tooltip>
          </Box>
          <Dialog
            open={!!customerToDelete}
            onClose={() => setCustomerToDelete(null)}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>Apagar cliente</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                Tem certeza que deseja apagar permanentemente o cliente{' '}
                {customerToDelete?.name}?
              </DialogContentText>
            </DialogContent>
            <DialogActions className='dialog-actions-dense'>
              <Button onClick={() => setCustomerToDelete(null)}>
                Cancelar
              </Button>
              <Button onClick={handleDeleteCustomer}>Apagar</Button>
            </DialogActions>
          </Dialog>
        </>
      ),
    },
  ];
}
