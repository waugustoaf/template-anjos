import { Icon } from '@/components/icon';
import { ICategory } from '@/types/entities/ICategory';

import { TextEllipsis } from '@/utils/text';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { SetStateAction } from 'react';
import {ISalesFunnel} from "@/types/entities/ISalesFunnel";

interface CellType {
  row: ICategory;
}

interface CreateCategoryListTableProps {
  categoryToDelete: ICategory | null;
  setCategoryToDelete: (value: SetStateAction<ICategory | null>) => void;
  setCategoryToEdit: (value: SetStateAction<ICategory | null>) => void;
}

export function createCategoryListTable({
  categoryToDelete,
  setCategoryToEdit,
  setCategoryToDelete,
}: CreateCategoryListTableProps) {
  return [
    {
      flex: 0.3,
      field: 'name',
      headerName: 'Categoria',
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
      field: 'autoPilot',
      headerName: 'Piloto Automático',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row.autoPilot ? 'Sim' : 'Não'}
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
                onClick={() => setCategoryToEdit(row)}
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
              <Button >Apagar</Button>
            </DialogActions>
          </Dialog>
        </>
      ),
    },
  ];
}
