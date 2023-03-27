import { customerFormSchema } from '@/forms/customer/schema';
import { apiServices } from '@/services';
import { IProduct } from '@/types/entities/IProduct';
import { mountForm } from '@/utils/form/mount-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { ICustomer } from '@/types/entities/ICustomer';
import { customerFormFields } from '@/forms/customer';

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCustomer?: ICustomer | null;
  refetch?: () => void;
}

export function CustomerModal({
  defaultCustomer,
  onClose,
  isOpen,
  refetch,
}: CustomerModalProps) {
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(customerFormSchema),
  });

  const router = useRouter();

  const defaultBooleanValues = useRef({
    conversation: false,
    message: false,
    negotiation: false,
    sale: false,
    schedule: false,
    appointment: false,
  }).current;

  useEffect(() => {
    if (defaultCustomer) {
      reset({
        ...defaultCustomer,
      });
    } else {
      reset(defaultBooleanValues);
    }
  }, [defaultCustomer]);

  async function onSubmit(data: Partial<IProduct>) {
    try {
      if (defaultCustomer) {
        await apiServices.customer.update(defaultCustomer.id, data);
        toast.success('Cliente salvo com sucesso.');
      } else {
        await apiServices.customer.create(data);
        toast.success('Cliente adicionado com sucesso.');
      }

      refetch && refetch();
      router.push('/customer/list');
      onClose();
    } catch {
      toast.error(
        `Erro ao ${defaultCustomer ? 'salvar' : 'adicionar'} cliente`,
      );
    }
  }

  function handleClose() {
    reset(defaultBooleanValues);
    onClose();
  }

  console.log({ defaultCustomer });

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {defaultCustomer ? 'Salvar' : 'Adicionar'}&nbsp; Produto
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {mountForm({
            fields: customerFormFields,
            defaultValues: defaultCustomer || defaultBooleanValues,
            errors,
            register: register,
            setValue,
          })}

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '1.5rem 0 0.5rem',
            }}
          >
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type='submit' variant='contained'>
              {defaultCustomer ? 'Salvar' : 'Adicionar'}
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}
