import { PaginationProps } from '@/types/app/pagination';
import { api } from '@/utils/api';
import { mergePagination } from '@/utils/api/pagination';
import {
  CreateCustomerResponse,
  GetCustomerResponse,
  ListCustomerResponse,
  UpdateCustomerResponse,
} from './types';

const baseUrl = '/customer';

export const customerServices = {
  list: async (props?: PaginationProps) => {
    const response = await api.get<ListCustomerResponse>(baseUrl, {
      params: mergePagination(props),
    });

    return response.data;
  },
  get: async (id: string) => {
    const response = await api.get<GetCustomerResponse>(`${baseUrl}/${id}`);

    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post<CreateCustomerResponse>(
      baseUrl,
      data,
    );

    return response.data;
  },
  update: async (id: string, body: any) => {
    const response = await api.put<UpdateCustomerResponse>(
      `${baseUrl}/${id}`,
      body,
    );

    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`${baseUrl}/${id}`);

    return response.data;
  },
};
