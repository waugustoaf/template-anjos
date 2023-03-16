import { FormFieldProps } from "@/utils/form/mount-form";

export const categoryFormFields: FormFieldProps[] = [
  {
    type: 'input',
    name: 'name',
    title: 'Categoria',
    placeholder: 'Million',
    rowSize: 12,
  },
  {
    type: 'checkbox',
    name: 'autoPilot',
    title: 'Piloto automático',
    placeholder: 'Piloto automático',
    rowSize: 12,
  },
];