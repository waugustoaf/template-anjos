import {SubmitButton} from '@/components/form/submit-button';
import {mountForm} from '@/utils/form/mount-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Box, Button, Card, CardContent, Grid,} from '@mui/material';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import * as yup from "yup";

interface SendActionScheduleProps {
  handleSaveSchedule: (data: any) => void;
  isLoading: boolean;
  onClose: () => void;
}

export function SendActionSchedule({handleSaveSchedule,isLoading}: SendActionScheduleProps) {
  const router = useRouter();

  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver({
      date: yup.date().required('Data do agendamento é obrigatória'),
    }),
    defaultValues: {},
  });

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} className='page-card-mui'>
        <Card>
          <form onSubmit={handleSubmit(handleSaveSchedule)}>
            <CardContent style={{ marginTop: '-1rem'}} >
              {mountForm({
                errors,
                fields: [
                  {
                    type: 'input-date',
                    name: 'date',
                    title: 'Início do Contrato',
                    placeholder: 'Informe a data de início do contrato',
                    dateFormat: 'dd/MM/yyyy',
                    rowSize: 6,
                  },
                ],
                register,
                setValue,
                trigger,
              })}

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
