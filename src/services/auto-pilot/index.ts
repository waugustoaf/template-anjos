import { PaginationProps } from '@/types/app/pagination';
import { api } from '@/utils/api';
import { mergePagination } from '@/utils/api/pagination';
import {
  CreateAutoPilotResponse,
  GetAutoPilotResponse,
  ListAutoPilotResponse,
  UpdateAutoPilotResponse,
} from './types';
import {IGetAutoPilot} from "@/types/entities/IAutoPilot";

export const autoPilotServices = {
  list: async (props?: PaginationProps) => {
    const response = await api.get<ListAutoPilotResponse>('/autoPilot', {
      params: mergePagination(props),
    });

    return response.data;
  },
  get: async (id: string) => {
    const response = await api.get<GetAutoPilotResponse>(`/autoPilot/${id}`);

    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post<CreateAutoPilotResponse>(
      '/autoPilot',
      data,
    );

    return response.data;
  },
  update: async (id: string, body: any) => {
    const response = await api.put<UpdateAutoPilotResponse>(
      `/autoPilot/${id}`,
      body,
    );

    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/autoPilot/${id}`);

    return response.data;
  },
};
