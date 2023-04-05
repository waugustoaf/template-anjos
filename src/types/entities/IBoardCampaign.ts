import {IStrategyCompact} from "@/types/entities/IStrategy";

export interface IBoardCampaign {
  id: string;
  name: string;
  paidTraffic: boolean;
  messageGoal: number;
  conversationGoal: number;
  appointmentGoal: number;
  scheduleGoal: number;
  negotiationGoal: number;
  saleGoal: number;
  messageCount: number;
  conversationCount: number;
  appointmentCount: number;
  scheduleCount: number;
  negotiationCount: number;
  saleCount: number;
  salesSum: number;
  averageTicket: number;
  financialGoal: number;
  messageStep: boolean;
  conversationStep: boolean;
  appointmentStep: boolean;
  scheduleStep: boolean;
  negotiationStep: boolean;
  saleStep: boolean;
  lostStep: boolean;
  active: true;
  strategy: IStrategyCompact;
}

export interface IBoardCampaignCompact {
  id: string;
  name: string;
}