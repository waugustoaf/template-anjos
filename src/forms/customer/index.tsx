import {FormFieldProps} from '@/utils/form/mount-form';
import {apiServices} from '@/services';
import {states} from '@/utils/mocks/states';

export const customerFormFields: FormFieldProps[] = [
  {
    type: 'input',
    name: 'name',
    title: 'Nome',
    placeholder: 'Informe o nome',
    rowSize: 12,
  },
  {
    type: 'input',
    name: 'email',
    title: 'E-mail',
    placeholder: 'Informe o email',
    rowSize: 12,
  },
  {
    type: 'autocomplete',
    name: 'startStrategyId',
    title: 'Estratégia / Quadro',
    placeholder: 'Selecione a estratégia de aquisição',
    rowSize: 12,
    autocompleteFn: apiServices.campaign.strategiesCurrentCampaign,
    autocompleteLabel: 'name',
  },
  {
    type: 'input-mask',
    name: 'whatsapp',
    title: 'Celular / Whatsapp',
    placeholder: 'Informe o celular ou WhatsApp',
    mask: '(99) 99999-9999',
    rowSize: 6,
  },
  {
    type: 'input-mask',
    name: 'instagram',
    title: 'Instagram',
    placeholder: 'Informe o instagram',
    mask: '@***************************',
    rowSize: 6,
  },
  {
    type: 'select',
    name: 'origin',
    title: 'Origem',
    placeholder: 'Selecione a origem',
    selectOptions: [
      { value: 'INSTRAGRAM', label: 'Instagram' },
      { value: 'FACEBOOK', label: 'Facebook' },
      { value: 'TIKTOK', label: 'Tik-Tok' },
      { value: 'OUTRAREDE', label: 'Outra Rede Social' },
      { value: 'CAMPANHAEXTERNA', label: 'Campanha Externa' },
      { value: 'MEDIAIMPRESSA', label: 'Mídia Impressa' },
      { value: 'OUTROS', label: 'Outra Origem' },
    ],
    rowSize: 6,
  },
  {
    type: 'input',
    name: 'descOrigin',
    title: 'Descrição da origem',
    placeholder: 'Informa detalhes da origem',
    rowSize: 6,
  },
  {
    type: 'input',
    name: 'city',
    title: 'Cidade',
    placeholder: 'Informe a cidade',
    rowSize: 8,
  },
  {
    type: 'select',
    name: 'state',
    title: 'Estado',
    placeholder: 'Selecione o estado',
    rowSize: 4,
    selectOptions: states,
  },
];
