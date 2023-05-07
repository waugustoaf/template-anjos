import { PaginationProps } from '@/types/app/pagination';
import { api } from '@/utils/api';
import { mergePagination } from '@/utils/api/pagination';
import {
  CreateCustomerTagResponse,
  GetCustomerTagResponse,
  ListCustomerTagResponse,
  UpdateCustomerTagResponse,
} from './types';

const baseUrl = '/tag';

export const customerTagServices = {
  list: async (props?: PaginationProps) => {
    const response = await api.get<ListCustomerTagResponse>(baseUrl, {
      params: mergePagination(props),
    });

    return response.data;
  },
  get: async (id: string) => {
    const response = await api.get<GetCustomerTagResponse>(`${baseUrl}/${id}`);

    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post<CreateCustomerTagResponse>(baseUrl, data);

    return response.data;
  },
  update: async (id: string, body: any) => {
    const response = await api.put<UpdateCustomerTagResponse>(
      `${baseUrl}/${id}`,
      body,
    );

    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`${baseUrl}/${id}`);

    return response.data;
  },
  full: async () => {
    const response = await api.get<ListCustomerTagResponse>(baseUrl, {
      params: mergePagination(),
    });

    return response.data;
  },
};
