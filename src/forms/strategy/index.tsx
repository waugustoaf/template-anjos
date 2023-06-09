import {Icon} from '@/components/icon';
import {apiServices} from '@/services';
import {FormFieldProps} from '@/utils/form/mount-form';
import {tablerIcons} from '@/utils/icons/tabler-icons';
import {Typography} from '@mui/material';
import {Box} from '@mui/system';

export const strategyFormFields: FormFieldProps[] = [
  {
    type: 'input',
    name: 'name',
    title: 'Nome',
    placeholder: 'Funil Direto',
    rowSize: 12,
  },
  {
    type: 'autocomplete',
    name: 'funnelId',
    title: 'Funil de vendas',
    placeholder: 'Selecione o funil de vendas',
    rowSize: 12,
    autocompleteFn: apiServices.salesFunnel.list,
    autocompleteLabel: 'name',
  },
  {
    type: 'input',
    name: 'description',
    title: 'Descrição',
    placeholder: 'Estratégia de vendas',
    rowSize: 12,
  },
  {
    type: 'input',
    name: 'link',
    title: 'Link da escola',
    placeholder: 'https://escolaanjosbusiness.com.br/',
    rowSize: 12,
  },
  {
    type: 'autocomplete-sync',
    name: 'icon',
    title: 'Ícone',
    placeholder: 'Ícone',
    autocompleteSyncOptions: tablerIcons.map((i) => ({
      label: i,
      value: i,
    })),
    autoCompleteSyncRender: (props, { label, value }) => {
      return (
        <Box
          display='flex'
          gap='0.5rem'
          alignItems='center'
          sx={{ cursor: 'pointer' }}
          {...props}
        >
          <Icon icon={`tabler:${value}`} />
          <Typography>{label}</Typography>
        </Box>
      );
    },
    rowSize: 12,
  },
  {
    type: 'label',
    name: 'configFunil',
    title:
      'Configurações do Funil - Informar os valores de conversão por etapa',
    rowSize: 12,
  },
  {
    type: 'input-number',
    name: 'qtdMessages',
    title: 'Mensagens',
    rowSize: 6,
  },
  {
    type: 'input-number',
    name: 'qtdConversations',
    title: 'Conversas',
    rowSize: 6,
  },
  {
    type: 'input-number',
    name: 'qtdSchedules',
    title: 'Agendamentos',
    rowSize: 6,
  },
  {
    type: 'input-number',
    name: 'qtdAppointments',
    title: 'Consultas',
    rowSize: 6,
  },
];
