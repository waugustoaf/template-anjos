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
    isEnable: boolean;
    goal: number;
    count: number;
  };
  conversation: {
    isEnable: boolean;
    goal: number;
    count: number;
  };
  appointment: {
    isEnable: boolean;
    goal: number;
    count: number;
  };
  schedule: {
    isEnable: boolean;
    goal: number;
    count: number;
  };
  sale: {
    isEnable: boolean;
    goal: number;
    count: number;
  };
}

export interface IBoardCampaignCompact {
  id: string;
  name: string;
}
