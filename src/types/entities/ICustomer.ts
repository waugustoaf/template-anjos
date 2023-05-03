import {ISalesFunnel} from "@/types/entities/ISalesFunnel";
import {IStrategy} from "@/types/entities/IStrategy";
import {IProfile} from "@/types/entities/IProfile";

export interface ICustomer {
  id: string;
  name: string;
  email: string;
  funnel: ISalesFunnel;
  strategy: IStrategy;
  owner: IProfile;
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
  currentStep?: string;
  status: string;
  sumSales: number;
  countSales: number;
}
