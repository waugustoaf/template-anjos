import * as yup from 'yup';

export const campaignFormSchema = yup.object().shape({
  name: yup.string().required('Categoria obrigatória'),
  year: yup.string().required('Campo obrigatório'),
  month: yup.string().required('Campo obrigatório'),
  financialGoal: yup.string().required('Campo obrigatório'),
  averageTicket: yup.string().required('Campo obrigatório'),
});
