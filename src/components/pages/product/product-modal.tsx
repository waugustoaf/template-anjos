import { productFormFields } from '@/forms/product';
import { productFormSchema } from '@/forms/product/schema';
import { apiServices } from '@/services';
import { IProduct } from '@/types/entities/IProduct';
import { mountForm } from '@/utils/form/mount-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { clearForms } from '@/utils/event/clear-form';
import { formatNumberToBase100 } from '@/utils/currency';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: IProduct | null;
  refetch?: () => void;
}

export function ProductModal({
  defaultProduct,
  onClose,
  isOpen,
  refetch,
}: ProductModalProps) {
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productFormSchema),
  });

  const router = useRouter();

  useEffect(() => {
    if (defaultProduct) {
      reset({
        ...defaultProduct,
      });
    } else {
      reset({});
    }
  }, [defaultProduct]);

  function handleClose() {
    reset();
    onClose();
    clearForms();
  }

  async function onSubmit(data: Partial<IProduct>) {
    try {
      if (defaultProduct) {
        await apiServices.product.update(defaultProduct.id, {
          ...data,
          sellPrice: formatNumberToBase100(data.sellPrice),
        });
        toast.success('Produto salvo com sucesso.');
      } else {
        await apiServices.product.create({
          ...data,
          sellPrice: formatNumberToBase100(data.sellPrice),
        });
        toast.success('Produto adicionado com sucesso.');
      }

      refetch && refetch();
      router.push('/product/list');
      handleClose();
    } catch {
      toast.error(`Erro ao ${defaultProduct ? 'salvar' : 'adicionar'} produto`);
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
        {defaultProduct ? 'Salvar' : 'Adicionar'}&nbsp; Produto
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {mountForm({
            fields: productFormFields,
            defaultValues: defaultProduct,
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
              {defaultProduct ? 'Salvar' : 'Adicionar'}
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}
