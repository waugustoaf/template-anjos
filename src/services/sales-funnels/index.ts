import { PaginationProps } from '@/types/app/pagination';
import { api } from '@/utils/api';
import { mergePagination } from '@/utils/api/pagination';
import {
  CreateSalesFunnelResponse,
  GetSalesFunnelResponse,
  ListSalesFunnelsResponse,
  UpdateSalesFunnelResponse,
} from './types';

export const salesFunnelServices = {
  list: async (props?: PaginationProps) => {
    const response = await api.get<ListSalesFunnelsResponse>('/salesFunnel', {
      params: mergePagination(props),
    });

    return response.data;
  },
  get: async (id: string) => {
    const response = await api.get<GetSalesFunnelResponse>(`/salesFunnel/${id}`);

    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post<CreateSalesFunnelResponse>(
      '/salesFunnel',
      data,
    );

    return response.data;
  },
  update: async (id: string, body: any) => {
    const response = await api.put<UpdateSalesFunnelResponse>(
      `/salesFunnel/${id}`,
      body,
    );

    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/salesFunnel/${id}`);

    return response.data;
  },
};
