import * as yup from 'yup';

export const strategyFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  funnelId: yup.string().required('Funil de vedas obrigatório'),
  qtdMessages: yup.string().required('Quantidade de mensagens é obrigatório'),
  qtdConversations: yup.string().required('Quantidade de conversas é obrigatório'),
  qtdSchedules: yup.string().required('Quantidade de agendamentos é obrigatório'),
  qtdAppointments: yup.string().required('Quantidade de consultas é obrigatório'),
});
