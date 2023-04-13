import { FormFieldProps } from '@/utils/form/mount-form';
import { Typography } from '@mui/material';
import {apiServices} from "@/services";

export const customerTagFormFields: FormFieldProps[] = [
  {
    type: 'input',
    name: 'tag',
    title: 'Tag',
    placeholder: 'Informe a tag do cliente',
    rowSize: 12,
  },
];
