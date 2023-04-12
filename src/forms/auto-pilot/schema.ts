import * as yup from 'yup';

export const autoPilotSchema = yup.object().shape({
  month: yup.string().required('Mês é obrigatório'),
  year: yup.string().required('Ano é obrigatório'),
  strategies: yup.array().min(1),
});
