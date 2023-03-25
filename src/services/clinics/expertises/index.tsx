import { PaginationProps } from '@/types/app/pagination';
import { api } from '@/utils/api';
import { mergePagination } from '@/utils/api/pagination';
import {
  GetExpertiseResponse,
} from './types';

export const expertiseServices = {
  list: async (props?: PaginationProps) => {
    const response = await api.get<GetExpertiseResponse>('/clinic/expertise', {
      params: mergePagination(props),
    });

    return response.data;
  },
};
