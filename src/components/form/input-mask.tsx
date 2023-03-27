import { clearFormEventManager } from '@/utils/event/clear-form';
import { ResolveFieldProps } from '@/utils/form/mount-form';
import { FormControl, FormHelperText, Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import ReactInputMask from 'react-input-mask';

export function InputMask(props: ResolveFieldProps) {
  const { field, setValue, errorMessage, defaultValue, trigger } = props;

  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    const startReset = () => {
      setResetting(true);
    };

    const event = clearFormEventManager.on('clear-form', startReset);

    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener(event, undefined as any);
      }
    };
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (resetting) {
      timeout = setTimeout(() => {
        setResetting(false);
      }, 50);
    }

    return () => clearTimeout(timeout);
  }, [resetting]);

  if (resetting) return null;

  return (
    <Grid item sm={field.rowSize} xs={12}>
      <FormControl fullWidth>
        <ReactInputMask
          mask={field.mask || ''}
          maskChar=''
          defaultValue={defaultValue}
          style={{ borderColor: errorMessage ? 'error.main' : 'inherit' }}
          onBlur={() => {
            trigger && trigger(field.name);
          }}
          onChange={(event) => {
            setValue && setValue(field.name, event.target.value);
          }}
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
