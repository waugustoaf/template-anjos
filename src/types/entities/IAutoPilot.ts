import {IStrategyNameId} from "@/types/entities/IStrategy";

export interface IAutoPilot {
  id: string;
  month: number;
  year: number;
  monthDescription: string;
  strategies: IStrategyNameId[];
}
