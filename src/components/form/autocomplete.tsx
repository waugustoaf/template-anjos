import { ResolveFieldProps } from '@/utils/form/mount-form';
import {
  FormControl,
  FormHelperText,
  Grid,
  Autocomplete as MuiAutocomplete,
  TextField,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

export function Autocomplete(props: ResolveFieldProps) {
  const { field, setValue, errorMessage, defaultValue } = props;

  const [search, setSearch] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<any[]>(
    defaultValue ?? [],
  );

  const [debouncedSearch] = useDebounce(search, 750);

  const { data } = useQuery(
    ['autocomplete', field.name, debouncedSearch],
    () =>
      field.autocompleteFn &&
      field.autocompleteFn({
        search: debouncedSearch,
      }),
  );

  function handleChange(value: any) {
    setValue && setValue(field.name, value.id);
  }

  return (
    <Grid item sm={field.rowSize} xs={12}>
      <FormControl fullWidth>
        <MuiAutocomplete
          defaultValue={defaultValue}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option[field.autocompleteLabel || 'name']}
          onChange={(_, value) => handleChange(value)}
          onInputChange={(event) => {
            // @ts-ignore
            setSearch(event.currentTarget.value) || '';
          }}
          options={
            data?.data?.map((i: any) => ({
              id: i.id,
              label: i[field.autocompleteLabel || 'name'],
            })) || []
          }
          renderInput={(params) => (
            // @ts-ignore
            <TextField
              label={field.title}
              placeholder={field.placeholder}
              {...params}
            />
          )}
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
