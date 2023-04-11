import { FormFieldProps } from '@/utils/form/mount-form';

interface CampaignFormFieldsProps {
  autoPilot: React.ReactNode;
  manual: React.ReactNode;
}

export function campaignFormFields({
  autoPilot,
  manual,
}: CampaignFormFieldsProps): FormFieldProps[] {
  return [
    {
      type: 'input',
      name: 'name',
      title: 'Campanha',
      placeholder: 'John',
      rowSize: 12,
    },
    {
      type: 'select',
      name: 'month',
      title: 'Mês',
      placeholder: 'Selecione o mês da campanha',
      selectOptions: [
        { value: '1', label: 'Janeiro' },
        { value: '2', label: 'Fevereiro' },
        { value: '3', label: 'Março' },
        { value: '4', label: 'Abril' },
        { value: '5', label: 'Maio' },
        { value: '6', label: 'Junho' },
        { value: '7', label: 'Julho' },
        { value: '8', label: 'Agosto' },
        { value: '9', label: 'Setembro' },
        { value: '10', label: 'Outubro' },
        { value: '11', label: 'Novembro' },
        { value: '12', label: 'Dezembro' },
      ],
      rowSize: 6,
    },
    {
      type: 'select',
      name: 'year',
      title: 'Ano',
      placeholder: 'Selecione o ano da campanha',
      selectOptions: new Array(3)
        .fill('-')
        .map((_, index) => new Date().getFullYear() + index)
        .map((year) => ({
          value: year.toString(),
          label: year.toString(),
        })),
      rowSize: 6,
    },
    {
      type: 'input-currency',
      name: 'financialGoal',
      title: 'Meta',
      placeholder: 'Informe a meta financeira da campanha',
      rowSize: 6,
    },
    {
      type: 'input-currency',
      name: 'averageTicket',
      title: 'Ticket Médio',
      placeholder: 'Informe o ticket médio da campanha',
      rowSize: 6,
    },
    {
      type: 'children',
      name: 'autoPilot',
      title: 'Piloto automático',
      children: autoPilot,
      rowSize: 6,
    },
    {
      type: 'children',
      name: 'manual',
      title: 'Manual',
      children: manual,
      rowSize: 6,
    },
    {
      type: 'checkbox',
      name: 'paidTraffic',
      title: 'Tem orçamento para tráfego pago?',
      placeholder: 'Tem orçamento para tráfego pago?',
      rowSize: 12,
    },
  ];
}
