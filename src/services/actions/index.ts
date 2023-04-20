import { api } from '@/utils/api';
import { ActionMessageRequest } from './types';

export const actionServices = {
  message: async (data: ActionMessageRequest) => {
    const response = await api.post('/action/message', data);

    return response.data;
  },
};
