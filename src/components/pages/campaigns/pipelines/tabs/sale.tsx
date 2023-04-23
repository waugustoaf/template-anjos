import {SubmitButton} from '@/components/form/submit-button';
import {mountForm} from '@/utils/form/mount-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Box, Button, Card, CardContent, Grid,} from '@mui/material';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import * as yup from "yup";
import {apiServices} from "@/services";

interface SendActionSaleProps {
  handleSaveSale: (data: any) => void;
  onClose: () => void;
  isLoading: boolean;
}

export function SendActionSale({handleSaveSale,isLoading, onClose}: SendActionSaleProps) {
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
        productId: yup.string().required('Produto é obrigatório'),
        strategyId: yup.string().min(5).required('Estratégia de venda é obrigatória'),
        productValue: yup.string().min(5).required('Valor do produto é obrigatório'),
      }),
    ),
    defaultValues: {},
  });

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} className='page-card-mui'>
        <Card>
          <form onSubmit={handleSubmit(handleSaveSale)}>
            <CardContent style={{ marginTop: '-1rem'}} >
              {mountForm({
                errors,
                fields: [
                  {
                    type: 'autocomplete',
                    name: 'productId',
                    title: 'Produtos',
                    placeholder: 'Selecione o produto vendido',
                    rowSize: 12,
                    autocompleteFn: apiServices.product.list,
                    autocompleteLabel: 'name',
                  },
                  {
                    type: 'autocomplete',
                    name: 'strategyId',
                    title: 'Estratégia de venda',
                    placeholder: 'Selecione a estratégia utilizada',
                    rowSize: 12,
                    autocompleteFn: apiServices.strategy.list,
                    autocompleteLabel: 'name',
                  },
                  {
                    type: 'input-currency',
                    name: 'productValue',
                    title: 'Valor do produto',
                    placeholder: 'Informe o valor do produto',
                    rowSize: 12,
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
