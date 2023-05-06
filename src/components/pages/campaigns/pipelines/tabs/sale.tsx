import { SubmitButton } from '@/components/form/submit-button';
import { mountForm } from '@/utils/form/mount-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { apiServices } from '@/services';
import { useState } from 'react';

interface SendActionSaleProps {
  handleSaveSale: (data: any) => void;
  handleDeleteSale: (data: any) => Promise<void>;
  onClose: () => void;
  isLoading: boolean;
  sale: any;
}

export function SendActionSale({
  handleSaveSale,
  handleDeleteSale,
  isLoading,
  onClose,
  sale,
}: SendActionSaleProps) {
  const [isCancelConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const [isCancellingSale, setIsCancellingSale] = useState(false);

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
        strategySaleId: yup
          .string()
          .required('Estratégia de venda é obrigatória'),
        productValue: yup.string().required('Valor do produto é obrigatório'),
      }),
    ),
    defaultValues: {
      productId: sale?.productId ?? '',
      strategySaleId: sale?.strategyId ?? '',
      productValue: sale?.value ?? '',
    } as any,
  });

  async function handleCancelSale() {
    try {
      setIsCancellingSale(true);

      await handleDeleteSale({
        id: sale.id || '',
      });
    } catch {
    } finally {
      setIsCancellingSale(false);
    }
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} className='page-card-mui'>
          <Card>
            <form onSubmit={handleSubmit(handleSaveSale)}>
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
                      name: 'strategySaleId',
                      title: 'Estratégia de venda',
                      placeholder: 'Selecione a estratégia utilizada',
                      rowSize: 12,
                      autocompleteFn: apiServices.strategy.full,
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
                  defaultValues: {
                    productId: sale?.productId ?? '',
                    strategySaleId: sale?.strategyId ?? '',
                    productValue: sale?.value ?? '',
                  },
                  register,
                  setValue,
                  trigger,
                })}
                <Box
                  width='100%'
                  display='flex'
                  alignItems='center'
                  justifyContent='space-between'
                  gap='1rem'
                  marginTop='2rem'
                >
                  {sale?.productId ? (
                    <Button
                      color='error'
                      variant='contained'
                      onClick={() => setIsConfirmationModalVisible(true)}
                    >
                      Cancelar venda
                    </Button>
                  ) : (
                    <></>
                  )}

                  <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='flex-end'
                    gap='0.5rem'
                  >
                    <Button onClick={onClose}>Cancelar</Button>
                    <SubmitButton
                      hideCustomSpace
                      isLoading={isLoading}
                      title='Salvar'
                    />
                  </Box>
                </Box>
              </CardContent>
            </form>
          </Card>
        </Grid>
      </Grid>
      <Dialog
        open={isCancelConfirmationModalVisible}
        onClose={() => setIsConfirmationModalVisible(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          Tem certeza que deseja cancelar a venda?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Uma vez selecionada a opção de cancelar venda, não será possível
            reverter a ação.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsConfirmationModalVisible(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleCancelSale}
            autoFocus
            disabled={isCancellingSale}
          >
            {isCancellingSale ? <CircularProgress size={16} /> : 'Confirmar'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
