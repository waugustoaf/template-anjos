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
import {autoPilotSchema} from "@/forms/auto-pilot/schema";
import {autoPilotFormFields} from "@/forms/auto-pilot";
import {IGetAutoPilot} from "@/types/entities/IAutoPilot";

interface AutoPilotModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultAutoPilot?: any | null;
  refetch?: () => void;
}

export function AutoPilotModal({
  defaultAutoPilot,
  onClose,
  isOpen,
  refetch,
}: AutoPilotModalProps) {
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(autoPilotSchema),
  });

  const router = useRouter();

  async function getAutoPilotDataById(id: string) {
    return await apiServices.autoPilot.get(id);
  }

  useEffect(() => {
    if (defaultAutoPilot) {
      const fetchData = async () => {
        const autoPilot = await apiServices.autoPilot.get(defaultAutoPilot.id);
        console.log(autoPilot);
        defaultAutoPilot.id = autoPilot.id;
        defaultAutoPilot.year = autoPilot.year;
        defaultAutoPilot.month = autoPilot.month;
        defaultAutoPilot.strategies = ['39fa530d-2abd-444c-8791-d5841aa64453', 'ab20f69c-7955-49bc-8101-1794df156434'];
      }

      fetchData()
        .catch(console.error);

      reset({
        ...defaultAutoPilot,
        strategies: [{
          id: '39fa530d-2abd-444c-8791-d5841aa64453'
        }, {
          id: 'ab20f69c-7955-49bc-8101-1794df156434'
        }]
      });
    } else {
      reset();
    }
  }, [defaultAutoPilot]);

  async function onSubmit(data: any) {
    const formattedData = {
      ...data,
      year: Number(data.year),
      month: Number(data.month),
    };

    try {
      if (defaultAutoPilot) {
        await apiServices.autoPilot.update(defaultAutoPilot.id, formattedData);
        toast.success('Piloto automático salvo com sucesso.');
      } else {
        await apiServices.autoPilot.create(formattedData);
        toast.success('Piloto automático criado com sucesso.');
      }

      refetch && refetch();
      handleClose();
    } catch {
      toast.error(
        `Erro ao ${defaultAutoPilot ? 'salvar' : 'adicionar'} piloto automático.`,
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
        {defaultAutoPilot ? 'Salvar' : 'Adicionar'}&nbsp; Anjo
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {mountForm({
            fields: autoPilotFormFields,
            defaultValues: defaultAutoPilot || {},
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
              {defaultAutoPilot ? 'Salvar' : 'Adicionar'}
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}
