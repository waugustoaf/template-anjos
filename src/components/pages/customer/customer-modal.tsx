import { customerFormSchema } from '@/forms/customer/schema';
import { apiServices } from '@/services';
import { mountForm } from '@/utils/form/mount-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { ICustomer } from '@/types/entities/ICustomer';
import { customerFormFields } from '@/forms/customer';
import { clearForms } from '@/utils/event/clear-form';

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCustomer?: Partial<ICustomer> | null;
  refetch?: () => void;
  notRedirect?: boolean;
}

export function CustomerModal({
  defaultCustomer,
  onClose,
  isOpen,
  refetch,
  notRedirect,
}: CustomerModalProps) {
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(customerFormSchema),
  });

  const router = useRouter();

  useEffect(() => {
    if (defaultCustomer) {
      reset({
        ...defaultCustomer,
      });
    } else {
      reset({});
    }
  }, [defaultCustomer]);

  function handleClose() {
    reset();
    clearForms();
    onClose();
  }

  async function onSubmit(data: Partial<ICustomer>) {
    try {
      if (defaultCustomer?.id) {
        await apiServices.customer.update(defaultCustomer?.id || '', {
          ...data,
          instagram: data.instagram?.replace('@', ''),
        });
        toast.success('Cliente salvo com sucesso.');
      } else {
        await apiServices.customer.create({
          ...data,
          instagram: data.instagram?.replace('@', ''),
        });
        toast.success('Cliente adicionado com sucesso.');
      }

      refetch && refetch();

      if (!notRedirect) {
        router.push('/customers/list');
      }

      handleClose();
    } catch {
      toast.error(
        `Erro ao ${defaultCustomer ? 'salvar' : 'adicionar'} cliente`,
      );
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {defaultCustomer ? 'Salvar' : 'Adicionar'}&nbsp;Cliente
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {mountForm({
            fields: customerFormFields,
            defaultValues: defaultCustomer,
            errors,
            register: register,
            setValue,
            trigger,
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
