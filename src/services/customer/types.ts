import {ICustomer} from '@/types/entities/ICustomer';

type CBArray = {
  id: string;
  name: string;
  whatsApp: string;
  instagram: string;
  email: string;
  avatar: string;
  tags: any[];
  owner: {
    id: string;
    name: string;
    avatar: string;
  }
};

export type ListCustomerResponse = ICustomer[];
export type CreateCustomerResponse = ICustomer;
export type GetCustomerResponse = ICustomer;
export type GetCustomerCBResponse = {
  boardId: string;
  boardName: string;
  message: CBArray[];
  conversation: CBArray[];
  schedule: CBArray[];
  appointment: CBArray[];
  negotiation: CBArray[];
  sale: CBArray[];
};
export type UpdateCustomerResponse = ICustomer;
