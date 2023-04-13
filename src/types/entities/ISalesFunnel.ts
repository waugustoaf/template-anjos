export interface ISalesFunnel {
  id: string;
  name: string;
  conversation: boolean;
  message: boolean;
  sale: boolean;
  schedule: boolean;
  appointment: boolean;
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED';
}