import { apiServices } from '@/services';
import { PaginationProps } from '@/types/app/pagination';
import { FormFieldProps } from '@/utils/form/mount-form';
import { toast } from 'react-hot-toast';

export const autoPilotFormFields: FormFieldProps[] = [
  {
    type: 'select',
    name: 'month',
    title: 'Mês',
    placeholder: 'Selecione o mês',
    selectOptions: [
      { value: '1', label: 'Janeiro' },
      { value: '2', label: 'Fevereiro' },
      { value: '3', label: 'Março' },
      { value: '4', label: 'Abril' },
      { value: '5', label: 'Maio' },
      { value: '6', label: 'Junho' },
      { value: '7', label: 'Julho' },
      { value: '8', label: 'Agosto' },
      { value: '9', label: 'Setembro' },
      { value: '10', label: 'Outubro' },
      { value: '11', label: 'Novembro' },
      { value: '12', label: 'Dezembro' },
    ],
    rowSize: 6,
  },
  {
    type: 'select',
    name: 'year',
    title: 'Ano',
    placeholder: 'Selecione o ano',
    selectOptions: new Array(3)
      .fill('-')
      .map((_, index) => new Date().getFullYear() + index)
      .map((year) => ({
        value: year.toString(),
        label: year.toString(),
      })),
    rowSize: 6,
  },
  {
    type: 'autocomplete-multiple',
    name: 'strategies',
    title: 'Estratégias',
    placeholder: 'Selecione as estratégias',
    rowSize: 12,
    autocompleteFn: apiServices.strategy.full,
    autocompleteLabel: 'name',
  },
];
