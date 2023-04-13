import { Icon } from '@/components/icon';
import { IClinic } from '@/types/entities/IClinic';

import {
  beautifullyPhone,
  beautifullySimplePhone,
  TextEllipsis,
} from '@/utils/text';
import {
  Avatar,
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
import CustomAvatar from "@/@core/components/mui/avatar";

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
      return 'Não';
    default:
      return 'Sim';
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
      return status;
  }
}

export function createClinicListTable({
  clinicToDelete,
  setClinicToDelete,
  handleDeleteClinic,
}: CreateClinicListTableProps) {
  return [
    {
      flex: 0.3,
      field: 'clinic',
      minWidth: 100,
      headerName: 'Clínica',
      renderCell: ({ row }: CellType) => (
        <Box display='flex' gap='0.8rem'  width='100%'>
          <Avatar
            alt={row.fantasyName}
            src={row.avatar || undefined}
          >
            <Typography fontSize={12}>
              {row.fantasyName.split(' ').map((word) => word[0])}
            </Typography>
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                {TextEllipsis(`${row.name} - ${row.fantasyName}`, 50)}
            </Typography>
            {
              row.phone ?
                <Link href={'https://whatsa.me/55'+row.phone} target='_blank' style={{ textDecoration: 'none', color:'#D2AE6D' }} >
                  { beautifullyPhone(row.phone || '') }
                </Link> :
                'Não informado'
            }
          </Box>
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
      headerName: 'Campanha Ativa',
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
          {getStatus(row.contractStatus)}
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
