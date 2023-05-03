import { SubmitButton } from '@/components/form/submit-button';
import { mountForm } from '@/utils/form/mount-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, CardContent, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { apiServices } from '@/services';
import * as yup from 'yup';

interface SendSetTagProps {
  handleSetTag: (data: any) => void;
  isLoading: boolean;
  onClose: () => void;
  defaultTags: any[];
}

export function SetCustomerTag({
  handleSetTag,
  isLoading,
  onClose,
  defaultTags,
}: SendSetTagProps) {
  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        tagsId: yup.array().required('Selecione as tags correspondente'),
      }),
    ),
    defaultValues: {
      tagsId: defaultTags || [],
    } as any,
  });

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} className='page-card-mui'>
        <Card>
          <form onSubmit={handleSubmit(handleSetTag)}>
            <CardContent
              style={{
                marginTop: '-1rem',
                minHeight: '450px',
                maxHeight: '450px',
              }}
            >
              {mountForm({
                errors,
                fields: [
                  {
                    type: 'autocomplete-multiple',
                    name: 'tagsId',
                    title: 'Tags',
                    placeholder: 'Selecione as tags correspondente',
                    rowSize: 12,
                    autocompleteFn: apiServices.customerTag.list,
                    autocompleteLabel: 'tag',
                  },
                ],
                defaultValues: {
                  tagsId: defaultTags || [],
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
