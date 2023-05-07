import {SubmitButton} from '@/components/form/submit-button';
import {DatePickerWrapper} from '@/styles/libs/react-datepicker';
import {mountForm} from '@/utils/form/mount-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Box, Button, Card, CardContent, Grid} from '@mui/material';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';

interface SendActionAppointmentProps {
  handleSaveAppointment: (data: any) => void;
  isLoading: boolean;
  onClose: () => void;
  appointment: any;
}

export function SendActionAppointment({
  handleSaveAppointment,
  isLoading,
  onClose,
  appointment,
}: SendActionAppointmentProps) {
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
    defaultValues: {
      id: appointment?.id ?? '',
      date: appointment?.date,
      resume: appointment?.resume,
    } as any,
  });

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} className='page-card-mui'>
        <Card>
          <form onSubmit={handleSubmit(handleSaveAppointment)}>
            <CardContent style={{ marginTop: '-1rem', minHeight: '450px', maxHeight: '450px' }}>
              <DatePickerWrapper>
                {mountForm({
                  errors,
                  fields: [
                    {
                      name: 'date',
                      rowSize: 12,
                      title: 'Data da consulta',
                      type: 'input-date',
                      dateFormat: 'dd/MM/yyyy',
                      placeholder: 'Seleciona a data da consulta',
                    },
                    {
                      name: 'resume',
                      rowSize: 12,
                      title: 'Resumo da cosulta',
                      type: 'textarea',
                      rowsTextArea: 10,
                      placeholder: 'Descreva o resumo da consulta',
                    },
                  ],
                  defaultValues: {
                    id: appointment?.id ?? '',
                    date: appointment?.date ? new Date(appointment?.date) : '',
                    resume: appointment?.resume,
                  },
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
                <Button onClick={onClose}>Cancelar</Button>
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
