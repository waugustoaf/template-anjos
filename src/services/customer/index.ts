import {PaginationProps} from '@/types/app/pagination';
import {api} from '@/utils/api';
import {mergePagination} from '@/utils/api/pagination';
import {
  CreateCustomerResponse,
  GetCustomerCBResponse,
  GetCustomerResponse,
  ListCustomerResponse,
  UpdateCustomerResponse,
} from './types';
import qs from 'qs';

const baseUrl = '/customer';

export const customerServices = {
  list: async (props?: PaginationProps) => {
    const response = await api.get<ListCustomerResponse>(baseUrl, {
      params: mergePagination(props),
    });

    return response.data;
  },
  get: async (id: string) => {
    const response = await api.get<GetCustomerResponse>(`${baseUrl}/${id}`);

    return response.data;
  },
  getByCampaignAndBoard: async (
    campaignId: string,
    boardId: string,
    name: string = '',
    strategyId: string[] = [],
  ) => {
    const response = await api.get<GetCustomerCBResponse>(
      `${baseUrl}/campaign/${campaignId}/board/${boardId}?name=${name}${qs.stringify(
        {
          strategyId,
        },
      )}`,
    );

    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post<CreateCustomerResponse>(baseUrl, data);

    return response.data;
  },
  update: async (id: string, body: any) => {
    const response = await api.put<UpdateCustomerResponse>(
      `${baseUrl}/${id}`,
      body,
    );

    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`${baseUrl}/${id}`);

    return response.data;
  },
  timeline: async (id: string) => {
    const response = await api.get(`${baseUrl}/${id}/timeline`);

    return response.data;
  }
};
