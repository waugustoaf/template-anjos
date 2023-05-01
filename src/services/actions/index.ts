import {api} from '@/utils/api';
import {
  ActionAppointmentRequest,
  ActionConversationRequest,
  ActionMessageRequest,
  ActionSaleRequest,
  ActionScheduleRequest,
  ActionSetTagRequest
} from './types';

export const actionServices = {
  message: async (data: ActionMessageRequest) => {
    const response = await api.post('/action/message', data);

    return response.data;
  },

  conversation: async (data: ActionConversationRequest) => {
    const response = await api.post('/action/conversation', data);

    return response.data;
  },

  schedule: async (data: ActionScheduleRequest) => {
    const response = await api.post('/action/schedule', data);

    return response.data;
  },

  appointment: async (data: ActionAppointmentRequest) => {
    const response = await api.post('/action/appointment', data);

    return response.data;
  },

  sale: async (data: ActionSaleRequest) => {
    const response = await api.post('/action/sale', data);

    return response.data;
  },
  saveOwner(ownerId: string, customerId: string, boardId: string) {
    return api.post('/action/changeOwner', {
      customerId,
      boardId,
      userId: ownerId,
    });
  },

  tag: async (data: ActionSetTagRequest) => {
    const response = await api.post('/action/tag', data);

    return response.data;
  },
};
