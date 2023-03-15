import { ResolveFieldProps } from '@/utils/form/mount-form';
import { FormControl, FormHelperText, Grid, TextField } from '@mui/material';

export function Input(props: ResolveFieldProps) {
  const { field, register, errorMessage } = props;

  return (
    <Grid item sm={field.rowSize} xs={12}>
      <FormControl fullWidth>
        <TextField
          fullWidth
          error={Boolean(errorMessage)}
          label={field.title}
          placeholder={field.placeholder}
          defaultValue={field.defaultValue || ''}
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
