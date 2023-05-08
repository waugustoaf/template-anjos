import {ICustomer} from '@/types/entities/ICustomer';
import {ICustomerTimeline} from "@/types/entities/ICustomerTimeline";

type CBArray = {
  id: string;
  name: string;
  whatsApp: string;
  instagram: string;
  email: string;
  avatar: string;
  tags: {
    id: string;
    tag: string;
  }[];
  owner: {
    id: string;
    name: string;
    avatar: string;
  }
  strategy: {
    id: string;
    name: string;
    icon: string;
  }
};

export type ListCustomerResponse = ICustomer[];
export type ListTimelineResponse = ICustomerTimeline[];
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
