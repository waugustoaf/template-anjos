import { SubmitButton } from '@/components/form/submit-button';
import { clinicFormFields } from '@/forms/clinics';
import { clinicFormSchema } from '@/forms/clinics/schema';
import { IClinic } from '@/types/entities/IClinic';
import { mountForm } from '@/utils/form/mount-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

interface ClinicTabPersonalDataProps {
  handleSaveClinic: (data: Partial<IClinic>) => void;
  defaultValues?: Partial<IClinic>;
  isLoading: boolean;
}

export function ClinicTabPersonalData({
  handleSaveClinic,
  defaultValues,
  isLoading,
}: ClinicTabPersonalDataProps) {
  const router = useRouter();

  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(clinicFormSchema.basicData),
    defaultValues: { ...defaultValues },
  });

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} className='page-card-mui'>
        <Card>
          <CardHeader title='Dados' />

          <form onSubmit={handleSubmit(handleSaveClinic)}>
            <CardContent style={{ marginTop: '-1rem' }}>
              {mountForm({
                errors,
                fields: clinicFormFields.basicData,
                register,
                setValue,
                trigger,
                defaultValues,
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
