import { FormFieldProps } from '@/utils/form/mount-form';
import {apiServices} from "@/services";
import {states} from "@/utils/mocks/states";

export const customerFormFields: FormFieldProps[] = [
  {
    type: 'input',
    name: 'name',
    title: 'Nome',
    placeholder: 'Maria da silva',
    rowSize: 12,
  },
  {
    type: 'input',
    name: 'email',
    title: 'E-mail',
    placeholder: 'maria@email.com',
    rowSize: 12,
  },
  {
    type: 'autocomplete',
    name: 'funeelId',
    title: 'Funil de vendas',
    placeholder: 'Selecione o funil de vendas',
    rowSize: 12,
    autocompleteFn: apiServices.salesFunnel.list,
    autocompleteLabel: 'name',
  },
  {
    type: 'autocomplete',
    name: 'strategyId',
    title: 'Estratégia',
    placeholder: 'Selecione o estratégia',
    rowSize: 12,
    autocompleteFn: apiServices.strategy.list,
    autocompleteLabel: 'name',
  },
  {
    type: 'input-mask',
    name: 'cellPhone',
    title: 'Celular',
    placeholder: '(11) 99999-9999',
    mask: '(99) 99999-9999',
    rowSize: 6,
  },
  {
    type: 'input',
    name: 'instagram',
    title: 'Instagram',
    placeholder: '@anjosbusiness_',
    rowSize: 6,
  },
  {
    type: 'select',
    name: 'origin',
    title: 'Origem',
    placeholder: 'Informa origem do cliente',
    selectOptions: [
      { value: 'INSTRAGRAM', label: 'Instagram' },
      { value: 'FACEBOOK', label: 'Facebook' },
      { value: 'TIKTOK', label: 'Tik-Tok' },
      { value: 'OUTRAREDE', label: 'Outra Rede Social' },
      { value: 'CAMPANHAEXTERNA', label: 'Campanha Externa' },
      { value: 'MEDIAIMPRESSA', label: 'Mídia Impressa' },
      { value: 'OUTROS', label: 'Outra Origem' },
    ],
    rowSize: 6,
  },
  {
    type: 'input',
    name: 'descOrigin',
    title: 'Descrição da origem',
    placeholder: 'Informa origem do cliente',
    rowSize: 6,
  },
  {
    type: 'input',
    name: 'city',
    title: 'Cidade',
    placeholder: 'São Paulo',
    rowSize: 8,
  },
  {
    type: 'select',
    name: 'state',
    title: 'Estado',
    placeholder: 'SP',
    rowSize: 4,
    selectOptions: states,
  },
];
