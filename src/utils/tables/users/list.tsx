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
import { IUser } from '@/types/entities/IUser';

interface CellType {
  row: IUser;
}

interface CreateUserListTableProps {
  userToDelete: IUser | null;
  setUserToDelete: (value: SetStateAction<IUser | null>) => void;
  handleDeleteUser: () => void;
  setUserToEdit: (value: SetStateAction<IUser | null>) => void;
}

export function createUserListTable({
  userToDelete,
  setUserToDelete,
  handleDeleteUser,
  setUserToEdit,
}: CreateUserListTableProps) {
  return [
    {
      flex: 0.1,
      field: 'id',
      minWidth: 100,
      headerName: 'ID',
      renderCell: ({ row }: CellType) => (
        <Button
          sx={{ padding: '0', margin: '0' }}
          onClick={() => setUserToEdit(row)}
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
                onClick={() => setUserToEdit(row)}
              >
                <Icon icon='tabler:edit' />
              </IconButton>
            </Tooltip>
          </Box>
          <Dialog
            open={!!userToDelete}
            onClose={() => setUserToDelete(null)}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>Apagar o anjo</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                Tem certeza que deseja apagar permanentemente o usuário{' '}
                {userToDelete?.name}?
              </DialogContentText>
            </DialogContent>
            <DialogActions className='dialog-actions-dense'>
              <Button onClick={() => setUserToDelete(null)}>Cancelar</Button>
              <Button onClick={handleDeleteUser}>Apagar</Button>
            </DialogActions>
          </Dialog>
        </>
      ),
    },
  ];
}
