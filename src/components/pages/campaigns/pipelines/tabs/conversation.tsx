import {SubmitButton} from '@/components/form/submit-button';
import {mountForm} from '@/utils/form/mount-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Box, Button, Card, CardContent, Grid,} from '@mui/material';
import {useForm} from 'react-hook-form';
import * as yup from "yup";

interface SendActionConversationProps {
  handleSaveConversation: (data: any) => void;
  onClose: () => void;
  isLoading: boolean;
  conversation: any;
}

export function SendActionConversation({handleSaveConversation,isLoading, onClose, conversation}: SendActionConversationProps) {
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
    defaultValues: {
      id: conversation?.id,
      message: conversation?.resume,
    } as any,
  });

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} className='page-card-mui'>
        <Card>
          <form onSubmit={handleSubmit(handleSaveConversation)}>
            <CardContent style={{ marginTop: '-1rem', minHeight: '450px'}} >
              {mountForm({
                errors,
                fields: [
                  {
                    name: 'message',
                    rowSize: 24,
                    title: 'Resumo da conversa',
                    type: 'textarea',
                    rowsTextArea: 13,
                    placeholder: 'Resumo da conversa',
                  },
                ],
                defaultValues: {
                  id: conversation?.id,
                  message: conversation?.resume,
                },
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
