import * as yup from 'yup';

export const customerTagFormSchema = yup.object().shape({
  tag: yup.string().required('Tag obrigatório'),
});
