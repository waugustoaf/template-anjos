import {apiServices} from '@/services';
import {Autocomplete, Box, Button, Dialog, DialogContent, DialogTitle, TextField,} from '@mui/material';
import {useQuery} from '@tanstack/react-query';
import {useState} from 'react';
import {ICategory} from "@/types/entities/ICategory";

interface DashboardFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (props: {
    categoryIds: ICategory[];
    states: string[];
  }) => void;
  defaultValues: {
    categoryIds: ICategory[];
    states: string[];
  };
}

export function DashboardFilterAdminModal({
  isOpen,
  onClose,
  defaultValues,
  onSubmit,
}: DashboardFilterModalProps) {
  const [categoryIds, setCategory] = useState(defaultValues.categoryIds);
  const [states, setStates] = useState(defaultValues.states);

  const { data: categories } = useQuery(['categories', defaultValues], () =>
    apiServices.categories.list(),
  );

  const { data: stateList } = useQuery(['states', defaultValues], () =>
    apiServices.campaign.states(),
  );

  function handleSubmit() {
    onSubmit({
      categoryIds,
      states,
    });
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Filtro de dashboard administrativo</DialogTitle>

      <DialogContent sx={{ minWidth: { sx: undefined, sm: '28rem' } }}>
        <Autocomplete
          fullWidth
          options={categories?.data || ([] as ICategory[])}
          multiple
          renderInput={(props: any) => (
            <TextField
              {...props}
              fullWidth
              title='Categoria'
              placeholder='Categoria'
            />
          )}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          sx={{ marginTop: '0.5rem' }}
          value={categoryIds}
          onChange={(_, value) => setCategory(value)}
        />

        <Autocomplete
          fullWidth
          options={stateList || ([] as any[])}
          multiple
          renderInput={(props: any) => (
            <TextField
              {...props}
              fullWidth
              title='Estado'
              placeholder='Estado'
            />
          )}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          sx={{ marginTop: '0.5rem' }}
          value={states}
          onChange={(_, value) => setStates(value)}
        />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            margin: '1.5rem 0 0.5rem',
          }}
        >
          <Button type='button' variant='contained' onClick={handleSubmit}>
            Aplicar
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
