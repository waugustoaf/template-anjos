import { salesFunnelFormFields } from '@/forms/sales-funnel';
import { salesFunnelFormSchema } from '@/forms/sales-funnel/schema';
import { apiServices } from '@/services';
import { ISalesFunnel } from '@/types/entities/ISalesFunnel';
import { mountForm } from '@/utils/form/mount-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

interface SalesFunnelModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSalesFunnel?: ISalesFunnel | null;
  refetch?: () => void;
}

export function SalesFunnelModal({
  defaultSalesFunnel,
  onClose,
  isOpen,
  refetch,
}: SalesFunnelModalProps) {
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(salesFunnelFormSchema),
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
    if (defaultSalesFunnel) {
      reset({
        ...defaultSalesFunnel,
      });
    } else {
      reset(defaultBooleanValues);
    }
  }, [defaultSalesFunnel]);

  async function onSubmit(data: Partial<ISalesFunnel>) {
    try {
      if (defaultSalesFunnel) {
        await apiServices.salesFunnel.update(defaultSalesFunnel.id, data);
        toast.success('Funil de vendas salvo com sucesso.');
      } else {
        await apiServices.salesFunnel.create(data);
        toast.success('Funil de vendas adicionado com sucesso.');
      }

      refetch && refetch();
      router.push('/sales-funnel/list');
      onClose();
    } catch {
      toast.error(
        `Erro ao ${
          defaultSalesFunnel ? 'salvar' : 'adicionar'
        } funil de vendas`,
      );
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {defaultSalesFunnel ? 'Salvar' : 'Adicionar'}&nbsp; funil de vendas
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {mountForm({
            fields: salesFunnelFormFields,
            defaultValues: defaultSalesFunnel || defaultBooleanValues,
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
            <Button onClick={onClose}>Cancelar</Button>
            <Button type='submit' variant='contained'>
              {defaultSalesFunnel ? 'Salvar' : 'Adicionar'}
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}
