import { salesFunnelFormFields } from '@/forms/sales-funnel';
import { categoryFormSchema } from '@/forms/categories/schema';
import { apiServices } from '@/services';
import { ISalesFunnel } from '@/types/entities/ISalesFunnel';
import { mountForm } from '@/utils/form/mount-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import {ICategory} from "@/types/entities/ICategory";
import {categoryFormFields} from "@/forms/categories";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: ICategory | null;
  refetch?: () => void;
}

export function CategoryModal({
                                   defaultCategory,
                                   onClose,
                                   isOpen,
                                   refetch,
                                 }: CategoryModalProps) {
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(categoryFormSchema),
  });

  const router = useRouter();

  const defaultBooleanValues = useRef({
    conversation: false,
    message: false,
    sale: false,
    schedule: false,
    appointment: false,
  }).current;

  useEffect(() => {
    if (defaultCategory) {
      reset({
        ...defaultCategory,
      });
    } else {
      reset(defaultBooleanValues);
    }
  }, [defaultCategory]);

  async function onSubmit(data: Partial<ISalesFunnel>) {
    try {
      if (defaultCategory) {
        await apiServices.categories.update(defaultCategory.id, data);
        toast.success('Categoria salva com sucesso.');
      } else {
        await apiServices.categories.create(data);
        toast.success('Categoria adicionado com sucesso.');
      }

      refetch && refetch();
      router.push('/categories/list');
      onClose();
    } catch {
      toast.error(
        `Erro ao ${
          defaultCategory ? 'salvar' : 'adicionar'
        } categoria`,
      );
    }
  }

  function handleClose() {
    reset(defaultBooleanValues);
    onClose();
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {defaultCategory ? 'Salvar' : 'Adicionar'}&nbsp; categoria
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {mountForm({
            fields: categoryFormFields,
            defaultValues: defaultCategory || defaultBooleanValues,
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
              {defaultCategory ? 'Salvar' : 'Adicionar'}
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}
