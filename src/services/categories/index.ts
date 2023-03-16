import { PaginationProps } from '@/types/app/pagination';
import { api } from '@/utils/api';
import { mergePagination } from '@/utils/api/pagination';
import {
  CreateCategoryResponse,
  GetCategoryResponse,
  ListCategoriesResponse,
  UpdateCategoryResponse,
} from './types';

export const categoryServices = {
  list: async (props?: PaginationProps) => {
    const response = await api.get<ListCategoriesResponse>('/category', {
      params: mergePagination(props),
    });

    return response.data;
  },
  get: async (id: string) => {
    const response = await api.get<GetCategoryResponse>(`/category/${id}`);

    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post<CreateCategoryResponse>('/category', data);

    return response.data;
  },
  update: async (id: string, body: any) => {
    const response = await api.put<UpdateCategoryResponse>(
      `/category/${id}`,
      body,
    );

    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/category/${id}`);

    return response.data;
  },
};
