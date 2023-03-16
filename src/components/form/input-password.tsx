import { ResolveFieldProps } from '@/utils/form/mount-form';
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { Icon } from '../icon';

export function InputPassword(props: ResolveFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { field, register, errorMessage, defaultValue } = props;

  return (
    <Grid item sm={field.rowSize} xs={12}>
      <FormControl fullWidth>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
          }}
        >
          <TextField
            sx={{ flex: 1 }}
            fullWidth
            error={Boolean(errorMessage)}
            label={field.title}
            placeholder={field.placeholder}
            defaultValue={defaultValue || ''}
            type={isPasswordVisible ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() =>
                      setIsPasswordVisible((prevState) => !prevState)
                    }
                  >
                    <Icon
                      icon={isPasswordVisible ? 'tabler:eye' : 'tabler:eye-off'}
                      fontSize={20}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...(register ? register(field.name) : { name: field.name })}
          />
        </Box>

        {errorMessage && (
          <FormHelperText sx={{ color: 'error.main', marginLeft: '4px' }}>
            {errorMessage}
          </FormHelperText>
        )}
      </FormControl>
    </Grid>
  );
}
