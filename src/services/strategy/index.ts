import { PaginationProps } from '@/types/app/pagination';
import { api } from '@/utils/api';
import { mergePagination } from '@/utils/api/pagination';
import {
  CreateStrategyResponse,
  GetStrategyResponse,
  ListStrategyResponse,
  UpdateStrategyResponse,
} from './types';

const baseUrl = '/strategy';

export const strategyServices = {
  list: async (props?: PaginationProps) => {
    const response = await api.get<ListStrategyResponse>(baseUrl, {
      params: mergePagination(props),
    });

    return response.data;
  },
  get: async (id: string) => {
    const response = await api.get<GetStrategyResponse>(`${baseUrl}/${id}`);

    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post<CreateStrategyResponse>(
      baseUrl,
      data,
    );

    return response.data;
  },
  update: async (id: string, body: any) => {
    const response = await api.put<UpdateStrategyResponse>(
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
