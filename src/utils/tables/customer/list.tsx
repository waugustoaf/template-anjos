import {Icon} from '@/components/icon';

import {beautifullyPhone} from '@/utils/text';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Link,
  Tooltip,
} from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {SetStateAction} from 'react';
import {ICustomer} from '@/types/entities/ICustomer';
import CustomAvatar from "@/@core/components/mui/avatar";
import CustomChip from "@/@core/components/mui/chip";
import {ThemeColor} from "@/types/app/layout";

interface CellType {
  row: ICustomer;
}

interface CreateListTableProps {
  customerToDelete: ICustomer | null;
  setCustomerToDelete: (value: SetStateAction<ICustomer | null>) => void;
  handleDeleteCustomer: () => void;
  setCustomerToEdit: (value: SetStateAction<ICustomer | null>) => void;
}

interface UserStatusType {
  [key: string]: ThemeColor;
}

function getLeadStatus(status: ICustomer['status']) {
  switch (status) {
    case 'CLOSED':
      return 'Fechado';
    case 'OPEN':
      return 'Aberto';
    case 'LOST':
      return 'Perdido';
    default:
      return status;
  }
}

const statusObj: UserStatusType = {
  CLOSED: 'success',
  OPEN: 'warning',
  LOST: 'error'
};

function getLastAction(lastAction?: string) {
  if (!lastAction) return 'Nenhuma ação realizada';
  switch (lastAction) {
    case 'CREATE':
      return 'Criação';
    case 'MESSAGE':
      return 'Mensagem';
    case 'CONVERSATION':
      return 'Conversa';
    case 'SCHEDULE':
      return 'Agendamento';
    case 'SALE':
      return 'Venda';
    case 'LOST':
      return 'Perdido';
    default:
      return lastAction;
  }
}

function getCurrentStep(currentStep?: string) {
  if (!currentStep) return 'Não informado';
  switch (currentStep) {
    case 'CREATE':
      return 'Criação';
    case 'MESSAGE':
      return 'Mensagem';
    case 'CONVERSATION':
      return 'Conversa';
    case 'SCHEDULE':
      return 'Agendamento';
    case 'APPPOINTMENT':
      return 'Consulta';
    case 'SALE':
      return 'Venda';
    case 'LOST':
      return 'Perdido';
    default:
      return currentStep;
  }
}

function getIconStep(currentStep?: string) {
  if (!currentStep) return 'Não informado';
  switch (currentStep) {
    case 'CREATE':
      return 'Criação';
    case 'MESSAGE':
      return 'message';
    case 'CONVERSATION':
      return 'message-plus';
    case 'SCHEDULE':
      return 'calendar-time';
    case 'APPPOINTMENT':
      return 'clipboard-check'
    case 'SALE':
      return 'currency-dollar';
    case 'LOST':
      return 'Perdido';
    default:
      return currentStep;
  }
}


export function createCustomerListTable({
  customerToDelete,
  setCustomerToDelete,
  handleDeleteCustomer,
  setCustomerToEdit,
}: CreateListTableProps) {
  return [
    {
      flex: 0.2,
      field: 'name',
      sortable: false,
      headerName: 'Nome',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row.name}
            <Box>
              {row.whatsapp ? (
                <Link
                  href={'https://whatsa.me/55' + row.whatsapp}
                  target='_blank'
                >
                  {beautifullyPhone(row.whatsapp || '')}
                </Link>
              ) : (
                'WhatsApp Não informado'
              )} &nbsp;
              {row.instagram ? (
                <Link
                  href={'https://instagram.com/' + row.instagram}
                  target='_blank'
                >
                  @{row.instagram}
                </Link>
              ) : (
                'Instagram não informado'
              )}
            </Box>
          </Typography>
        </Box>
      ),
    },
    {
      flex: 0.2,
      field: 'strategy.id',
      sortable: false,
      headerName: 'Estratégia',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            <Box display='flex' alignItems='center' gap='0.25rem'>

              {row.strategy?.icon ? (
                <CustomAvatar skin='light' sx={{ mr: 4, width: 42, height: 42 }}>
                  <Icon icon={'tabler:'+ row.strategy.icon} />
                </CustomAvatar>
              ) : (
                ''
              )}
              {row.strategy?.name}
            </Box>
          </Typography>
        </Box>
      ),
    },
    {
      flex: 0.1,
      field: 'lastAction',
      sortable: false,
      headerName: 'Última Ação',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography noWrap sx={{ color: 'text.secondary' }}>
              { getLastAction(row.lastAction) }
          </Typography>
        </Box>
      ),
    },
    {
      flex: 0.1,
      field: 'lastStep',
      sortable: false,
      headerName: 'Etapa Atual',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box display='flex' alignItems='center' gap='0.1rem'>
            {row.strategy?.icon ? (
              <CustomAvatar skin='light' sx={{ mr: 4, width: 42, height: 42 }}>
                <Icon icon={ 'tabler:' + getIconStep(row.lastStep) } />
              </CustomAvatar>
            ) : (
              ''
            )}

            <Typography noWrap sx={{ color: 'text.secondary' }}>
              { getCurrentStep(row.lastStep) }
            </Typography>
          </Box>

        </Box>
      ),
    },
    {
      flex: 0.1,
      field: 'status',
      sortable: false,
      headerName: 'Status',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row.status ? (
              <CustomChip
                rounded
                skin='light'
                size='small'
                label={getLeadStatus(row.status.toUpperCase())}
                color={statusObj[row.status.toUpperCase()]}
                sx={{ textTransform: 'capitalize' }}
              />
            ) : (
              ''
            )}
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
              <Link href={`/customers/edit/${row.id}`}>
                <IconButton size='small' sx={{ color: 'text.secondary' }}>
                  <Icon icon='tabler:edit' />
                </IconButton>
              </Link>
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
