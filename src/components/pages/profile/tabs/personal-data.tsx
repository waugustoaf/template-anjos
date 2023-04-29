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
import { IProfile } from '@/types/entities/IProfile';
import { profileFormFields } from '@/forms/profile';
import { profileFormSchema } from '@/forms/profile/schema';
import { InputFile } from '@/components/form/input-file';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';
import { apiServices } from '@/services';

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
  const [file, setFile] = useState<File | null>(null);
  const { refetchUser } = useAuth();
  const router = useRouter();

  async function handleUploadAvatar() {
    try {
      if (!file) return;

      await apiServices.auth.uploadAvatar(file);

      await refetchUser();

      toast.success('Foto de perfil atualizada com sucesso!');
    } catch {
      toast.error('Erro ao atualizar foto de perfil!');
    }
  }

  useEffect(() => {
    if (file) {
      handleUploadAvatar();
    }
  }, [file]);

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

          <Box margin='1.5rem' marginTop='0'>
            <InputFile
              field={{
                name: 'avatar',
                rowSize: 12,
                title: 'Foto de perfil',
                type: 'file',
                fileFieldTitle: 'Enviar foto de usuário',
              }}
              defaultValue={defaultValues?.avatar}
              setValue={(_, value) => {
                setFile(value);
              }}
            />
          </Box>

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
