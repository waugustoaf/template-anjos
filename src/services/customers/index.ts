import { PaginationProps } from '@/types/app/pagination';
import { api } from '@/utils/api';
import { mergePagination } from '@/utils/api/pagination';
import {
  CreateCustomerResponse,
  GetCustomerResponse,
  ListCustomersResponse,
  UpdateCustomerResponse,
} from './types';

export const customerServices = {
  list: async (props?: PaginationProps) => {
    const response = await api.get<ListCustomersResponse>('/customer', {
      params: mergePagination(props),
    });

    return response.data;
  },
  get: async (id: string) => {
    const response = await api.get<GetCustomerResponse>(`/customer/${id}`);

    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post<CreateCustomerResponse>('/customer', data);

    return response.data;
  },
  update: async (id: string, body: any) => {
    const response = await api.put<UpdateCustomerResponse>(
      `/customer/${id}`,
      body,
    );

    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/customer/${id}`);

    return response.data;
  },
};
