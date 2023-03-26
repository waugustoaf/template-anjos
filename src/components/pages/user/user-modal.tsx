import { userFormFields } from '@/forms/users';
import { apiServices } from '@/services';
import { clearFormEventManager, clearForms } from '@/utils/event/clear-form';
import { mountForm } from '@/utils/form/mount-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import {userFormSchema} from "@/forms/users/schema";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultUser?: any | null;
  refetch?: () => void;
}

export function UserModal({
  defaultUser,
  onClose,
  isOpen,
  refetch,
}: UserModalProps) {
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userFormSchema),
  });

  const router = useRouter();

  useEffect(() => {
    if (defaultUser) {
      reset({
        ...defaultUser,
      });
    } else {
      reset();
    }
  }, [defaultUser]);

  async function onSubmit(data: any) {
    const formattedData = {
      ...data,
      grantType: data.isAdmin ? 190 : 100,
    };

    try {
      if (defaultUser) {
        await apiServices.user.update(defaultUser.id, formattedData);
        toast.success('Usuário salvo com sucesso.');
      } else {
        await apiServices.user.create(formattedData);
        toast.success('Usuário adicionado com sucesso.');
      }

      refetch && refetch();
      handleClose();
    } catch {
      toast.error(
        `Erro ao ${defaultUser ? 'salvar' : 'adicionar'} anjo`,
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
        {defaultUser ? 'Salvar' : 'Adicionar'}&nbsp; Usuário
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {mountForm({
            fields: userFormFields,
            defaultValues: defaultUser || {},
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
              {defaultUser ? 'Salvar' : 'Adicionar'}
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}
