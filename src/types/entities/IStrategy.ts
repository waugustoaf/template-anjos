export interface IStrategy {
  id: string;
  active: boolean;
  name: string;
  description: string;
  link: string;
  icon: string;
  funnelId: string;
  qtdMessages: number;
  qtdConversations: number;
  qtdAppointments: number;
  qtdSchedules: number;
  funnel?: {
    id: string;
    name: string;
    autoPilot: boolean;
  };
}

export interface IStrategyCompact {
  id: string;
  name: string;
  description: string;
  link?: string;
  icon: string;
  funnelId?: string;
}

export interface IStrategyNameId {
  id: string;
  name: string;
}