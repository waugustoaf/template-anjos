import { clearFormEventManager } from '@/utils/event/clear-form';
import { ResolveFieldProps } from '@/utils/form/mount-form';
import DatePicker from 'react-datepicker';
import { FormControl, FormHelperText, Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

export function InputDate(props: ResolveFieldProps) {
  const { field, setValue, errorMessage, defaultValue, trigger } = props;

  const [date, setDate] = useState(
    defaultValue ? new Date(defaultValue) : new Date(),
  );

  useEffect(() => {
    const startReset = () => {
      setDate(new Date(defaultValue));
    };

    const event = clearFormEventManager.on('clear-form', startReset);

    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener(event, undefined as any);
      }
    };
  }, []);

  useEffect(() => {
    setValue && setValue(field.name, date);
    trigger && trigger(field.name);
  }, [date]);

  return (
    <Grid item sm={field.rowSize} xs={12}>
      <FormControl fullWidth>
        <DatePicker
          selected={date}
          onChange={(date: Date) => setDate(date)}
          placeholderText={field.placeholder}
          customInput={<TextField label={field.title} fullWidth />}
          dateFormat={field.dateFormat || undefined}
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
