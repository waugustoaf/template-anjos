import {Icon} from '@/components/icon';
import {apiServices} from '@/services';
import {ICustomerTag} from '@/types/entities/ICustomerTag';
import {IStrategy} from '@/types/entities/IStrategy';
import {IUser} from '@/types/entities/IUser';
import {Autocomplete, Button, Dialog, DialogContent, DialogTitle, IconButton, TextField,} from '@mui/material';
import {Box} from '@mui/system';
import {useQuery} from '@tanstack/react-query';
import {useState} from 'react';

export interface CustomerFiltersProps {
  entryStrategyIds: IStrategy[];
  saleStrategyIds: IStrategy[];
  tags: ICustomerTag[];
  owners: IUser[];
  origin: string;
  actions: string;
  currentStep: string;
  status: string;
}

interface CustomerFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultValues: CustomerFiltersProps;
  onSubmit: (data: CustomerFiltersProps) => void;
}

const originOptions = [
  { value: 'INSTRAGRAM', label: 'Instagram' },
  { value: 'FACEBOOK', label: 'Facebook' },
  { value: 'TRAFEGOPAGO', label: 'Tráfego pago' },
  { value: 'TRAFEGOPAGOIMP', label: 'Tráfego pago [IMP]' },
  { value: 'TIKTOK', label: 'Tik-Tok' },
  { value: 'OUTDOOR', label: 'Outdoor' },
  { value: 'URNA', label: 'Urna' },
  { value: 'URNA', label: 'Urna' },
  { value: 'INDICACAO', label: 'Indicação' },
  { value: 'PARCERIA', label: 'Parceria' },
  { value: 'INFLUENCER', label: 'Influencer' },
  { value: 'EVENTO', label: 'Evento' },
  { value: 'OUTRO', label: 'Outro' },
];



const actionsOptions = [
  { value: 'CREATE', label: 'Criação' },
  { value: 'MESSAGE', label: 'Mensagem' },
  { value: 'CONVERSATION', label: 'Conversa' },
  { value: 'SCHEDULE', label: 'Agendamento' },
  { value: 'APPOINTMENT', label: 'Consulta' },
  { value: 'SALE', label: 'Venda' },
  { value: 'CHANGE_OWNER', label: 'Alterou Responsável' },
  { value: 'REMOVE_TAG', label: 'Removeu Tag' },
  { value: 'ADD_TAG', label: 'Adicionou Tag' },
  { value: 'DELETE_SALE', label: 'Exclui venda' },
  { value: 'CHANGE_BOARD', label: 'Alterou campanha' },
];


const currentStepOptions = [
  { value: 'MESSAGE', label: 'Mensagem' },
  { value: 'CONVERSATION', label: 'Conversa' },
  { value: 'SCHEDULE', label: 'Agendamento' },
  { value: 'APPOINTMENT', label: 'Consulta' },
  { value: 'SALE', label: 'Venda' },
];

const statusOptions = [
  { value: 'OPEN', label: 'Aberto' },
  { value: 'CLOSED', label: 'Fechado' },
];

