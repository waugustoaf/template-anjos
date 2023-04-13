import { Icon } from '@/components/icon';
import { ISalesFunnel } from '@/types/entities/ISalesFunnel';

import {beautifullyPhone, TextEllipsis} from '@/utils/text';
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
import {ICustomer} from "@/types/entities/ICustomer";

interface CellType {
  row: ICustomer;
}

interface CreateListTableProps {
  customerToDelete: ICustomer | null;
  setCustomerToDelete: (value: SetStateAction<ICustomer | null>) => void;
  handleDeleteCustomer: () => void;
  setCustomerToEdit: (value: SetStateAction<ICustomer | null>) => void;
}

export function createCustomerListTable({
  customerToDelete,
  setCustomerToDelete,
  handleDeleteCustomer,
  setCustomerToEdit
}: CreateListTableProps) {
  return [
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
      flex: 0.2,
      field: 'instagram',
      headerName: 'Instagram',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            <Box>
              {
                row.instagram ?
                <Link href={'https://instagram.com/'+row.instagram} target='_blank'>
                  @{row.instagram}
                </Link> :
                'Não informado'
              }
            </Box>
          </Typography>
        </Box>
      ),
    },
    {
      flex: 0.2,
      field: 'whatsapp',
      headerName: 'Whatsapp',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            <Box>
              {
                row.whatsapp ?
                  <Link href={'https://whatsa.me/55'+row.whatsapp} target='_blank'>
                    {beautifullyPhone(row.whatsapp || '')}
                  </Link> :
                  'Não informado'
              }
            </Box>
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
                onClick={() => setCustomerToDelete(row)}
              >
                <Icon icon='tabler:trash' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Editar'>
              <IconButton
                size='small'
                sx={{ color: 'text.secondary' }}
                onClick={() => setCustomerToEdit(row)}
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
            <DialogTitle id='alert-dialog-title'>Apagar a cliente</DialogTitle>
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
