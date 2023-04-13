import { Icon } from '@/components/icon';

import { IProduct } from '@/types/entities/IProduct';
import {formatCurrencyToBRL, formatNumberFromBase100, formatNumberFromBase100Brl} from '@/utils/currency';
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
import {ICustomerTag} from "@/types/entities/ICustomerTag";

interface CellType {
  row: ICustomerTag;
}

interface CreateListTableProps {
  customerTagToDelete: ICustomerTag | null;
  setCustomerTagToDelete: (value: SetStateAction<ICustomerTag | null>) => void;
  handleDeleteCustomerTag: () => void;
  setCustomerTagToEdit: (value: SetStateAction<ICustomerTag | null>) => void;
}

export function createCustomerTagListTable({
  customerTagToDelete,
  setCustomerTagToDelete,
  handleDeleteCustomerTag,
  setCustomerTagToEdit,
}: CreateListTableProps) {
  function handleEditCustomerTag(customerTag: CellType['row']) {
    setCustomerTagToEdit({
      ...customerTag,
    });
  }

  return [
    {
      flex: 0.6,
      field: 'tag',
      headerName: 'Tag',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row.tag}
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
                onClick={() => setCustomerTagToDelete(row)}
              >
                <Icon icon='tabler:trash' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Editar'>
              <IconButton
                size='small'
                sx={{ color: 'text.secondary' }}
                onClick={() => handleEditCustomerTag(row)}
              >
                <Icon icon='tabler:edit' />
              </IconButton>
            </Tooltip>
          </Box>
          <Dialog
            open={!!customerTagToDelete}
            onClose={() => setCustomerTagToDelete(null)}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>Apagar a produto</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                Tem certeza que deseja apagar permanentemente a tag{' '}
                {customerTagToDelete?.tag}?
              </DialogContentText>
            </DialogContent>
            <DialogActions className='dialog-actions-dense'>
              <Button onClick={() => setCustomerTagToDelete(null)}>Cancelar</Button>
              <Button onClick={handleDeleteCustomerTag}>Apagar</Button>
            </DialogActions>
          </Dialog>
        </>
      ),
    },
  ];
}
