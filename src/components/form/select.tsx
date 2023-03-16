import { ResolveFieldProps } from '@/utils/form/mount-form';
import {
  FormControl,
  FormHelperText,
  Grid,
  Select as MuiSelect,
} from '@mui/material';

export function Select(props: ResolveFieldProps) {
  const { field, register, errorMessage, defaultValue } = props;

  return (
    <Grid item sm={field.rowSize} xs={12}>
      <FormControl fullWidth>
        <MuiSelect defaultValue={defaultValue}></MuiSelect>

        {errorMessage && (
          <FormHelperText sx={{ color: 'error.main', marginLeft: '4px' }}>
            {errorMessage}
          </FormHelperText>
        )}
      </FormControl>
    </Grid>
  );
}
