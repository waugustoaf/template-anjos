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
import {IProfile} from "@/types/entities/IProfile";
import {profileFormFields} from "@/forms/profile";
import {profileFormSchema} from "@/forms/profile/schema";

interface ProfileTabPersonalDataProps {
  handleSaveProfile: (data: Partial<IProfile>) => void;
  defaultValues?: Partial<IProfile>;
  isLoading: boolean;
}

export function ProfilePersonalData({
  handleSaveProfile,
  defaultValues,
  isLoading,
}: ProfileTabPersonalDataProps) {
  const router = useRouter();

  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileFormSchema.basicData),
    defaultValues: { ...defaultValues },
  });

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} className='page-card-mui'>
        <Card>
          <CardHeader title='Dados' />

          <form onSubmit={handleSubmit(handleSaveProfile)}>
            <CardContent style={{ marginTop: '-1rem' }}>
              {mountForm({
                errors,
                fields: profileFormFields.basicData,
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