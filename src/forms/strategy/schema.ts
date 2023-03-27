import * as yup from 'yup';

export const strategyFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  funeelId: yup.string().required('Funil de vedas obrigatório'),
  messages: yup.string().required('Quantidade de mensagens é obrigatório'),
  conversation: yup.string().required('Quantidade de conversas é obrigatório'),
  schedule: yup.string().required('Quantidade de agendamentos é obrigatório'),
  appointment: yup.string().required('Quantidade de consultas é obrigatório'),
  negotiation: yup.string().required('Quantidade de negociações é obrigatório'),
});
