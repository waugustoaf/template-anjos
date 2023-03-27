import { FormFieldProps } from '@/utils/form/mount-form';
import { Typography } from '@mui/material';
import {apiServices} from "@/services";

export const strategyFormFields: FormFieldProps[] = [
  {
    type: 'input',
    name: 'name',
    title: 'Nome',
    placeholder: 'Funil Direto',
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
    type: 'input',
    name: 'description',
    title: 'Descrição',
    placeholder: 'Estragégia de vendas',
    rowSize: 12,
  },
  {
    type: 'input',
    name: 'name',
    title: 'Link da escola',
    placeholder: 'https://escolaanjosbusiness.com.br/',
    rowSize: 12,
  },
  {
    type: 'input',
    name: 'icon',
    title: 'Ícone',
    placeholder: 'https://escolaanjosbusiness.com.br/',
    rowSize: 12,
  },
  {
    type: 'label',
    name: 'configFunil',
    title: 'Configurações do Funil - Informa os valores necessários para 1 venda',
    rowSize: 12,
  },
  {
    type: 'input-numeric',
    name: 'messages',
    title: 'Mensagens',
    rowSize: 6,
  },
  {
    type: 'input-numeric',
    name: 'conversation',
    title: 'Conversas',
    rowSize: 6,
  },
  {
    type: 'input-numeric',
    name: 'schedule',
    title: 'Agendamentos',
    rowSize: 6,
  },
  {
    type: 'input-numeric',
    name: 'appointment',
    title: 'Consultas',
    rowSize: 6,
  },
  {
    type: 'input-numeric',
    name: 'negotiation',
    title: 'Negociações',
    rowSize: 6,
  },
];
