import { SubmitButton } from '@/components/form/submit-button';
import { DatePickerWrapper } from '@/styles/libs/react-datepicker';
import { mountForm } from '@/utils/form/mount-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, CardContent, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

interface SendActionScheduleProps {
  handleSaveSchedule: (data: any) => void;
  isLoading: boolean;
  onClose: () => void;
}

export function SendActionSchedule({
  handleSaveSchedule,
  isLoading,
}: SendActionScheduleProps) {
  const [date, setDate] = useState(new Date());
  const router = useRouter();

  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        date: yup.date().required('Data do agendamento é obrigatória'),
      }),
    ),
    defaultValues: {},
  });

  function onSubmit() {
    handleSaveSchedule({
      date,
    });
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} className='page-card-mui'>
        <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent style={{ marginTop: '-1rem' }}>
              <DatePickerWrapper sx={{ minHeight: '350px' }}>
                {mountForm({
                  errors,
                  fields: [
                    {
                      type: 'input-datetime',
                      name: 'date',
                      title: 'Início do Contrato',
                      placeholder: 'Informe a data de início do contrato',
                      dateFormat: 'dd/MM/yyyy HH:mm',
                      rowSize: 12,
                    },
                  ],
                  register,
                  setValue,
                  trigger,
                })}
              </DatePickerWrapper>

              <Box
                display='flex'
                alignItems='center'
                justifyContent='flex-end'
                marginTop='2rem'
                gap='0.5rem'
              >
                <Button onClick={router.back}>Cancelar</Button>
                <SubmitButton
                  hideCustomSpace
                  isLoading={isLoading}
                  title='Salvar'
                />
              </Box>
            </CardContent>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
}
