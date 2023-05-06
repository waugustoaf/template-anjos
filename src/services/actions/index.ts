import {api} from '@/utils/api';
import {
  ActionAppointmentRequest,
  ActionConversationRequest,
  ActionDeleteSaleRequest,
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

  deleteSale: async (data: ActionDeleteSaleRequest) => {
    const response = await api.delete(`/action/deleteSale/${data.saleId}/${data.customerId}`);

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

  getActionsList: async (boardId: string, customerId: string) => {
    const { data} = await api.get(`/action/list/${boardId}/${customerId}`);

    const conversation = data.data.find((item: any) => item.action === 'CONVERSATION') ?  {
      id: data.data.find((item: any) => item.action === 'CONVERSATION').id,
      resume : data.data.find((item: any) => item.action === 'CONVERSATION').message,
    } : null;

    const schedule = data.data.find((item: any) => item.action === 'SCHEDULE') ?  {
      id: data.data.find((item: any) => item.action === 'SCHEDULE').id,
      resume : data.data.find((item: any) => item.action === 'SCHEDULE').message,
      date: data.data.find((item: any) => item.action === 'SCHEDULE').schedule,
      confirm1: data.data.find((item: any) => item.action === 'SCHEDULE').confirm1,
      confirm2: data.data.find((item: any) => item.action === 'SCHEDULE').confirm2,
      confirmed: data.data.find((item: any) => item.action === 'SCHEDULE').confirmed,
    } : null;


    const appointment = data.data.find((item: any) => item.action === 'APPOINTMENT') ?  {
      id: data.data.find((item: any) => item.action === 'APPOINTMENT').id,
      resume : data.data.find((item: any) => item.action === 'APPOINTMENT').message,
      date: data.data.find((item: any) => item.action === 'APPOINTMENT').appointmentDate,
    } : null;

    const sale = data.data.find((item: any) => item.action === 'SALE') ?  {
      id: data.data.find((item: any) => item.action === 'SALE').id,
      productId : data.data.find((item: any) => item.action === 'SALE').product.id,
      value: data.data.find((item: any) => item.action === 'SALE').product.value,
      strategyId: data.data.find((item: any) => item.action === 'SALE').strategySale.id,
    } : null;

    return {
      conversation,
      schedule,
      appointment,
      sale,
    };
  }
};
