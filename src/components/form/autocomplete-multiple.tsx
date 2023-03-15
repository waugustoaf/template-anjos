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

export function AutocompleteMultiple(props: ResolveFieldProps) {
  const { field, setValue, errorMessage } = props;

  const [search, setSearch] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<any[]>(
    field.defaultValue ?? [],
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

  useEffect(() => {
    setValue &&
      setValue(
        field.name,
        selectedOptions.map((i) => i.id),
      );
  }, [selectedOptions]);

  return (
    <Grid item sm={field.rowSize} xs={12}>
      <FormControl fullWidth>
        <MuiAutocomplete
          multiple
          defaultValue={field.defaultValue}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option[field.autocompleteLabel || 'name']}
          value={selectedOptions}
          onChange={(_, value) => setSelectedOptions(value)}
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
