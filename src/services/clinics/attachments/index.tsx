import { api } from '@/utils/api';
import { mergePagination } from '@/utils/api/pagination';
import {
  CreateAttachmentRequest,
  CreateAttachmentResponse,
  GetAttachmentRequest,
  GetAttachmentResponse,
  UploadAttachmentResponse,
} from './types';

export const attachmentServices = {
  list: async (props: GetAttachmentRequest) => {
    const response = await api.get<GetAttachmentResponse>(
      `/attachment/${props.id}`,
      {
        params: mergePagination(props),
      },
    );

    return response.data;
  },
  upload: async (id: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post<UploadAttachmentResponse>(
      `/attachment/upload/${id}`,
      formData,
    );

    return response.data;
  },
  create: async (data: CreateAttachmentRequest) => {
    const response = await api.post<CreateAttachmentResponse>(
      '/attachment',
      data,
    );

    return response.data;
  },
};
