import {SubmitButton} from '@/components/form/submit-button';
import {mountForm} from '@/utils/form/mount-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Box, Button, Card, CardContent, Grid,} from '@mui/material';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import * as yup from "yup";

interface SendActionConversationProps {
  handleSaveConversation: (data: any) => void;
  onClose: () => void;
  isLoading: boolean;
}

export function SendActionConversation({handleSaveConversation,isLoading, onClose}: SendActionConversationProps) {
  const router = useRouter();

  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(yup.object().shape({
        message: yup.string().required('Resumo da conversa'),
      })
    ),
    defaultValues: {},
  });

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} className='page-card-mui'>
        <Card>
          <form onSubmit={handleSubmit(handleSaveConversation)}>
            <CardContent style={{ marginTop: '-1rem'}} >
              {mountForm({
                errors,
                fields: [
                  {
                    name: 'message',
                    rowSize: 12,
                    title: 'Resumo da conversa',
                    type: 'textarea',
                    placeholder: 'Resumo da conversa',
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
