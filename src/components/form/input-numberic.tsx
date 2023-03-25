import { ResolveFieldProps } from '@/utils/form/mount-form';
import { FormControl, FormHelperText, Grid, TextField } from '@mui/material';

export function InputNumeric(props: ResolveFieldProps) {
  const { field, register, errorMessage, defaultValue } = props;

  return (
    <Grid item sm={field.rowSize} xs={12}>
      <FormControl fullWidth>
        <TextField
          fullWidth
          type='number'
          error={Boolean(errorMessage)}
          label={field.title}
          placeholder={field.placeholder}
          defaultValue={defaultValue || ''}
          {...(register ? register(field.name) : { name: field.name })}
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
