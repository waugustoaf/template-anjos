import { PaginationProps } from '@/types/app/pagination';
import { api } from '@/utils/api';
import { mergePagination } from '@/utils/api/pagination';
import { expertiseServices } from './expertises';
import {
  CreateClinicResponse,
  GetClinicResponse,
  ListClinicsResponse,
  UpdateClinicResponse,
} from './types';

export const clinicServices = {
  list: async (props?: PaginationProps) => {
    const response = await api.get<ListClinicsResponse>('/clinic', {
      params: mergePagination(props),
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
  expertise: expertiseServices,
};