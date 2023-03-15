import { FormFieldProps } from "@/utils/form/mount-form";

export const loginFormFields: FormFieldProps[] = [
  {
    name: 'email',
    placeholder: 'email@anjos-guia.com',
    rowSize: 12,
    type: 'input',
    title: 'E-mail',
  },
  {
    name: 'password',
    rowSize: 12,
    type: 'input-password',
    title: 'Senha',
  },
];