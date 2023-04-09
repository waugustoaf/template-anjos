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
      type: 'input-currency',
      name: 'financialGoal',
      title: 'Meta',
      placeholder: 'R$ 50.000,00',
      rowSize: 6,
    },
    {
      type: 'input-currency',
      name: 'averageTicket',
      title: 'Ticket Médio',
      placeholder: 'R$ 3.000,00',
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
