import { Icon } from '@/components/icon';
import { apiServices } from '@/services';
import { ICategory } from '@/types/entities/ICategory';
import { ICustomerTag } from '@/types/entities/ICustomerTag';
import { IStrategy } from '@/types/entities/IStrategy';
import { IUser } from '@/types/entities/IUser';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export interface ClinicFiltersProps {
  categoryId: ICategory[];
  status: string;
  campaignStatus: string;
  contractStatus: string;
}

interface ClinicFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultValues: ClinicFiltersProps;
  onSubmit: (data: ClinicFiltersProps) => void;
}

const statusOptions = [
  { value: 'ACTIVE', label: 'Ativo' },
  { value: 'INACTIVE', label: 'Inativo' },
  { value: 'BLOCKED', label: 'Bloqueado' },
  { value: 'GUIVENUP', label: 'Desistiu' },
  { value: 'EXPIRED', label: 'Expirou' },
];

const campaignStatusOptions = [
  { value: 'YES', label: 'Sim' },
  { value: 'NO', label: 'Não' },
];

const contractStatusOptions = [
  { value: 'ACTIVE', label: 'Ativo' },
  { value: 'INACTIVE', label: 'Inativo' },
  { value: 'BLOCKED', label: 'Bloqueado' },
  { value: 'GUIVENUP', label: 'Desistiu' },
  { value: 'EXPIRATION', label: 'Vai expirar' },
  { value: 'EXPIRED', label: 'Expirou' },
];

export function ClinicFiltersModal({
  defaultValues,
  isOpen,
  onClose,
  onSubmit,
}: ClinicFiltersModalProps) {
  const [filters, setFilters] = useState<ClinicFiltersProps>(defaultValues);

  function handleSubmit() {
    onSubmit(filters);
    onClose();
  }

  function handleClearFilters() {
    setFilters({
      categoryId: [],
      campaignStatus: '',
      contractStatus: '',
      status: '',
    });
  }

  const { data: categories, isLoading: categoriesLoading } = useQuery(
    ['categories-full'],
    () => apiServices.categories.full(),
  );

  function handleUpdateFilter(
    key: keyof ClinicFiltersProps,
    value: ClinicFiltersProps[typeof key],
  ) {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        <Box
          width='100%'
          display='flex'
          alignItems='center'
          justifyContent='space-between'
        >
          <>Filtro de clínicas</>
          <IconButton aria-haspopup='true' onClick={onClose}>
            <Icon fontSize='1.5rem' icon='tabler:x' />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ minWidth: { sx: undefined, sm: '28rem' } }}>
        <Autocomplete
          fullWidth
          options={categories?.data || ([] as ICategory[])}
          loading={categoriesLoading}
          multiple
          renderInput={(props: any) => (
            <TextField
              {...props}
              fullWidth
              title='Categorias'
              placeholder='Categorias'
            />
          )}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          sx={{ marginTop: '0.5rem' }}
          value={filters.categoryId}
          onChange={(_, value) => handleUpdateFilter('categoryId', value)}
        />

        <Autocomplete
          fullWidth
          options={statusOptions}
          renderInput={(props: any) => (
            <TextField
              {...props}
              fullWidth
              title='Status'
              placeholder='Status'
            />
          )}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) =>
            option?.value === value?.value
          }
          sx={{ marginTop: '0.5rem' }}
          value={statusOptions.find((o) => o.value === filters.status)}
          onChange={(_, value) =>
            handleUpdateFilter('status', value?.value || '')
          }
        />

        <Autocomplete
          fullWidth
          options={campaignStatusOptions}
          renderInput={(props: any) => (
            <TextField
              {...props}
              fullWidth
              title='Status da campanha'
              placeholder='Status da campanha'
            />
          )}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) =>
            option?.value === value?.value
          }
          sx={{ marginTop: '0.5rem' }}
          value={campaignStatusOptions.find(
            (o) => o.value === filters.campaignStatus,
          )}
          onChange={(_, value) =>
            handleUpdateFilter('campaignStatus', value?.value || '')
          }
        />

        <Autocomplete
          fullWidth
          options={contractStatusOptions}
          renderInput={(props: any) => (
            <TextField
              {...props}
              fullWidth
              title='Status do contrato'
              placeholder='Status do contrato'
            />
          )}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) =>
            option?.value === value?.value
          }
          sx={{ marginTop: '0.5rem' }}
          value={contractStatusOptions.find(
            (o) => o.value === filters.contractStatus,
          )}
          onChange={(_, value) =>
            handleUpdateFilter('contractStatus', value?.value || '')
          }
        />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            margin: '1.5rem 0 0.5rem',
          }}
        >
          <Button
            color='error'
            variant='text'
            sx={{ textTransform: 'capitalize' }}
            onClick={handleClearFilters}
          >
            Limpar filtros
          </Button>
          <Button type='button' variant='contained' onClick={handleSubmit}>
            Aplicar
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
