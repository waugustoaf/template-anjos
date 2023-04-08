import {IStrategyCompact} from "@/types/entities/IStrategy";
import {IBoardCampaign} from "@/types/entities/IBoardCampaign";

export interface ICampaign {
  month: string;
  year: number;
  financialGoal: number;
  averageTicket: number;
  leads: number;
  leadsWithSale: number;
  goal: number;
  finalValue: number;
}

export interface ICampaignFull {
  id: string;
  autoPilot: boolean;
  clinicId: string;
  name: string;
  month: number;
  year: number;
  financialGoal: number;
  averageTicket: number;
  paidTraffic: boolean;
  strategies: IStrategyCompact[];
  boards: IBoardCampaign[];
}

export interface ICreateCampaign {
  name: string;
  month: number;
  year: number;
  financialGoal: number;
  averageTicket: number;
  paidTraffic: boolean;
  strategies: string[];
  autoPilot: boolean;
}

