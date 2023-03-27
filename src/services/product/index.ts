import { PaginationProps } from '@/types/app/pagination';
import { api } from '@/utils/api';
import { mergePagination } from '@/utils/api/pagination';
import {
  CreateProductResponse,
  GetProductResponse,
  ListProductResponse,
  UpdateProductResponse,
} from './types';

const baseUrl = '/product';

export const productServices = {
  list: async (props?: PaginationProps) => {
    const response = await api.get<ListProductResponse>(baseUrl, {
      params: mergePagination(props),
    });

    return response.data;
  },
  get: async (id: string) => {
    const response = await api.get<GetProductResponse>(`${baseUrl}/${id}`);

    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post<CreateProductResponse>(
      baseUrl,
      data,
    );

    return response.data;
  },
  update: async (id: string, body: any) => {
    const response = await api.put<UpdateProductResponse>(
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
