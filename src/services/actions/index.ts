import {api} from '@/utils/api';
import {ActionConversationRequest, ActionMessageRequest} from './types';

export const actionServices = {
  message: async (data: ActionMessageRequest) => {
    const response = await api.post('/action/message', data);

    return response.data;
  },

  conversation: async (data: ActionConversationRequest) => {
    const response = await api.post('/action/conversation', data);

    return response.data;
  },
};
