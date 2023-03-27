import * as yup from 'yup';

export const customerFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  funnelId: yup.string().required('Funil de vedas obrigatório'),
  strategyIdInbound: yup.string().required('Estratégia obrigatória'),
  email: yup.string().email('Email inválido').required('Email obrigatório'),
  cellPhone: yup.string().required('Celular obrigatório'),
});
