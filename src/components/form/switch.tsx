import { ResolveFieldProps } from '@/utils/form/mount-form';
import {
  Switch as MuiSwitch,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  TextField,
} from '@mui/material';

export function Switch(props: ResolveFieldProps) {
  const { field, errorMessage, defaultValue, setValue } = props;

  return (
    <Grid item sm={field.rowSize} xs={12}>
      <FormControl fullWidth>
        <FormControlLabel
          label={field.title}
          control={
            <MuiSwitch
              defaultChecked={defaultValue}
              name={field.name}
              onChange={(event) =>
                setValue && setValue(field.name, event.target.checked)
              }
            />
          }
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
