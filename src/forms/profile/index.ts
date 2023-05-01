import {FormFieldProps} from '@/utils/form/mount-form';

export const profileFormFields = {
  basicData: [
    {
      type: 'input',
      name: 'fullName',
      title: 'Nome Completo',
      placeholder: 'Informe seu nome completo',
      rowSize: 6,
    },
    {
      type: 'input',
      name: 'email',
      title: 'E-Mail',
      placeholder: 'Informe seu email',
      rowSize: 6,
    },
  ] as FormFieldProps[],
  password: [
    {
      type: 'input-password',
      name: 'currentPassword',
      title: 'Senha Atual',
      placeholder: 'Informe a senha atual',
      rowSize:12,
    },
    {
      type: 'input-password',
      name: 'newPassword',
      title: 'Nova Senha',
      placeholder: 'Informe a senha nova senha',
      rowSize: 12,
    },
    {
      type: 'input-password',
      name: 'confirmPassword',
      title: 'Confirmar Senha',
      placeholder: 'Informe a senha confirmação de senha',
      rowSize: 12,
    },

  ] as FormFieldProps[],
};
