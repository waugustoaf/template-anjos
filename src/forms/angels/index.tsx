import { apiServices } from '@/services';
import { PaginationProps } from '@/types/app/pagination';
import { FormFieldProps } from '@/utils/form/mount-form';
import { toast } from 'react-hot-toast';

export const angelFormFields: FormFieldProps[] = [
  {
    type: 'input',
    name: 'name',
    title: 'Nome',
    placeholder: 'Anjo gabriel',
    rowSize: 12,
  },
  {
    type: 'input',
    name: 'email',
    title: 'E-mail',
    placeholder: 'gabriel@anjo.com.br',
    rowSize: 12,
  },
  // {
  //   type: 'input-mask',
  //   name: 'phone',
  //   title: 'Telefone',
  //   placeholder: '(11) 99999-9999',
  //   rowSize: 12,
  //   mask: '(99) 99999-9999',
  // },
  {
    type: 'autocomplete-multiple',
    name: 'categories',
    title: 'Categorias de atendimento',
    placeholder: 'Categorias de atendimento',
    rowSize: 12,
    autocompleteFn: apiServices.categories.list,
    autocompleteLabel: 'name',
  },
  {
    type: 'switch',
    name: 'isAdmin',
    title: 'Usuário Administrador',
    rowSize: 12,
  },
  {
    type: 'label',
    name: 'passwordSendByEmail',
    title: 'Um link para criar a senha será enviado por email !',
    rowSize: 12,
  },
];
