import * as yup from 'yup';

export const customerFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  startStrategyId: yup.string().required('Campanha é obrigatório'),
});
