export interface ISalesFunnel {
  id: string;
  name: string;
  conversation: boolean;
  message: boolean;
  negotiation: boolean;
  sale: boolean;
  schedule: boolean;
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED';
}