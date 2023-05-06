import {SubmitButton} from '@/components/form/submit-button';
import {DatePickerWrapper} from '@/styles/libs/react-datepicker';
import {mountForm} from '@/utils/form/mount-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Box, Button, Card, CardContent, Grid} from '@mui/material';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';

interface SendActionScheduleProps {
  handleSaveSchedule: (data: any) => void;
  isLoading: boolean;
  onClose: () => void;
  schedule: any;
}

export function SendActionSchedule({
  handleSaveSchedule,
  isLoading, onClose, schedule
}: SendActionScheduleProps) {
  const [date, setDate] = useState(new Date());
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
          .required('Resumo do agentamento é obrigatório'),
        date: yup.date().required('Data do agendamento é obrigatória'),
      }),
    ),
    defaultValues: {
      id: schedule?.id ?? '',
      date: schedule?.date,
      resume: schedule?.resume,
      confirm1: schedule?.confirm1 ?? false,
      confirm2: schedule?.confirm2 ?? false,
      confirmed: schedule?.confirmed ?? false,
    } as any,
  });

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} className='page-card-mui'>
        <Card>
          <form onSubmit={handleSubmit(handleSaveSchedule)}>
            <CardContent style={{ marginTop: '-1rem', minHeight: '450px' }}>
              <DatePickerWrapper>
                {mountForm({
                  errors,
                  fields: [
                    {
                      type: 'input-datetime',
                      name: 'date',
                      title: 'Data do agendamento',
                      placeholder: 'Informe a data do agendamento',
                      dateFormat: 'dd/MM/yyyy HH:mm',
                      rowSize: 12,
                    },
                    {
                      name: 'resume',
                      rowSize: 12,
                      title: 'Resumo do agendamento',
                      type: 'textarea',
                      rowsTextArea: 7,
                      placeholder: 'Descreva o resumo do agendamento',
                    },
                    {
                      name: 'confirm1',
                      rowSize: 4,
                      title: 'Confirmação 1',
                      type: 'checkbox',
                    },
                    {
                      name: 'confirm2',
                      rowSize: 4,
                      title: 'Confirmação 2',
                      type: 'checkbox',
                    },
                    {
                      name: 'confirmed',
                      rowSize: 4,
                      title: 'Confirmado',
                      type: 'checkbox',
                    },
                  ],
                  defaultValues: {
                    id: schedule?.id ?? '',
                    date: schedule?.date,
                    resume: schedule?.resume,
                    confirm1: schedule?.confirm1 ?? false,
                    confirm2: schedule?.confirm2 ?? false,
                    confirmed: schedule?.confirmed ?? false,
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
