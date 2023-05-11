import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

type DefaultApiResponseType = {
  success: boolean;
  statusCode: number;
  error?: string[];
  info?: {
    timestamp?: string;
    path?: string;
    currentPage?: number;
    pageSize?: number;
    totalPages?: number;
    totalRecords?: number;
    records?: number;
  };
  [key: string]: any;
};

export interface ApiType extends AxiosInstance {
  get<
    T = any,
    R = AxiosResponse<DefaultApiResponseType & { data: T }>,
    D = any,
  >(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
  delete<
    T = any,
    R = AxiosResponse<DefaultApiResponseType & { data: T }>,
    D = any,
  >(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
  head<
    T = any,
    R = AxiosResponse<DefaultApiResponseType & { data: T }>,
    D = any,
  >(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
  options<
    T = any,
    R = AxiosResponse<DefaultApiResponseType & { data: T }>,
    D = any,
  >(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
  post<
    T = any,
    R = AxiosResponse<DefaultApiResponseType & { data: T }>,
    D = any,
  >(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
  put<
    T = any,
    R = AxiosResponse<DefaultApiResponseType & { data: T }>,
    D = any,
  >(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
  patch<
    T = any,
    R = AxiosResponse<DefaultApiResponseType & { data: T }>,
    D = any,
  >(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
}
