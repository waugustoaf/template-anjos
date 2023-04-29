import {ISalesFunnel} from "@/types/entities/ISalesFunnel";
import {IStrategy} from "@/types/entities/IStrategy";

export interface ICustomer {
  id: string;
  name: string;
  email: string;
  funnel: ISalesFunnel;
  strategy: IStrategy;
  whatsApp: string;
  origin: string;
  descOrigin: string;
  instagram: string;
  whatsapp: string;
  observation: string;
  city: string;
  state: string;
  boardId?: string;
  lastAction?: string;
  lastStep?: string;
  status: string;
}
