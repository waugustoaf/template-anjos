import {SubmitButton} from '@/components/form/submit-button';
import {mountForm} from '@/utils/form/mount-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Box, Button, Card, CardContent, Grid,} from '@mui/material';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import * as yup from "yup";
import {apiServices} from "@/services";

interface SendActionChangeOwnerProps {
  handleChangeOwner: (data: any) => void;
  onClose: () => void;
  isLoading: boolean;
}

export function ChangeOwner({handleChangeOwner, isLoading, onClose}: SendActionChangeOwnerProps) {
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
        ownerId: yup.string().required('Selecione o usuário para transferir o lead'),
      }),
    ),
    defaultValues: {},
  });

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} className='page-card-mui'>
        <Card>
          <form onSubmit={handleSubmit(handleChangeOwner)}>
            <CardContent style={{ marginTop: '-1rem', minHeight: '450px', maxHeight: '450px' }}>
              {mountForm({
                errors,
                fields: [
                  {
                    type: 'autocomplete',
                    name: 'ownerId',
                    title: 'Dono do lead',
                    placeholder: 'Selecione o novo dono do lead',
                    rowSize: 12,
                    autocompleteFn: apiServices.user.getOwners,
                    autocompleteLabel: 'name',
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
