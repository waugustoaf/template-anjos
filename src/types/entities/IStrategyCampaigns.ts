import {IStrategy} from "@/types/entities/IStrategy";

export interface IStrategyCampaigns {
  id: string;
  strategy: IStrategy
  campaignId: string;
  messageGoal: number;
  conversationGoal: number;
  appointmentGoal: number;
  scheduleGoal: number;
  saleGoal: number;
  messageCount: number;
  conversationCount: number;
  appointmentCount: number;
  scheduleCount: number;
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
  messagePoint: number;
  conversationPoint: number;
  appointmentPoint: number;
  schedulePoint: number;
}

export interface IStrategyCampaignCompact {
  id: string;
  name: string;
}
