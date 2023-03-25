import { useAutocomplete } from '@/hooks/useAutocomplete';
import { apiServices } from '@/services';
import { Autocomplete, Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

export interface ClinicHeaderFiltersProps {
  category: string;
  status: string;
  planStatus: string;
}

interface Props {
  filters: ClinicHeaderFiltersProps;
  setFilters: (filters: ClinicHeaderFiltersProps) => void;
}

export function ClinicHeaderFilters({ filters, setFilters }: Props) {
  const [categories, setSearch] = useAutocomplete(async (search: string) => {
    try {
      const { data } = await apiServices.categories.list({
        search,
      });

      return data;
    } catch {
      return [];
    }
  });

  function handleUpdateFilter(filter: string, value: string) {
    setFilters({
      ...filters,
      [filter]: value,
    });
  }

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      flexDirection={{ md: 'row', xs: 'column' }}
      padding='20px'
      gap='1rem'
    >
      <Autocomplete
        fullWidth
        options={categories}
        getOptionLabel={(item) => item.name}
        isOptionEqualToValue={(a, b) => a.id === b.id}
        renderInput={(params: any) => (
          <TextField {...params} label='Categoria' />
        )}
        onChange={(_, value) => {
          handleUpdateFilter('category', value?.id || '');
        }}
        onInputChange={(_, value) => {
          setSearch(value);
        }}
      />

      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          label='Status'
          title='Status'
          onChange={(event) =>
            handleUpdateFilter('status', event.target.value as string)
          }
        >
          <MenuItem value='ACTIVE'>Ativo</MenuItem>
          <MenuItem value='INACTIVE'>Inativo</MenuItem>
          <MenuItem value='BLOCKED'>Bloqueado</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Status do plano</InputLabel>
        <Select
          label='Status do plano'
          title='Status do plano'
          onChange={(event) =>
            handleUpdateFilter('planStatus', event.target.value as string)
          }
        >
          <MenuItem value='ACTIVE'>Ativo</MenuItem>
          <MenuItem value='INACTIVE'>Inativo</MenuItem>
          <MenuItem value='BLOCKED'>Bloqueado</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
