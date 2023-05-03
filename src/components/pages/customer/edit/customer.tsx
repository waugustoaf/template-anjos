/* eslint-disable react-hooks/exhaustive-deps */
import {Icon} from '@/components/icon';
import {ICustomer} from '@/types/entities/ICustomer';
import {beautifullyPhone, TextEllipsis} from '@/utils/text';
import {Avatar, Box, Button, Link, Tooltip, Typography} from '@mui/material';
import {useState} from 'react';
import {CustomerModal} from '../customer-modal';
import {formatNumberFromBase100Brl} from "@/utils/currency";
import CustomChip from "@/@core/components/mui/chip";
import {ThemeColor} from "@/types/app/layout";

interface CustomerEditCustomerProps {
  customer?: ICustomer;
  refetch: () => {};
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

export function CustomerEditCustomer({
  customer,
  refetch,
}: CustomerEditCustomerProps) {
  const [customerToEdit, setCustomerToEdit] = useState<ICustomer | null>(null);

  if (!customer) return null;

  return (
    <>
      <Box
        borderRadius='6px'
        boxShadow='0px 2px 4px rgba(15, 20, 34, 0.4)'
        padding='1rem'
        display='flex'
        alignItems='center'
        flexDirection='column'
        gridColumn={{ xs: '1 / 4', lg: '1 / 2' }}
      >
        <Typography>
          <strong>{customer.name}</strong>
        </Typography>

        {customer.status ? (
          <CustomChip
            rounded
            skin='light'
            size='small'
            label={getLeadStatus(customer.status.toUpperCase())}
            color={statusObj[customer.status.toUpperCase()]}
            sx={{ textTransform: 'capitalize' }}
          />
        ) : (
          ''
        )}

        <Box display='flex' alignItems='center' gap='1rem' marginTop='1rem'>
          <Box display='flex' alignItems='center' gap='0.5rem'>
            <Box
              padding='0.5rem'
              borderRadius='50%'
              bgcolor='#ea54544e'
              display='flex'
              alignItems='center'
              justifyContent='center'
            >
              <Icon color='#EA5455' icon='tabler:shopping-cart' />
            </Box>

            <Box>
              <Typography>
                <strong>{formatNumberFromBase100Brl(customer.sumSales)}</strong>
              </Typography>
              <Typography
                sx={{
                  marginTop: 'auto',
                  fontSize: '12px',
                }}
              >
                Vendas
              </Typography>
            </Box>
          </Box>

          <Box display='flex' alignItems='center' gap='0.5rem'>
            <Box
              padding='0.5rem'
              borderRadius='50%'
              bgcolor='#7267f041'
              display='flex'
              alignItems='center'
              justifyContent='center'
            >
              <Icon color='#7367F0' icon='tabler:chart-pie-2' />
            </Box>

            <Box>
              <Typography>
                <strong>{customer.countSales}</strong>
              </Typography>
              <Typography
                sx={{
                  marginTop: 'auto',
                  fontSize: '12px',
                }}
              >
                Negócios
              </Typography>
            </Box>

          </Box>

          <Box display='flex' alignItems='center' gap='0.5rem'>
            <Box
              padding='0.1rem'
              borderRadius='50%'
              display='flex'
              alignItems='center'
              justifyContent='center'
            >
              <Tooltip title={customer.owner.name}>
                <Avatar
                  alt={customer.owner.name}
                  src={customer.owner?.avatar || undefined}
                >
                  <Typography fontSize={12}>
                    {customer.owner.name.split(' ').map((word) => word[0])}
                  </Typography>
                </Avatar>
              </Tooltip>
            </Box>

            <Box>
              <Tooltip title={customer.owner.name}>
                <Typography
                  sx={{
                    marginTop: 'auto',
                    fontSize: '12px',
                  }}
                >
                  {TextEllipsis(`${customer.owner.name}`, 15)}
                </Typography>
              </Tooltip>

            </Box>

          </Box>
        </Box>

        <Box
          marginTop='1rem'
          marginBottom='1rem'
          height='1px'
          width='100%'
          bgcolor='#434968'
        />

        <Box width='100%' sx={{ color: 'text.secondary' }}>

          <Typography fontSize='14px' marginTop='0.5rem' sx={{ color: 'text.secondary' }}>
            <strong>Nome Completo: </strong>
            {customer.name}
          </Typography>
          <Typography fontSize='14px' sx={{ color: 'text.secondary' }}>
            <strong>Email: </strong>
            {customer.email}
          </Typography>
          <Typography fontSize='14px' sx={{ color: 'text.secondary' }}>
            <strong>Instagram: </strong>

            {customer.instagram && (
              <Link href={'https://instagram.com/'+customer.instagram} target='_blank' style={{ textDecoration: 'none' }} sx={{ color: 'text.secondary' }}>
                @{customer.instagram}
              </Link>
            )}
          </Typography>
          <Typography fontSize='14px' sx={{ color: 'text.secondary' }}>
            <strong>Celular / Whatsapp: </strong>
            <Link href={'https://whatsa.me/55'+customer.whatsapp} target='_blank' style={{ textDecoration: 'none' }} sx={{ color: 'text.secondary' }} >
              {beautifullyPhone(customer.whatsapp) || 'Não informado'}
            </Link>
          </Typography>
          <Typography fontSize='14px' sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
            <strong>Origem: </strong>
            {customer.origin}
          </Typography>
          <Typography fontSize='14px' sx={{ color: 'text.secondary' }}>
            <strong>Cidade: </strong>
            {customer.city || 'Não informado'}
            {' - '}
            {customer.state || ''}
          </Typography>
          <Typography fontSize='14px' sx={{ color: 'text.secondary' }}>
            <strong>Telefone: </strong>
            {beautifullyPhone(customer.whatsApp) || 'Não informado'}
          </Typography>
          <Typography fontSize='14px' sx={{ color: 'text.secondary' }}>
            <strong>Última ação: </strong>
            --------
            FALTA CARREGAR
          </Typography>
        </Box>

        <Button
          variant='contained'
          sx={{ marginTop: '1rem' }}
          onClick={() => setCustomerToEdit(customer)}
        >
          Editar
        </Button>
      </Box>

      <CustomerModal
        isOpen={!!customerToEdit}
        onClose={() => setCustomerToEdit(null)}
        defaultCustomer={customerToEdit}
        refetch={refetch}
        notRedirect
      />
    </>
  );
}
