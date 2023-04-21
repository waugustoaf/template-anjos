import { strategyFormFields } from '@/forms/strategy';
import { strategyFormSchema } from '@/forms/strategy/schema';
import { apiServices } from '@/services';
import { ISalesFunnel } from '@/types/entities/ISalesFunnel';
import { mountForm } from '@/utils/form/mount-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import {IStrategy} from "@/types/entities/IStrategy";
import {formatNumberFromBase100, formatNumberToBase100} from "@/utils/currency";

interface StrategyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultStrategy?: IStrategy | null;
  refetch?: () => void;
}

export function StrategyModal({
  defaultStrategy,
  onClose,
  isOpen,
  refetch,
}: StrategyModalProps) {
  const {
    register,
    setValue,
    reset,
    getValues,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(strategyFormSchema),
  });

  const router = useRouter();

  useEffect(() => {
    if (defaultStrategy) {
      reset({
        ...defaultStrategy,
      });
    } else {
      reset({});
    }
  }, [defaultStrategy]);

  async function onSubmit(data: Partial<IStrategy>) {
    try {
      if (defaultStrategy) {
        data.funnel = undefined;
        await apiServices.strategy.update(defaultStrategy.id, {
          ...data,
          qtdMessages: formatNumberToBase100(data.qtdMessages),
          qtdConversations: formatNumberToBase100(data.qtdConversations),
          qtdAppointments: formatNumberToBase100(data.qtdAppointments),
          qtdSchedules: formatNumberToBase100(data.qtdSchedules),
        });
        toast.success('Estratégia salva com sucesso.');
      } else {
        await apiServices.strategy.create({
          ...data,
          qtdMessages: formatNumberToBase100(data.qtdMessages),
          qtdConversations: formatNumberToBase100(data.qtdConversations),
          qtdAppointments: formatNumberToBase100(data.qtdAppointments),
          qtdSchedules: formatNumberToBase100(data.qtdSchedules),
        });
        toast.success('Estratégia adicionado com sucesso.');
      }

      refetch && refetch();
      router.push('/strategies/list');
      onClose();
    } catch {
      toast.error(
        `Erro ao ${
          defaultStrategy ? 'salvar' : 'adicionar'
        } estratégia`,
      );
    }
  }

  function handleClose() {
    reset({});
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
        {defaultStrategy ? 'Salvar' : 'Adicionar'}&nbsp; Estratégia
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {mountForm({
            fields: strategyFormFields,
            defaultValues: defaultStrategy,
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
              {defaultStrategy ? 'Salvar' : 'Adicionar'}
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}
