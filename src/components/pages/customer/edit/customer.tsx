/* eslint-disable react-hooks/exhaustive-deps */
import { Icon } from '@/components/icon';
import { ICustomer } from '@/types/entities/ICustomer';
import { beautifullyPhone } from '@/utils/text';
import { Box, Button, Typography } from '@mui/material';
import moment from 'moment';
import { useState } from 'react';
import { CustomerModal } from '../customer-modal';

interface CustomerEditCustomerProps {
  customer?: ICustomer;
  refetch: () => {};
}

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

        <Typography
          sx={{
            padding: '0.15rem',
            borderRadius: '6px',
            color: '#0f0',
            backgroundColor: '#00ff006b',
            fontSize: '10px',
            marginTop: '0.5rem',
          }}
        >
          Fechado
        </Typography>

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
                <strong>R$ 8.500,00</strong>
              </Typography>
              <Typography
                sx={{
                  marginTop: 'auto',
                  fontSize: '12px',
                }}
              >
                Soma de vendas
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
                <strong>3</strong>
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
        </Box>

        <Box
          marginTop='1rem'
          marginBottom='1rem'
          height='1px'
          width='100%'
          bgcolor='#434968'
        />

        <Box width='100%'>
          <Typography color='#434968' fontSize='14px'>
            DETALHES
          </Typography>

          <Typography fontSize='14px' marginTop='0.5rem'>
            <strong>Nome Completo: </strong>
            {customer.name}
          </Typography>
          <Typography fontSize='14px'>
            <strong>Email: </strong>
            {customer.email}
          </Typography>
          <Typography fontSize='14px'>
            <strong>Status: </strong>
            Ativo
          </Typography>
          <Typography fontSize='14px'>
            <strong>Cidade: </strong>
            {customer.city || 'Não informado'}
          </Typography>
          <Typography fontSize='14px'>
            <strong>Telefone: </strong>
            {beautifullyPhone(customer.whatsApp) || 'Não informado'}
          </Typography>
          <Typography fontSize='14px'>
            <strong>Última ação: </strong>
            {moment(new Date()).format('DD/MM/YYYY')} - Mensagem
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
