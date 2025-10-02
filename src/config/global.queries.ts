import { apiClient } from './index';

interface IOptions {
  url: string;
  token?: string;
  params?: any;
  header?: any;
}

export async function queryFn<T>(options: IOptions): Promise<T> {
  const request = {
    url: options.url,
    method: 'GET',
    params: options.params,
    header: options.header,
    token: options.token,
  };

  try {
    const response = await apiClient(request);

    return response.data;
  } catch (error) {
    throw error;
  }
}
