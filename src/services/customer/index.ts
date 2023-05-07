import { PaginationProps } from '@/types/app/pagination';
import { api } from '@/utils/api';
import { mergePagination } from '@/utils/api/pagination';
import {
  CreateCustomerResponse,
  GetCustomerCBResponse,
  GetCustomerResponse,
  ListCustomerResponse,
  ListTimelineResponse,
  UpdateCustomerResponse,
} from './types';
import { CustomerFiltersProps } from '@/components/pages/customer/filters-modal';

const baseUrl = '/customer';

export const customerServices = {
  list: async (props?: PaginationProps, filters?: CustomerFiltersProps) => {
    const {
      actions,
      currentStep,
      entryStrategyIds,
      origin,
      owners,
      saleStrategyIds,
      status,
      tags,
    } = filters || {};

    const entryStrategyId = entryStrategyIds
      ?.map((item) => `entryStrategyId=${item.id}`)
      .join('&')
      .replace('entryStrategyId=', '');

    const saleStrategyId = saleStrategyIds
      ?.map((item) => `saleStrategyId=${item.id}`)
      .join('&')
      .replace('saleStrategyId=', '');

    const ownerId = owners
      ?.map((item) => `ownerId=${item.id}`)
      .join('&')
      .replace('ownerId=', '');

    const tagId = tags
      ?.map((item) => `tagId=${item.id}`)
      .join('&')
      .replace('tagId=', '');

    const response = await api.get<ListCustomerResponse>(baseUrl, {
      params: {
        ...mergePagination(props),
        lastAction: actions,
        origin,
        status,
        currentStep,
        entryStrategyId,
        saleStrategyId,
        ownerId,
        tagId,
      },
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
    ownerId: string[] = [],
    onlyMy: boolean = false,
  ) => {
    const strategies = strategyId.map((id) => `strategyId=${id}`).join('&');
    const owners = ownerId.map((id) => `ownerId=${id}`).join('&');

    const response = await api.get<GetCustomerCBResponse>(
      `${baseUrl}/campaign/${campaignId}/board/${boardId}?search=${name}&onlyMy=${onlyMy}${
        strategies ? '&' + strategies : ''
      }${owners ? '&' + owners : ''}`,
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
  timeline: async (id?: string) => {
    const response = await api.get<ListTimelineResponse>(
      `${baseUrl}/timeline/${id}`,
    );

    return response.data;
  },
};
