import {ResolveFieldProps} from '@/utils/form/mount-form';
import {
  Autocomplete as MuiAutocomplete,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
} from '@mui/material';
import {useQuery} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import {useDebounce} from 'use-debounce';

export function Autocomplete(props: ResolveFieldProps) {
  const [search, setSearch] = useState('');
  const [hasLoaded, setHasLoaded] = useState(false);

  const { field, setValue, errorMessage, defaultValue, trigger } = props;

  const [debouncedSearch] = useDebounce(search, 750);

  const { data, isLoading } = useQuery(
    ['autocomplete', field.name, debouncedSearch],
    () =>
      field.autocompleteFn &&
      field.autocompleteFn({
        search: debouncedSearch,
      }),
  );

  function handleChange(value: any) {
    setValue && setValue(field.name, value?.id ?? undefined);
    trigger && trigger(field.name);
  }

  useEffect(() => {
    if (!isLoading) {
      setHasLoaded(true);
    }
  }, [isLoading]);

  if (!hasLoaded) {
    return (
      <Grid item sm={field.rowSize} xs={12} minHeight='56px'>
        <CircularProgress size={20} />
      </Grid>
    );
  }

  return (
    <Grid item sm={field.rowSize} xs={12}>
      <FormControl fullWidth>
        <MuiAutocomplete
          loading={isLoading}
          loadingText='Carregando...'
          defaultValue={data?.data?.find(
            (item: any) => item.id === defaultValue,
          )}
          isOptionEqualToValue={(option, value) => {
            if (typeof value === 'string') {
              return option.id === value;
            }

            return option.id === value.id;
          }}
          getOptionLabel={(option) => {
            return option[field.autocompleteLabel || 'name'] || '';
          }}
          onChange={(_, value) => handleChange(value)}
          onInputChange={(event) => {
            // @ts-ignore
            setSearch(event?.currentTarget?.value ?? '') || '';
          }}
          options={data?.data || []}
          renderInput={(params) => (
            // @ts-ignore
            <TextField
              label={field.title}
              placeholder={field.placeholder}
              error={!!errorMessage}
              {...params}
            />
          )}
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
