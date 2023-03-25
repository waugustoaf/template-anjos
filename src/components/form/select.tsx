import { ResolveFieldProps } from '@/utils/form/mount-form';
import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from '@mui/material';

export function Select(props: ResolveFieldProps) {
  const { field, register, errorMessage, defaultValue } = props;

  return (
    <Grid item sm={field.rowSize} xs={12}>
      <FormControl fullWidth>
        <InputLabel>{field.title}</InputLabel>
        <MuiSelect
          {...(register ? register(field.name) : {})}
          label={field.title}
          placeholder={field.placeholder}
          defaultValue={defaultValue}
          error={!!errorMessage}
        >
          {field.selectOptions?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </MuiSelect>

        {errorMessage && (
          <FormHelperText sx={{ color: 'error.main', marginLeft: '4px' }}>
            {errorMessage}
          </FormHelperText>
        )}
      </FormControl>
    </Grid>
  );
}
