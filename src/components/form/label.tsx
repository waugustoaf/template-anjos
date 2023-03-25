import { ResolveFieldProps } from '@/utils/form/mount-form';
import {FormControl, FormHelperText, FormLabel, Grid, TextField} from '@mui/material';

export function Label(props: ResolveFieldProps) {
  const { field, register, errorMessage, defaultValue } = props;

  return (
    <Grid item sm={field.rowSize} xs={12}>
      <FormControl fullWidth>
        <FormLabel defaultValue={defaultValue || ''}>{field.title}</FormLabel>

        {errorMessage && (
          <FormHelperText sx={{ color: 'error.main', marginLeft: '4px' }}>
            {errorMessage}
          </FormHelperText>
        )}
      </FormControl>
    </Grid>
  );
}
