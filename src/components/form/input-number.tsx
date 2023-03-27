import { ResolveFieldProps } from '@/utils/form/mount-form';
import { FormControl, FormHelperText, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { formatValue } from 'react-currency-input-field';

export function InputNumber(props: ResolveFieldProps) {
  const { field, setValue, errorMessage, defaultValue, trigger } = props;
  const [inputValue, setInputValue] = useState(
    defaultValue ? formatCurrencyValue(defaultValue) : '',
  );

  function formatCurrencyValue(value: any) {
    const formattedValue = formatValue({
      value: String(value),
      decimalSeparator: ',',
      groupSeparator: '.',
      prefix: '',
      decimalScale: 2,
    });

    return formattedValue;
  }

  function handleChange(event: any) {
    const formattedValue = Number(event.target.value.replace(/\D/g, '')) / 100;

    const newValue = formatCurrencyValue(formattedValue);

    if (setValue) {
      setValue(field.name, formattedValue);
      trigger && trigger(field.name);
    }

    setInputValue(newValue);
  }

  return (
    <Grid item sm={field.rowSize} xs={12}>
      <FormControl fullWidth>
        <TextField
          fullWidth
          error={Boolean(errorMessage)}
          label={field.title}
          placeholder={field.placeholder}
          value={inputValue}
          onChange={handleChange}
        />

        {errorMessage && (
          <FormHelperText sx={{ color: 'error.main', marginLeft: '4px' }}>
            {errorMessage}
          </FormHelperText>
        )}
      </FormControl>
    </Grid>
  );
}
