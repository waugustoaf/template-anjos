import { authConfig } from '@/config/auth';
import axios from 'axios';
import { ApiType } from './types';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
}) as unknown as ApiType;

api.interceptors.request.use(
  async (config) => {
    const token = window.localStorage.getItem(authConfig.storageTokenKeyName)!;

    if (config?.headers && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (config) => {
    if (!config.data.success && config.config.method !== 'delete') {
      return Promise.reject(config);
    }

    return config;
  },
  (error) => {
    if (
      error?.response?.data?.code === 'invalid_token' ||
      error?.response?.status === 401
    ) {
      window.localStorage.removeItem('@anjos-guia:userData');
      window.localStorage.removeItem(authConfig.storageTokenKeyName);
      window.location.href = '/login';

      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);
