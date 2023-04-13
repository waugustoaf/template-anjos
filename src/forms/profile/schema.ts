import * as yup from 'yup';

export const profileFormSchema = {
  basicData: yup.object().shape({
    fullName: yup.string().required('Nome completo é obrigatório'),
    email: yup
      .string()
      .email('E-mail inválido')
      .required('E-mail é obrigatório'),
  }),
  password: yup.object().shape({
    currentPassword: yup.string().required('Senha atual é obrigatório'),
    newPassword: yup.string().required('Nova senha é obrigatório'),
    confirmPassword: yup.string().required('Confirmação de senha é obrigatório'),
  }),
};
