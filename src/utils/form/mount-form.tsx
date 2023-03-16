import { Checkbox } from '@/components/form/checkbox';
import { Input } from '@/components/form/input';
import { InputMask } from '@/components/form/input-mask';
import { InputPassword } from '@/components/form/input-password';
import { PaginationProps } from '@/types/app/pagination';
import { Grid } from '@mui/material';
import React from 'react';
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

export interface FormFieldProps {
  rowSize: number;
  title: string;
  placeholder?: string;
  name: string;
  mask?: string;
  autocompleteLabel?: string;
  autocompleteFn?: (value?: PaginationProps) => Promise<any>;
  selectOptions?: {
    value: string;
    label: string;
  }[];
  type:
    | 'input'
    | 'input-mask'
    | 'input-password'
    | 'input-currency'
    | 'select'
    | 'textarea'
    | 'checkbox'
    | 'autocomplete'
    | 'date'
    | 'time'
    | 'datetime'
    | 'file'
    | 'autocomplete-multiple';
}

interface MountFormProps {
  register?: UseFormRegister<FieldValues>;
  setValue?: UseFormSetValue<FieldValues>;
  fields: FormFieldProps[];
  errors: FieldErrors<FieldValues>;
  formSpacing?: number;
  defaultValues?: Record<string, any>;
}

export interface ResolveFieldProps {
  field: FormFieldProps;
  register?: UseFormRegister<FieldValues>;
  setValue?: UseFormSetValue<FieldValues>;
  errorMessage?: string;
  defaultValue?: any;
}

function resolveField({
  field,
  register,
  errorMessage,
  setValue,
  defaultValue,
}: ResolveFieldProps) {
  switch (field.type) {
    case 'input':
      return (
        <Input
          field={field}
          errorMessage={errorMessage}
          register={register}
          setValue={setValue}
          defaultValue={defaultValue}
        />
      );
    case 'input-password':
      return (
        <InputPassword
          field={field}
          errorMessage={errorMessage}
          register={register}
          setValue={setValue}
          defaultValue={defaultValue}
        />
      );
    case 'input-mask':
      return (
        <InputMask
          field={field}
          errorMessage={errorMessage}
          register={register}
          setValue={setValue}
          defaultValue={defaultValue}
        />
      );
    case 'checkbox':
      return (
        <Checkbox
          field={field}
          errorMessage={errorMessage}
          register={register}
          setValue={setValue}
          defaultValue={defaultValue}
        />
      );
    default:
      console.log(`Field ${field.name} has a invalid type`);
      return null;
  }
}

export function mountForm({
  fields,
  register,
  setValue,
  errors,
  formSpacing = 5,
  defaultValues,
}: MountFormProps) {
  if (!fields.length) return null;

  return (
    <Grid container spacing={formSpacing}>
      {fields.map((field) => (
        <React.Fragment key={field.name}>
          {resolveField({
            field,
            register,
            setValue,
            errorMessage: errors[field.name]?.message?.toString(),
            defaultValue: defaultValues?.[field.name],
          })}
        </React.Fragment>
      ))}
    </Grid>
  );
}
