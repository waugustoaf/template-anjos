import { PaginationProps } from '@/types/app/pagination';
import { api } from '@/utils/api';
import { mergePagination } from '@/utils/api/pagination';
import {
  CreateUserResponse,
  GetUserResponse,
  ListUsersResponse,
  UpdateUserResponse,
} from './types';

export const userServices = {
  list: async (props?: PaginationProps) => {
    const response = await api.get<ListUsersResponse>('/user', {
      params: mergePagination(props),
    });

    return response.data;
  },
  get: async (id: string) => {
    const response = await api.get<GetUserResponse>(`/user/${id}`);

    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post<CreateUserResponse>(
      '/user',
      data,
    );

    return response.data;
  },
  update: async (id: string, body: any) => {
    const response = await api.put<UpdateUserResponse>(
      `/user/${id}`,
      body,
    );

    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/angel/${id}`);

    return response.data;
  },
};
