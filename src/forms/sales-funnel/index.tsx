import { FormFieldProps } from '@/utils/form/mount-form';
import { Typography } from '@mui/material';

export const salesFunnelFormFields: FormFieldProps[] = [
  {
    type: 'input',
    name: 'name',
    title: 'Nome',
    placeholder: 'Tráfego pago',
    rowSize: 12,
  },
  {
    type: 'children',
    name: 'children',
    title: 'children',
    rowSize: 12,
    children: <Typography>Step do funil</Typography>,
  },
  {
    type: 'switch',
    name: 'message',
    title: 'Mensagem',
    rowSize: 4,
  },
  {
    type: 'switch',
    name: 'conversation',
    title: 'Conversa',
    rowSize: 4,
  },
  {
    type: 'switch',
    name: 'schedule',
    title: 'Agendamento',
    rowSize: 4,
  },
  {
    type: 'switch',
    name: 'appointment',
    title: 'Consulta',
    rowSize: 4,
  },
  {
    type: 'switch',
    name: 'sale',
    title: 'Venda',
    rowSize: 4,
  },
];
