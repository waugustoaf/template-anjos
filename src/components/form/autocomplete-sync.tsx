import { ResolveFieldProps } from '@/utils/form/mount-form';
import {
  Autocomplete as MuiAutocomplete,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';

export function AutocompleteSync(props: ResolveFieldProps) {
  const [search, setSearch] = useState('');
  const { field, setValue, errorMessage, defaultValue, trigger } = props;

  const [debouncedSearch] = useDebounce(search, 750);

  const options = useMemo(() => {
    let _options = field.autocompleteSyncOptions || [];

    if (debouncedSearch) {
      _options = _options.filter((item) => {
        return (
          item.label.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          item.value.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
      });
    }

    return _options.slice(0, 30);
  }, [debouncedSearch]);

  function handleChange(value: any) {
    setValue && setValue(field.name, value?.id ?? value?.value ?? undefined);
    trigger && trigger(field.name);
  }

  return (
    <Grid item sm={field.rowSize} xs={12}>
      <FormControl fullWidth>
        <MuiAutocomplete
          isOptionEqualToValue={(option, value) => {
            return option?.label === value.label;
          }}
          getOptionLabel={(option) => option.label || ''}
          onChange={(_, value) => handleChange(value)}
          options={options}
          defaultValue={
            defaultValue
              ? {
                  label: defaultValue,
                  value: defaultValue,
                }
              : undefined
          }
          renderOption={(container, option) => {
            if (field.autoCompleteSyncRender) {
              return field.autoCompleteSyncRender(container, option);
            }

            return undefined;
          }}
          onInputChange={(_, value) => setSearch(value)}
          inputValue={search}
          renderInput={(params) => (
            // @ts-ignore
            <TextField
              label={field.title}
              placeholder={field.placeholder}
              error={!!errorMessage}
              {...params}
            />
          )}
          openOnFocus
          noOptionsText='Nenhum resultado encontrado'
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
