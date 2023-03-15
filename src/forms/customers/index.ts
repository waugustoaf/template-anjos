import { FormFieldProps } from "@/utils/form/mount-form";

export const customerFormFields: FormFieldProps[] = [
  {
    name: 'name',
    title: 'Nome Completo',
    placeholder: 'Eduardo Silva',
    rowSize: 6,
    type: 'input',
  },
  {
    name: 'cellphone',
    title: 'Celular',
    placeholder: '(31) 99999-9999',
    rowSize: 6,
    type: 'input-mask',
    mask: '(99) 99999-9999',
  },
  {
    name: 'whatsapp',
    title: 'WhatsApp',
    placeholder: '(31) 99999-9999',
    rowSize: 6,
    type: 'input-mask',
    mask: '(99) 99999-9999',
  },
  {
    name: 'instagram',
    title: 'Instagram',
    placeholder: '@username',
    rowSize: 6,
    type: 'input-mask',
    mask: '@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  },
  {
    name: 'email',
    title: 'Email',
    placeholder: 'email@anjos.email',
    rowSize: 6,
    type: 'input',
  },
  {
    name: 'gender',
    title: 'Sexo',
    placeholder: 'Sexo',
    rowSize: 6,
    type: 'select',
    selectOptions: [
      { value: 'MAN', label: 'Masculino' },
      { value: 'WOMAN', label: 'Feminino' },
      { value: 'OTHER', label: 'Outro' },
    ],
  },
  {
    name: 'document',
    title: 'Documento',
    placeholder: '000.000.000-00',
    rowSize: 6,
    type: 'input-mask',
    mask: '999.999.999-99',
  },
];