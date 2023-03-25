import { IExpertise } from './IExpertise';

export interface IClinic {
  id: string;
  name: string;
  fantasyName: string;
  document: string;
  birthDate: string;
  zipCode: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  phone: string;
  observation: string;
  userAttendanceId: string;
  startContract: string;
  endContract: string;
  accumulativeTime: number;
  projectTime: number;
  contractStatus: 'ACTIVE' | 'INACTIVE' | 'BLOCKED';
  rykaAssessoria: boolean;
  anjosPay: boolean;
  impulse: boolean;
  anjosSystem: boolean;
  initialAverageRevenue: number;
  afterAverageRevenue: number;
  increaseRevenue: boolean | string;
  growthRate: number;
  initialRevenue: number;
  startValue: number;
  salesPerMonthStart: number;
  salesPerMonthAfter: number;
  increaseSales: boolean;
  avatar: string | null;
  email: string;
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED';
  planStatus: 'NOPLAN';
  expertises: IExpertise[];
  expertiseId?: string | IExpertise[];
  category: {
    id: string;
    name: string;
    autoPilot: boolean;
  };
  categoryId?: string;
}
