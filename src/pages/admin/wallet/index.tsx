import { useQuery } from 'react-query';
import WalletCard from './_components/WalletCard';
import WalletTopUpHistory from './_components/WalletTopUpHistory';
import { queryFn } from '@/config/global.queries';
import { env } from '@/utils';

const WalletPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['wallet-balances'],
    queryFn: () =>
      queryFn({
        url: env().SENTINEL_API + '/wallet/list',
      }),
  });
  const {
    data: WalletBalances = [] as IWalletBalance[],
  }: { data: IWalletBalance[] } = Object(data);

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 ">
        <WalletCard
          isLoading={isLoading}
          wallet_name="Foundry Sentinel"
          balance={
            WalletBalances.find((i) => i.service == 'foundry_sentinel')?.balance
          }
          walletId={
            WalletBalances.find((i) => i.service == 'foundry_sentinel')?._id
          }
        />
        <WalletCard wallet_name="SMS" />
        <WalletCard wallet_name="Email" />
      </div>

      <WalletTopUpHistory />
    </div>
  );
};

export interface IWalletBalance {
  _id: string;
  service: string;
  balance: number;
  created_on: Date;
  discount_percentage: number;
  orgId: string;
  __v: number;
}

export default WalletPage;
