import {IStrategyCompact} from "@/types/entities/IStrategy";
import {IBoardCampaign} from "@/types/entities/IBoardCampaign";
import {IStrategyCampaigns} from "@/types/entities/IStrategyCampaigns";

export interface ICampaign {
  id: string;
  month: string;
  year: number;
  financialGoal: number;
  financialResult?: number;
  averageTicket: number;
  leads: number;
  leadsConverted?: number;
  leadsWithSale: number;
  goal: number;
  finalValue: number;
  campaign: string;
  strategies?: string;
  autoPilot?: boolean;
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
  strategiesCampaign: IStrategyCampaigns[];
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

