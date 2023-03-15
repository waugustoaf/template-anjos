import { ResolveFieldProps } from '@/utils/form/mount-form';
import { FormControl, FormHelperText, Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { formatValue } from 'react-currency-input-field';

export function InputCurrency(props: ResolveFieldProps) {
  const { field, setValue, errorMessage } = props;
  const [inputValue, setInputValue] = useState(field.defaultValue || '');

  function handleChange(event: any) {
    const formattedValue = Number(event.target.value.replace(/\D/g, '')) / 100;

    const newValue = formatValue({
      value: String(formattedValue),
      decimalSeparator: ',',
      groupSeparator: '.',
      prefix: 'R$ ',
      decimalScale: 2,
    });

    if (setValue) {
      setValue(field.name, formattedValue);
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
