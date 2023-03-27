import * as yup from 'yup';

export const productFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  sellPrice: yup.string().required('Preço de venda é obrigatório'),
});
