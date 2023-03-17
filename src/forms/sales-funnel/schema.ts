import * as yup from 'yup';

export const salesFunnelFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
});
