import { FormFieldProps } from '@/utils/form/mount-form';
import { Typography } from '@mui/material';
import {apiServices} from "@/services";

export const productFormFields: FormFieldProps[] = [
  {
    type: 'input',
    name: 'name',
    title: 'Nome',
    placeholder: 'Limpeza de pele',
    rowSize: 12,
  },
  {
    type: 'input-currency',
    name: 'sellPrice',
    title: 'Preço de venda',
    placeholder: 'R$ 99,70',
    rowSize: 12,
  }
];
