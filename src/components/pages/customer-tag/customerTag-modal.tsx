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
import {ICustomerTag} from "@/types/entities/ICustomerTag";
import {customerTagFormFields} from "@/forms/customer-tag";
import {customerTagFormSchema} from "@/forms/customer-tag/schema";

interface CustomerTagModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCustomerTag?: ICustomerTag | null;
  refetch?: () => void;
}

export function CustomerTagModal({
  defaultCustomerTag,
  onClose,
  isOpen,
  refetch,
}: CustomerTagModalProps) {
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(customerTagFormSchema),
  });

  const router = useRouter();

  useEffect(() => {
    if (defaultCustomerTag) {
      reset({
        ...defaultCustomerTag,
      });
    } else {
      reset({});
    }
  }, [defaultCustomerTag]);

  function handleClose() {
    reset();
    onClose();
    clearForms();
  }

  async function onSubmit(data: Partial<IProduct>) {
    try {
      if (defaultCustomerTag) {
        await apiServices.customerTag.update(defaultCustomerTag.id, {
          ...data
        });
        toast.success('Tag salva com sucesso.');
      } else {
        await apiServices.customerTag.create({
          ...data,
        });
        toast.success('Tag adicionada com sucesso.');
      }

      refetch && refetch();
      router.push('/customer-tag/list');
      handleClose();
    } catch {
      toast.error(`Erro ao ${defaultCustomerTag ? 'salvar' : 'adicionar'} produto`);
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
        {defaultCustomerTag ? 'Salvar' : 'Adicionar'}&nbsp; Tag
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {mountForm({
            fields: customerTagFormFields,
            defaultValues: defaultCustomerTag,
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
              {defaultCustomerTag ? 'Salvar' : 'Adicionar'}
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}
