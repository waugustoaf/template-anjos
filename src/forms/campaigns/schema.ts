import * as yup from 'yup';

export const campaignFormSchema = yup.object().shape({
  name: yup.string().required('Categoria obrigatória'),
  year: yup.string().required('Campo obrigatório'),
  month: yup.string().required('Campo obrigatório'),
  financialGoal: yup.string().required('Campo obrigatório'),
  averageTicket: yup
    .string()
    .required('Campo obrigatório')
    .test(
      'number-minor-than-financialGoal',
      'O valor médio do ticket deve ser menor que a meta.',
      function (value) {
        const { financialGoal } = this.parent;
        return Number(value) < Number(financialGoal);
      },
    ),
});
