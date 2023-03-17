import { angelFormFields } from '@/forms/angels';
import { angelFormSchema } from '@/forms/angels/schema';
import { apiServices } from '@/services';
import { IAngel } from '@/types/entities/IAngel';
import { clearFormEventManager, clearForms } from '@/utils/event/clear-form';
import { mountForm } from '@/utils/form/mount-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

interface AngelModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultAngel?: any | null;
  refetch?: () => void;
}

export function AngelModal({
  defaultAngel,
  onClose,
  isOpen,
  refetch,
}: AngelModalProps) {
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(angelFormSchema),
  });

  const router = useRouter();

  useEffect(() => {
    if (defaultAngel) {
      reset({
        ...defaultAngel,
      });
    } else {
      reset();
    }
  }, [defaultAngel]);

  async function onSubmit(data: any) {
    const formattedData = {
      ...data,
      grantType: data.isAdmin ? 190 : 100,
    };

    try {
      if (defaultAngel) {
        await apiServices.angel.update(defaultAngel.id, formattedData);
        toast.success('Anjo salvo com sucesso.');
      } else {
        await apiServices.angel.create(formattedData);
        toast.success('Anjo adicionado com sucesso.');
      }

      refetch && refetch();
      handleClose();
    } catch {
      toast.error(
        `Erro ao ${defaultAngel ? 'salvar' : 'adicionar'} anjo`,
      );
    }
  }

  function handleClose() {
    clearForms();
    reset();
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
        {defaultAngel ? 'Salvar' : 'Adicionar'}&nbsp; funil de vendas
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {mountForm({
            fields: angelFormFields,
            defaultValues: defaultAngel || {},
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
              {defaultAngel ? 'Salvar' : 'Adicionar'}
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}
