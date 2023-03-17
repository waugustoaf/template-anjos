import { Icon } from '@/components/icon';
import { IAngel } from '@/types/entities/IAngel';

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
  row: IAngel;
}

interface CreateAngelListTableProps {
  angelToDelete: IAngel | null;
  setAngelToDelete: (value: SetStateAction<IAngel | null>) => void;
  handleDeleteAngel: () => void;
  setAngelToEdit: (value: SetStateAction<IAngel | null>) => void;
}

export function createAngelListTable({
  angelToDelete,
  setAngelToDelete,
  handleDeleteAngel,
  setAngelToEdit,
}: CreateAngelListTableProps) {
  return [
    {
      flex: 0.1,
      field: 'id',
      minWidth: 100,
      headerName: 'ID',
      renderCell: ({ row }: CellType) => (
        <Button
          sx={{ padding: '0', margin: '0' }}
          onClick={() => setAngelToEdit(row)}
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
            {/* <Tooltip title='Apagar'>
              <IconButton
                size='small'
                sx={{ color: 'text.secondary' }}
                onClick={() => setAngelToDelete(row)}
              >
                <Icon icon='tabler:trash' />
              </IconButton>
            </Tooltip> */}
            <Tooltip title='Editar'>
              <IconButton
                size='small'
                sx={{ color: 'text.secondary' }}
                onClick={() => setAngelToEdit(row)}
              >
                <Icon icon='tabler:edit' />
              </IconButton>
            </Tooltip>
          </Box>
          <Dialog
            open={!!angelToDelete}
            onClose={() => setAngelToDelete(null)}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>
              Apagar o anjo
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                Tem certeza que deseja apagar permanentemente o anjo{' '}
                {angelToDelete?.name}?
              </DialogContentText>
            </DialogContent>
            <DialogActions className='dialog-actions-dense'>
              <Button onClick={() => setAngelToDelete(null)}>Cancelar</Button>
              <Button onClick={handleDeleteAngel}>Apagar</Button>
            </DialogActions>
          </Dialog>
        </>
      ),
    },
  ];
}
