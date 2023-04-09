import { PaginationProps } from '@/types/app/pagination';
import { api } from '@/utils/api';
import { mergePagination } from '@/utils/api/pagination';
import {
  CreateCategoryResponse,
  GetCampaignResponse,
  ListBoardsCompact,
  ListCategoriesResponse,
} from './types';
import { ICreateCampaign } from '@/types/entities/ICampaign';

export const campaignsServices = {
  list: async (props?: PaginationProps) => {
    const response = await api.get<ListCategoriesResponse>('/campaign', {
      params: mergePagination(props),
    });

    return response.data;
  },
  get: async (id: string) => {
    const response = await api.get<GetCampaignResponse>(`/campaign/${id}`);
    return response.data;
  },
  create: async (data: ICreateCampaign) => {
    const response = await api.post<CreateCategoryResponse>('/campaign', data);

    return response.data;
  },
  compactBoards: async () => {
    const response = await api.get<ListBoardsCompact>(
      `/campaign/boardsCompact`,
    );

    return response.data;
  },
};
