import { apiClient } from './index';

interface IOptions {
  url: string;
  token?: string;
  data: any;
  method?: 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  header?: any;
}

export async function mutateFn({
  url,
  data,
  method = 'POST',
  header,
  token,
}: IOptions) {
  const request = {
    header,
    method,
    data,
    url,
    token,
  };

  try {
    const response = await apiClient(request);

    return response?.data;
  } catch (error) {
    throw error;
  }
}
