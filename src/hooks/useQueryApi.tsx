import { queryFn } from '@/config/global.queries';
import { useQuery } from 'react-query';

type IUseQueryApi = Partial<{
  url: any;
  key: any;
  params: any;
  header: any;
  disabled?: boolean;
  alt?: boolean;
  keepPreviousData?: boolean;
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}>;

const useQueryApi = ({
  key,
  onSuccess,
  onError,
  params,
  url,
  header,
  disabled = false,
  alt = false,
  keepPreviousData = true,
}: IUseQueryApi) => {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const data: any = await queryFn({
        params,
        header,
        url,
      });

      if (alt) {
        return data;
      }

      return data?.data;
    },
    onSuccess: onSuccess,
    async onError(error: any) {
      onError?.(error);
    },
    enabled: !disabled,
    keepPreviousData,
    refetchOnWindowFocus: false,
  });
};

export default useQueryApi;
