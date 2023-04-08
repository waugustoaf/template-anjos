import { IStrategyCompact } from '@/types/entities/IStrategy';

export interface IBoardCampaign {
  id: string;
  name: string;
  active: true;
  salesSum: number;
  lostStep: boolean;
  paidTraffic: boolean;
  financialGoal: number;
  averageTicket: number;
  strategy: IStrategyCompact;
  message: {
    isEnabled: boolean;
    goal: number;
    count: number;
  };
  conversation: {
    isEnabled: boolean;
    goal: number;
    count: number;
  };
  appointment: {
    isEnabled: boolean;
    goal: number;
    count: number;
  };
  schedule: {
    isEnabled: boolean;
    goal: number;
    count: number;
  };
  negotiation: {
    isEnabled: boolean;
    goal: number;
    count: number;
  };
  sale: {
    isEnabled: boolean;
    goal: number;
    count: number;
  };
}

export interface IBoardCampaignCompact {
  id: string;
  name: string;
}
