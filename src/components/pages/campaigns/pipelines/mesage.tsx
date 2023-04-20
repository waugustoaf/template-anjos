import { apiServices } from '@/services';
import { GetCustomerCBResponse } from '@/services/customer/types';
import { mountForm } from '@/utils/form/mount-form';
import { beautifullyPhone } from '@/utils/text';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { SubmitButton } from '@/components/form/submit-button';

interface PipelineCustomerMessageProps {
  customer: GetCustomerCBResponse['message'][0];
  boardId: string;
  onClose: () => void;
  refetch: () => void;
}

export function PipelineCustomerMessage({
  customer,
  boardId,
  onClose,
  refetch,
}: PipelineCustomerMessageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const defaultValues: any = { message: '' };

  const {
    register,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  async function onSubmit(data: any) {
    try {
      setIsLoading(true);

      await apiServices.action.message({
        message: data.message,
        customerId: customer.id,
        boardId,
      });

      refetch();
      onClose();
    } catch {
      toast.error('Erro ao prosseguir essa etapa');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Box
      padding='1rem'
      display='flex'
      alignItems='center'
      flexDirection='column'
    >
      <Typography fontSize='24px' fontWeight='bold'>
        Ações de cliente
      </Typography>

      <Typography>
        {`${customer.name} - ${beautifullyPhone(customer.whatsApp)}`}
      </Typography>

      <Box
        display='flex'
        alignItems='center'
        gap='1rem'
        width='100%'
        justifyContent='space-between'
        flexDirection={{ sx: 'column', md: 'column', lg: 'row' }}
        marginTop='1rem'
      >
        <Button
          variant='contained'
          sx={{
            whiteSpace: 'nowrap',
            textTransform: 'capitalize',
            width: '100%',
            minWidth: 'fit-content',
          }}
        >
          Msg. Rede Social
        </Button>
        <Button
          variant='text'
          sx={{
            whiteSpace: 'nowrap',
            textTransform: 'capitalize',
            width: '100%',
            minWidth: 'fit-content',
          }}
        >
          Msg. Conversa
        </Button>
        <Button
          variant='text'
          sx={{
            whiteSpace: 'nowrap',
            textTransform: 'capitalize',
            width: '100%',
            minWidth: 'fit-content',
          }}
        >
          Consulta
        </Button>
        <Button
          variant='text'
          sx={{
            whiteSpace: 'nowrap',
            textTransform: 'capitalize',
            width: '100%',
            minWidth: 'fit-content',
          }}
        >
          Agendamento
        </Button>
        <Button
          variant='text'
          sx={{
            whiteSpace: 'nowrap',
            textTransform: 'capitalize',
            width: '100%',
            minWidth: 'fit-content',
          }}
        >
          Venda
        </Button>
      </Box>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box marginTop='1rem' width='100%'>
          {mountForm({
            fields: [
              {
                name: 'message',
                rowSize: 12,
                title: 'Mensagem',
                type: 'textarea',
                placeholder: 'Mensagem que foi enviada',
              },
            ],
            errors,
            defaultValues,
            register,
            setValue,
            trigger,
          })}
        </Box>

        <Box display='flex' alignItems='center' gap='1rem'>
          <SubmitButton isLoading={isLoading} title='Salvar' />
          <Button variant='text' onClick={onClose} sx={{ marginTop: '32px' }}>
            Cancelar
          </Button>
        </Box>
      </form>
    </Box>
  );
}
