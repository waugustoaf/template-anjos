import { IStrategy, IStrategyCompact } from '@/types/entities/IStrategy';

export interface IBoardCampaign {
  id: string;
  name: string;
  campaignId: string;
  strategyId: string;
  funnelId: string;
  active: true;
  salesSum: number;
  lostStep: boolean;
  paidTraffic: boolean;
  financialGoal: number;
  averageTicket: number;
  strategy: IStrategy;
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
