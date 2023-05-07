import { ClinicFiltersProps } from '@/components/pages/clinics/filters-modal';
import { PaginationProps } from '@/types/app/pagination';
import { api } from '@/utils/api';
import { mergePagination } from '@/utils/api/pagination';
import { attachmentServices } from './attachments';
import { expertiseServices } from './expertises';
import {
  CreateClinicResponse,
  GetCampaignsResponse,
  GetClinicResponse,
  ListClinicsResponse,
  UpdateClinicResponse,
} from './types';

export const clinicServices = {
  list: async (props?: PaginationProps, filters?: ClinicFiltersProps) => {
    const { campaignStatus, contractStatus, status } = filters || {};

    const categoryId = filters?.categoryId
      .map((item) => `categoryId=${item.id}`)
      .join('&')
      .replace('categoryId=', '');

    const response = await api.get<ListClinicsResponse>('/clinic', {
      params: {
        ...mergePagination(props),
        categoryId,
        status,
        contractStatus,
        campaignStatus,
      },
    });

    return response.data;
  },
  get: async (id: string) => {
    const response = await api.get<GetClinicResponse>(`/clinic/${id}`);

    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post<CreateClinicResponse>('/clinic', data);

    return response.data;
  },
  update: async (id: string, body: any) => {
    const response = await api.put<UpdateClinicResponse>(`/clinic/${id}`, body);

    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/clinic/${id}`);

    return response.data;
  },
  uploadProfilePicture: async (id: string, data: FormData) => {
    const response = await api.post(`/clinic/avatar/upload/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  },
  getCampaigns: (id: string, props?: PaginationProps) => {
    return api.get<GetCampaignsResponse>(`/campaign/clinic/${id}`, {
      params: mergePagination(props),
    });
  },
  expertise: expertiseServices,
  attachment: attachmentServices,
};
