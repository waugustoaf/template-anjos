import * as yup from 'yup';

export const campaignFormSchema = yup.object().shape({
  name: yup.string().required('Categoria obrigatória'),
  financialGoal: yup.string().required('Campo obrigatório'),
  averageTicket: yup.string().required('Campo obrigatório'),
});
