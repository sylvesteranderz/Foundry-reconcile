import store from '@/store/store';
import { env } from '@/utils';
import axios, { AxiosRequestConfig } from 'axios';

export async function mutateFunction({
  url,
  data,
  header,
}: {
  url: string;
  data: any;
  header: Record<string, string>;
}) {
  const response = await apiClient({
    url,
    data,
    header: header,
    method: 'post',
  });

  return response;
}

interface IOptions {
  url: string;
  token?: string;
  method: string;
  data?: any;
  params?: any;
  header?: any;
}

export const apiClient = async (options: IOptions): Promise<any> => {
  const requestConfig = requestConfigInterface(options);

  return await axios(requestConfig);
};

const requestConfigInterface = (options: IOptions): AxiosRequestConfig<any> => {
  const { token } = store.getState().auth;

  return {
    method: options.method,
    url: options.url,
    headers: {
      Authorization: `Bearer ${token?.access}`,
      'Cache-Control': 'no-cache',
      'Max-Forwards': 3,
      'x-app-env': env().ENVIRONMENT,
      ...options.header,
    },
    params: options.params,
    data: options.data,
    timeout: 1200000,
    withCredentials: false,
    responseType: options.header?.['responseType'] || 'json',
    responseEncoding: 'utf8',
    maxRedirects: 5,
    decompress: true,
  };
};
