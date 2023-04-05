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

interface CellType {
  row: IProduct;
}

interface CreateListTableProps {
  productToDelete: IProduct | null;
  setProductToDelete: (value: SetStateAction<IProduct | null>) => void;
  handleDeleteProduct: () => void;
  setProductToEdit: (value: SetStateAction<IProduct | null>) => void;
}

export function createProductListTable({
  productToDelete,
  setProductToDelete,
  handleDeleteProduct,
  setProductToEdit,
}: CreateListTableProps) {
  function handleEditProduct(product: CellType['row']) {
    setProductToEdit({
      ...product,
      sellPrice: formatNumberFromBase100(product.sellPrice),
    });
  }

  return [
    {
      flex: 0.1,
      field: 'id',
      minWidth: 100,
      headerName: 'ID',
      renderCell: ({ row }: CellType) => (
        <Button
          sx={{ padding: '0', margin: '0' }}
          onClick={() => handleEditProduct(row)}
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
      flex: 0.2,
      field: 'sellPrice',
      headerName: 'Valor',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {formatNumberFromBase100Brl(row.sellPrice)}
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
                onClick={() => setProductToDelete(row)}
              >
                <Icon icon='tabler:trash' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Editar'>
              <IconButton
                size='small'
                sx={{ color: 'text.secondary' }}
                onClick={() => handleEditProduct(row)}
              >
                <Icon icon='tabler:edit' />
              </IconButton>
            </Tooltip>
          </Box>
          <Dialog
            open={!!productToDelete}
            onClose={() => setProductToDelete(null)}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>Apagar a produto</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                Tem certeza que deseja apagar permanentemente o produto{' '}
                {productToDelete?.name}?
              </DialogContentText>
            </DialogContent>
            <DialogActions className='dialog-actions-dense'>
              <Button onClick={() => setProductToDelete(null)}>Cancelar</Button>
              <Button onClick={handleDeleteProduct}>Apagar</Button>
            </DialogActions>
          </Dialog>
        </>
      ),
    },
  ];
}
