import * as yup from 'yup';

export const userFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().email('Email inválido').required('Email obrigatório'),
  // phone: yup.string().required('Telefone obrigatório'),
});
