import { Icon } from '@/components/icon';
import { ICategory } from '@/types/entities/ICategory';

import { TextEllipsis } from '@/utils/text';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { SetStateAction } from 'react';

interface CellType {
  row: ICategory;
}

interface CreateCategoryListTableProps {
  categoryToDelete: ICategory | null;
  setCategoryToDelete: (value: SetStateAction<ICategory | null>) => void;
  handleDeleteCategory: () => void;
}

export function createCategoryListTable({
  categoryToDelete,
  setCategoryToDelete,
  handleDeleteCategory,
}: CreateCategoryListTableProps) {
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
            {/* <Tooltip title='Apagar cliente'>
              <IconButton
                size='small'
                sx={{ color: 'text.secondary' }}
                onClick={() => setCategoryToDelete(row)}
              >
                <Icon icon='tabler:trash' />
              </IconButton>
            </Tooltip> */}
            <Tooltip title='Editar'>
              <IconButton
                size='small'
                component={Link}
                sx={{ color: 'text.secondary' }}
                href={`/categories/edit/${row.id}`}
              >
                <Icon icon='tabler:edit' />
              </IconButton>
            </Tooltip>
          </Box>
          <Dialog
            open={!!categoryToDelete}
            onClose={() => setCategoryToDelete(null)}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>Apagar categoria</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                Tem certeza que deseja apagar permanentemente a categoria{' '}
                {categoryToDelete?.name}?
              </DialogContentText>
            </DialogContent>
            <DialogActions className='dialog-actions-dense'>
              <Button onClick={() => setCategoryToDelete(null)}>
                Cancelar
              </Button>
              <Button onClick={handleDeleteCategory}>Apagar</Button>
            </DialogActions>
          </Dialog>
        </>
      ),
    },
  ];
}
