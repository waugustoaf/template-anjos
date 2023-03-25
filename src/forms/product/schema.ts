import * as yup from 'yup';

export const productFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  salesPrice: yup.string().required('Preço de venda é obrigatório'),
});
