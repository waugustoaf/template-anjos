import { PaginationProps } from '@/types/app/pagination';
import { api } from '@/utils/api';
import { mergePagination } from '@/utils/api/pagination';
import {
  CreateAngelResponse,
  GetAngelResponse,
  ListAngelsResponse,
  UpdateAngelResponse,
} from './types';

export const angelServices = {
  list: async (props?: PaginationProps) => {
    const response = await api.get<ListAngelsResponse>('/angel', {
      params: mergePagination(props),
    });

    return response.data;
  },
  get: async (id: string) => {
    const response = await api.get<GetAngelResponse>(`/angel/${id}`);

    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post<CreateAngelResponse>(
      '/angel',
      data,
    );

    return response.data;
  },
  update: async (id: string, body: any) => {
    const response = await api.put<UpdateAngelResponse>(
      `/angel/${id}`,
      body,
    );

    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/angel/${id}`);

    return response.data;
  },
};