export function CustomerFiltersModal({
  defaultValues,
  isOpen,
  onClose,
  onSubmit,
}: CustomerFiltersModalProps) {
  const [filters, setFilters] = useState<CustomerFiltersProps>(defaultValues);

  function handleSubmit() {
    onSubmit(filters);
    onClose();
  }

  function handleClearFilters() {
    setFilters({
      actions: '',
      status: '',
      currentStep: '',
      origin: '',
      entryStrategyIds: [],
      saleStrategyIds: [],
      owners: [],
      tags: [],
    });
  }

  const { data: strategies, isLoading: strategiesLoading } = useQuery(
    ['strategies-full'],
    () => apiServices.strategy.full(),
  );
  const { data: tags, isLoading: tagsLoading } = useQuery(['tags'], () =>
    apiServices.customerTag.full(),
  );
  const { data: owners, isLoading: ownersLoading } = useQuery(['owners'], () =>
    apiServices.user.full(),
  );

  function handleUpdateFilter(
    key: keyof CustomerFiltersProps,
    value: CustomerFiltersProps[typeof key],
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
          <>Filtro de clientes</>
          <IconButton aria-haspopup='true' onClick={onClose}>
            <Icon fontSize='1.5rem' icon='tabler:x' />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ minWidth: { sx: undefined, sm: '28rem' } }}>
        <Autocomplete
          fullWidth
          options={strategies?.data || ([] as IStrategy[])}
          loading={strategiesLoading}
          multiple
          renderInput={(props: any) => (
            <TextField
              {...props}
              fullWidth
              title='Estratégia de entrada'
              placeholder='Estratégia de entrada'
            />
          )}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          sx={{ marginTop: '0.5rem' }}
          value={filters.entryStrategyIds}
          onChange={(_, value) => handleUpdateFilter('entryStrategyIds', value)}
        />

        <Autocomplete
          fullWidth
          options={strategies?.data || ([] as IStrategy[])}
          loading={strategiesLoading}
          multiple
          renderInput={(props: any) => (
            <TextField
              {...props}
              fullWidth
              title='Estratégia de saída'
              placeholder='Estratégia de saída'
            />
          )}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          sx={{ marginTop: '0.5rem' }}
          value={filters.saleStrategyIds}
          onChange={(_, value) => handleUpdateFilter('saleStrategyIds', value)}
        />

        <Autocomplete
          fullWidth
          options={owners?.data || ([] as IUser[])}
          loading={strategiesLoading}
          multiple
          renderInput={(props: any) => (
            <TextField {...props} fullWidth title='Dono' placeholder='Dono' />
          )}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          sx={{ marginTop: '0.5rem' }}
          value={filters.owners}
          onChange={(_, value) => handleUpdateFilter('owners', value)}
        />

        <Autocomplete
          fullWidth
          options={tags?.data || ([] as ICustomerTag[])}
          loading={tagsLoading}
          multiple
          renderInput={(props: any) => (
            <TextField {...props} fullWidth title='Tags' placeholder='Tags' />
          )}
          getOptionLabel={(option) => option.tag}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          sx={{ marginTop: '0.5rem' }}
          value={filters.tags}
          onChange={(_, value) => handleUpdateFilter('tags', value)}
        />

        <Autocomplete
          fullWidth
          options={originOptions}
          renderInput={(props: any) => (
            <TextField
              {...props}
              fullWidth
              title='Origem'
              placeholder='Origem'
            />
          )}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) =>
            option?.value === value?.value
          }
          sx={{ marginTop: '0.5rem' }}
          value={originOptions.find((o) => o.value === filters.origin)}
          onChange={(_, value) =>
            handleUpdateFilter('origin', value?.value || '')
          }
        />

        <Autocomplete
          fullWidth
          options={actionsOptions}
          renderInput={(props: any) => (
            <TextField
              {...props}
              fullWidth
              title='Última ação'
              placeholder='Última ação'
            />
          )}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) =>
            option?.value === value?.value
          }
          sx={{ marginTop: '0.5rem' }}
          value={actionsOptions.find((o) => o.value === filters.actions)}
          onChange={(_, value) =>
            handleUpdateFilter('actions', value?.value || '')
          }
        />

        <Autocomplete
          fullWidth
          options={currentStepOptions}
          renderInput={(props: any) => (
            <TextField
              {...props}
              fullWidth
              title='Etapa atual'
              placeholder='Etapa atual'
            />
          )}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) =>
            option?.value === value?.value
          }
          sx={{ marginTop: '0.5rem' }}
          value={currentStepOptions.find(
            (o) => o.value === filters.currentStep,
          )}
          onChange={(_, value) =>
            handleUpdateFilter('currentStep', value?.value || '')
          }
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
