import { Icon } from '@/components/icon';
import { IClinic } from '@/types/entities/IClinic';

import {
  beautifullyPhone,
  beautifullySimplePhone,
  TextEllipsis,
} from '@/utils/text';
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
  row: IClinic;
}

interface CreateClinicListTableProps {
  clinicToDelete: IClinic | null;
  setClinicToDelete: (value: SetStateAction<IClinic | null>) => void;
  handleDeleteClinic: () => void;
}

function getPlanStatus(status: string) {
  switch (status) {
    case 'NOPLAN':
      return 'Sem plano';
    default:
      return 'Desconhecido';
  }
}

function getStatus(status: IClinic['status']) {
  switch (status) {
    case 'ACTIVE':
      return 'Ativo';
    case 'INACTIVE':
      return 'Inativo';
    case 'BLOCKED':
      return 'Bloqueado';
    default:
      return 'Desconhecido';
  }
}

export function createClinicListTable({
  clinicToDelete,
  setClinicToDelete,
  handleDeleteClinic,
}: CreateClinicListTableProps) {
  return [
    {
      flex: 0.1,
      field: 'id',
      headerName: 'ID',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          #{TextEllipsis(row.id, 5)}
        </Typography>
      ),
    },
    {
      flex: 0.3,
      field: 'clinic',
      minWidth: 100,
      headerName: 'Clínica',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
            {TextEllipsis(`${row.name} - ${row.fantasyName}`, 40)}
          </Typography>
          {beautifullySimplePhone(row.phone)}
        </Box>
      ),
    },
    {
      flex: 0.1,
      field: 'category',
      headerName: 'Categoria',
      renderCell: ({ row }: CellType) => (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.category?.name || 'Sem categoria'}
        </Typography>
      ),
    },
    {
      flex: 0.1,
      field: 'plan',
      headerName: 'Plano',
      renderCell: ({ row }: CellType) => (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {getPlanStatus(row.planStatus)}
        </Typography>
      ),
    },
    {
      flex: 0.1,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }: CellType) => (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {getStatus(row.status)}
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
            {/* <Tooltip title='Apagar cliente'>
              <IconButton
                size='small'
                sx={{ color: 'text.secondary' }}
                onClick={() => setClinicToDelete(row)}
              >
                <Icon icon='tabler:trash' />
              </IconButton>
            </Tooltip> */}
            <Tooltip title='Editar'>
              <IconButton
                size='small'
                component={Link}
                sx={{ color: 'text.secondary' }}
                href={`/clinics/edit/${row.id}`}
              >
                <Icon icon='tabler:edit' />
              </IconButton>
            </Tooltip>
          </Box>
          <Dialog
            open={!!clinicToDelete}
            onClose={() => setClinicToDelete(null)}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>Apagar clínica</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                Tem certeza que deseja apagar permanentemente a clínica{' '}
                {clinicToDelete?.name}?
              </DialogContentText>
            </DialogContent>
            <DialogActions className='dialog-actions-dense'>
              <Button onClick={() => setClinicToDelete(null)}>Cancelar</Button>
              <Button onClick={handleDeleteClinic}>Apagar</Button>
            </DialogActions>
          </Dialog>
        </>
      ),
    },
  ];
}
