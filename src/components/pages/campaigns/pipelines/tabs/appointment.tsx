import { SubmitButton } from '@/components/form/submit-button';
import { DatePickerWrapper } from '@/styles/libs/react-datepicker';
import { mountForm } from '@/utils/form/mount-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, CardContent, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

interface SendActionAppointmentProps {
  handleSaveAppointment: (data: any) => void;
  isLoading: boolean;
}

export function SendActionAppointment({
  handleSaveAppointment,
  isLoading,
}: SendActionAppointmentProps) {
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
        resume: yup
          .string()
          .min(5)
          .required('Resumo da consulta é obrigatório'),
        date: yup.date().required('Data da consulta é obrigatória'),
      }),
    ),
  });

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} className='page-card-mui'>
        <Card>
          <form onSubmit={handleSubmit(handleSaveAppointment)}>
            <CardContent style={{ marginTop: '-1rem' }}>
              <DatePickerWrapper sx={{ minHeight: '450px' }}>
                {mountForm({
                  errors,
                  fields: [
                    {
                      name: 'resume',
                      rowSize: 12,
                      title: 'Resumo da cosulta',
                      type: 'textarea',
                      placeholder: 'Descreva o resumo da consulta',
                    },
                    {
                      name: 'date',
                      rowSize: 12,
                      title: 'Resumo da cosulta',
                      type: 'input-date',
                      placeholder: 'Seleciona a data da consulta',
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
