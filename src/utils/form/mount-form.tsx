import { Autocomplete } from '@/components/form/autocomplete';
import { AutocompleteMultiple } from '@/components/form/autocomplete-multiple';
import { Checkbox } from '@/components/form/checkbox';
import { CustomChildren } from '@/components/form/custom-children';
import { Label } from '@/components/form/label';
import { Input } from '@/components/form/input';
import { InputCurrency } from '@/components/form/input-currency';
import { InputDate } from '@/components/form/input-date';
import { InputDocument } from '@/components/form/input-document';
import { InputMask } from '@/components/form/input-mask';
import { InputNumber } from '@/components/form/input-number';
import { InputNumeric } from '@/components/form/input-numberic';
import { InputPassword } from '@/components/form/input-password';
import { Select } from '@/components/form/select';
import { Switch } from '@/components/form/switch';
import { PaginationProps } from '@/types/app/pagination';
import { Grid } from '@mui/material';
import React from 'react';
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form';
import { InputFile } from '@/components/form/input-file';

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
  children?: React.ReactNode;
  dateFormat?: string;
  multipleFiles?: boolean;
  fileAccept?: Record<string, any>;
  type:
    | 'input'
    | 'input-mask'
    | 'input-date'
    | 'input-number'
    | 'input-numeric'
    | 'input-document'
    | 'input-password'
    | 'input-currency'
    | 'input-file'
    | 'select'
    | 'textarea'
    | 'checkbox'
    | 'autocomplete'
    | 'date'
    | 'time'
    | 'datetime'
    | 'file'
    | 'autocomplete-multiple'
    | 'switch'
    | 'children'
    | 'label';
}

interface MountFormProps {
  register?: UseFormRegister<FieldValues>;
  setValue?: UseFormSetValue<FieldValues>;
  trigger?: UseFormTrigger<any>;
  fields: FormFieldProps[];
  errors: FieldErrors<FieldValues>;
  formSpacing?: number;
  defaultValues?: Record<string, any> | null;
}

export interface ResolveFieldProps {
  field: FormFieldProps;
  register?: UseFormRegister<FieldValues>;
  setValue?: UseFormSetValue<FieldValues>;
  trigger?: UseFormTrigger<any>;
  errorMessage?: string;
  defaultValue?: any;
}

function resolveField({
  field,
  register,
  errorMessage,
  setValue,
  defaultValue,
  trigger,
}: ResolveFieldProps) {
  switch (field.type) {
    case 'input':
      return (
        <Input
          field={field}
          errorMessage={errorMessage}
          register={register}
          setValue={setValue}
          trigger={trigger}
          defaultValue={defaultValue}
        />
      );
    case 'input-numeric':
      return (
        <InputNumeric
          field={field}
          errorMessage={errorMessage}
          register={register}
          setValue={setValue}
          trigger={trigger}
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
          trigger={trigger}
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
          trigger={trigger}
          defaultValue={defaultValue}
        />
      );
    case 'input-document':
      return (
        <InputDocument
          field={field}
          errorMessage={errorMessage}
          register={register}
          setValue={setValue}
          trigger={trigger}
          defaultValue={defaultValue}
        />
      );
    case 'input-date':
      return (
        <InputDate
          field={field}
          errorMessage={errorMessage}
          register={register}
          setValue={setValue}
          trigger={trigger}
          defaultValue={defaultValue}
        />
      );
    case 'input-number':
      return (
        <InputNumber
          field={field}
          errorMessage={errorMessage}
          register={register}
          setValue={setValue}
          trigger={trigger}
          defaultValue={defaultValue}
        />
      );
    case 'input-currency':
      return (
        <InputCurrency
          field={field}
          errorMessage={errorMessage}
          register={register}
          setValue={setValue}
          trigger={trigger}
          defaultValue={defaultValue}
        />
      );
    case 'input-file':
      return (
        <InputFile
          field={field}
          errorMessage={errorMessage}
          register={register}
          setValue={setValue}
          trigger={trigger}
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
          trigger={trigger}
          defaultValue={defaultValue}
        />
      );
    case 'switch':
      return (
        <Switch
          field={field}
          errorMessage={errorMessage}
          register={register}
          setValue={setValue}
          trigger={trigger}
          defaultValue={defaultValue}
        />
      );
    case 'autocomplete':
      return (
        <Autocomplete
          field={field}
          errorMessage={errorMessage}
          register={register}
          setValue={setValue}
          trigger={trigger}
          defaultValue={defaultValue}
        />
      );
    case 'autocomplete-multiple':
      return (
        <AutocompleteMultiple
          field={field}
          errorMessage={errorMessage}
          register={register}
          setValue={setValue}
          trigger={trigger}
          defaultValue={defaultValue}
        />
      );
    case 'select':
      return (
        <Select
          field={field}
          errorMessage={errorMessage}
          register={register}
          setValue={setValue}
          trigger={trigger}
          defaultValue={defaultValue}
        />
      );
    case 'children':
      return <CustomChildren field={field} />;
    case 'label':
      return <Label field={field} />;
    default:
      console.log(`Field ${field.name} has a invalid type`);
      return null;
  }
}

export function mountForm({
  fields,
  register,
  setValue,
  trigger,
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
            trigger,
            errorMessage: errors[field.name]?.message?.toString(),
            defaultValue: defaultValues?.[field.name],
          })}
        </React.Fragment>
      ))}
    </Grid>
  );
}
