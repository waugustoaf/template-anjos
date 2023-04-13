import { apiServices } from '@/services';
import { PaginationProps } from '@/types/app/pagination';
import { FormFieldProps } from '@/utils/form/mount-form';
import { toast } from 'react-hot-toast';

export const userFormFields: FormFieldProps[] = [
  {
    type: 'input',
    name: 'name',
    title: 'Nome',
    placeholder: 'Margarete',
    rowSize: 12,
  },
  {
    type: 'input',
    name: 'email',
    title: 'E-mail',
    placeholder: 'margarete@mail.com.br',
    rowSize: 12,
  },
  {
    type: 'switch',
    name: 'isAdmin',
    title: 'Pode ver valores',
    rowSize: 12,
  },
];
