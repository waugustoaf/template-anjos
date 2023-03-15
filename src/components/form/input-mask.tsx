import { ResolveFieldProps } from '@/utils/form/mount-form';
import { FormControl, FormHelperText, Grid, TextField } from '@mui/material';
import ReactInputMask from 'react-input-mask';

export function InputMask(props: ResolveFieldProps) {
  const { field, register, errorMessage } = props;

  return (
    <Grid item sm={field.rowSize} xs={12}>
      <FormControl fullWidth>
        <ReactInputMask
          mask={field.mask || ''}
          maskChar=''
          defaultValue={field.defaultValue}
          style={{ borderColor: errorMessage ? 'error.main' : 'inherit' }}
          {...(register ? register(field.name) : { name: field.name })}
        >
          {
            // @ts-ignore
            (inputProps: any) => (
              <TextField
                error={Boolean(errorMessage)}
                {...inputProps}
                label={field.title}
                placeholder={field.placeholder}
              />
            )
          }
        </ReactInputMask>

        {errorMessage && (
          <FormHelperText sx={{ color: 'error.main', marginLeft: '4px' }}>
            {errorMessage}
          </FormHelperText>
        )}
      </FormControl>
    </Grid>
  );
}
