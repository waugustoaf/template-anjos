import * as yup from 'yup';

export const customerFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  boardId: yup.string().required('Campanha é obrigatório'),
  email: yup.string().email('Email inválido').required('Email obrigatório'),
  whatsapp: yup.string().required('Celular / WhatsApp obrigatório'),
});
