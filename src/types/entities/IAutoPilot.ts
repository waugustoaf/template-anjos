import {IStrategyNameId} from "@/types/entities/IStrategy";

export interface IAutoPilot {
  id: string;
  month: number;
  year: number;
  strategies: string[];
}

export interface IGetAutoPilot {
  id: string;
  month: number;
  year: number;
  monthDescription: string;
  strategies: IStrategyNameId[];
}

export interface IAutoPilotWitMonthDescription extends IAutoPilot{
  monthDescription: string;
}