import { PaginationProps } from '@/types/app/pagination';
import { api } from '@/utils/api';
import { mergePagination } from '@/utils/api/pagination';
import {
  CreateCampaignResponse,
  GetCampaignResponse,
  ListBoards,
  ListBoardsCompact,
  ListCampaignsResponse,
} from './types';
import { ICreateCampaign } from '@/types/entities/ICampaign';

export const campaignsServices = {
  list: async (props?: PaginationProps) => {
    const response = await api.get<ListCampaignsResponse>('/campaign/list', {
      params: mergePagination(props),
    });

    return response.data;
  },
  get: async (id: string) => {
    const response = await api.get<GetCampaignResponse>(`/campaign/${id}`);
    return response.data;
  },
  create: async (data: ICreateCampaign) => {
    const response = await api.post<CreateCampaignResponse>('/campaign', data);

    return response.data;
  },
  compactBoards: async () => {
    const response = await api.get<ListBoardsCompact>(
      `/campaign/boardsCompact`,
    );

    return response.data;
  },
  boards: async () => {
    const response = await api.get<ListBoards>(
      `/campaign/boards`,
    );

    return response.data;
  },
  async listByClinic(clinicId: string, props?: PaginationProps) {
    const response = await api.get<ListCampaignsResponse>(
      `/campaign/clinic/${clinicId}`,
      {
        params: mergePagination(props),
      },
    );

    return response.data;
  },
};
