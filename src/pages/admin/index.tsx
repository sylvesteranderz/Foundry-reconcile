import CustomContainerWithTitle from '@/components/shared/CustomContainerWithTitle';
import { cn } from '@/lib/utils';
import { Icon } from '@iconify/react/dist/iconify.js';
// import { useNavigate } from 'react-router-dom';
import Insights from './_components/insights';
import RecentVerification from './_components/recent-verifications';
import WalletCard from './wallet/_components/WalletCard';
import { useQuery } from 'react-query';
import { queryFn } from '@/config/global.queries';
import { env } from '@/utils';
import { IWalletBalance } from './wallet';
import useUserAndRoles from '@/hooks/useUserAndRoles';
import { useCallback } from 'react';

const AdminOverview = () => {
  const [user] = useUserAndRoles({
    users: {
      params: {},
      setParams: () => null,
      debouncedValue: '',
    },
  });
  const { data: DashboardStats } = useQuery<any>({
    queryKey: ['dashboard-stats'],
    queryFn: () =>
      queryFn({
        url: env().SENTINEL_API + '/sentinel/get/verification-stats',
      }),
  });

  const _dashValues = [
    {
      title: 'Total Verifications',
      value: Number(DashboardStats?.data?.total || 0),
      icon: 'hugeicons:user-id-verification',
      iconStyles: 'text-[green]',
    },
    {
      title: 'Successful Verifications',
      value: Number(DashboardStats?.data?.success || 0),
      icon: 'solar:user-cross-broken',
      iconStyles: 'text-[green]',
    },
    {
      title: 'Failed Verification',
      value: Number(DashboardStats?.data?.failed || 0),
      icon: 'hugeicons:user-block-02',
      iconStyles: 'text-[red]',
    },
    {
      title: 'Total Users',
      value: Number(user?.data?.data?._count?.organizationtostaff || 0),
      icon: 'hugeicons:user-multiple',
      iconStyles: 'text-[green]',
    },
  ];

  // const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['wallet-balances-single'],
    queryFn: () =>
      queryFn({
        url: env().SENTINEL_API + '/wallet/list',
      }),
    // refetchInterval: 1000,
    // keepPreviousData: true,
  });
  const {
    data: WalletBalances = [] as IWalletBalance[],
  }: { data: IWalletBalance[] } = Object(data);

  const renderRecentVerification = useCallback(
    () => <RecentVerification />,
    []
  );
  return (
    <div className=" flex flex-col gap-4 ">
      {/* <div className="flex items-center justify-between">
        <h4 className="font-semibold text-[1.7rem]">Overview</h4>
      </div> */}
      <div className="grid grid-cols-4 w-full gap-4">
        {_dashValues.map((i) => (
          <div
            key={i.title}
            className="flex flex-col bg-ash p-5 rounded-xl gap-y-1 border cursor-pointer hover:shadow-sm duration-500"
          >
            <Icon icon={i.icon} className={cn('text-xl', i.iconStyles)} />
            <p className="text-sm capitalize">
              {/* {String(i[0]).replaceAll('_', ' ')} */}
              {i.title}
            </p>

            <h2 className="font-semibold text-2xl mt-8">{i.value}</h2>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[0.7fr,0.3fr] gap-4">
        <div className="flex flex-col gap-4">
          <CustomContainerWithTitle
            title="Insights"
            containerStyles="min-h-[220px]"
          >
            <Insights />
          </CustomContainerWithTitle>
          <CustomContainerWithTitle
            title="Recent Verifications"
            containerStyles="min-h-[580px]"
          >
            {renderRecentVerification()}
          </CustomContainerWithTitle>
        </div>

        <div className="flex flex-col gap-4">
          <WalletCard
            // isLoading={isLoading}
            wallet_name="Foundry Sentinel"
            balance={
              WalletBalances.find((i) => i.service == 'foundry_sentinel')
                ?.balance
            }
            walletId={
              WalletBalances.find((i) => i.service == 'foundry_sentinel')?._id
            }
          />
          <CustomContainerWithTitle
            containerStyles="min-h-[562px]"
            title="Notifications"
            childStyles="grid place-items-center"
          >
            <div className="grid place-items-center gap-3 cursor-pointer ">
              <img src="/images/empty-notification.svg" className="h-[50px]" />
              <p className=" text-fg-400 text-center">No new notifications</p>
            </div>
          </CustomContainerWithTitle>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
