import * as yup from 'yup';

export const categoryFormSchema = yup.object().shape({
  name: yup.string().required('Categoria obrigatória'),
  autoPilot: yup.boolean().typeError('O campo deve ser verdadeiro ou falso')
});
