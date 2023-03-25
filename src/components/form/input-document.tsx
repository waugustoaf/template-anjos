import { clearFormEventManager } from '@/utils/event/clear-form';
import { ResolveFieldProps } from '@/utils/form/mount-form';
import { FormControl, FormHelperText, Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import ReactInputMask from 'react-input-mask';

export function InputDocument(props: ResolveFieldProps) {
  const { field, setValue, errorMessage, defaultValue, trigger } = props;

  const [resetting, setResetting] = useState(false);
  const [input, setInput] = useState(defaultValue);

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

  useEffect(() => {
    setValue && setValue(field.name, input || '');
  }, [input]);

  if (resetting) return null;

  return (
    <Grid item sm={field.rowSize} xs={12}>
      <FormControl fullWidth>
        <ReactInputMask
          mask={input?.length > 14 ? '99.999.999/9999-99' : '999.999.999-999'}
          maskChar=''
          style={{ borderColor: errorMessage ? 'error.main' : 'inherit' }}
          value={input || ''}
          onChange={(e) => setInput(e.target.value)}
          onBlur={() => {
            trigger && trigger(field.name);
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
