import StatusText from '@/components/shared/status.text';
import { DataTable } from '@/components/shared/table';
import { DataTableColumnHeader } from '@/components/shared/table/data-column-header';
import { queryFn } from '@/config/global.queries';
import { env, parseToMoney } from '@/utils';
// import { cn } from '@/lib/utils';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const WalletTopUpHistory = () => {
  interface IWalletTopUpItem {
    date: string;
    service: string;
    amount: string;
    description: string;
    status: string;
    id: string;
  }

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [total, setTotal] = useState<number>(pagination.pageSize);

  const {
    isLoading,
    isRefetching,
    data: Txns,
    isSuccess,
  } = useQuery<any>({
    queryKey: ['list-all-wallet-txns', Object.values(pagination)],
    queryFn: () =>
      queryFn({
        url: env().SENTINEL_API + '/wallet/txns',
        params: {
          start: pagination.pageIndex,
          limit: pagination.pageSize,
        },
      }),
  });

  const { transactions: data, totalCount: count } = Object(Txns?.data || {});

  useEffect(() => {
    if (isSuccess) {
      setTotal(Number(count || 0));
    }
  }, [isSuccess]);

  const columns: ColumnDef<IWalletTopUpItem>[] = [
    // {
    //   accessorKey: 'id',
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="#" />
    //   ),
    //   cell: ({ row }) => <div className="py-2">{row.getValue('id')}</div>,
    // },
    {
      accessorKey: 'walletInfo',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Service" />
      ),
      cell: ({ row }) => {
        const { service } = Object(row.getValue('walletInfo'));
        return (
          <div className="capitalize text-default-500">
            {String(service).split('_').join(' ')}
          </div>
        );
      },
    },
    {
      accessorKey: 'amount_paid',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Amount" />
      ),
      cell: ({ row }) => (
        <div className="text-default-500 py-3">
          GHS {parseToMoney(row.getValue('amount_paid'))}
        </div>
      ),
    },

    {
      accessorKey: 'timestamp',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="date" />
      ),
      cell: ({ row }) => (
        <div className="text-default-400 font-light">
          {format(new Date(row.getValue('timestamp')), "dd MMM yyyy '@'HH:mm")}
        </div>
      ),
    },

    {
      accessorKey: 'description',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="description" />
      ),
      cell: ({ row }) => (
        <div className="text-default-400 font-light">
          {row.getValue('description')}
          {/* {format(new Date(row.getValue('time_stamp')), "dd MMM yyyy '@'HH:mm")} */}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => (
        <div className="">
          {/* <VerificationStatus status={row.getValue('status')} /> */}
          <StatusText
            text={
              row.getValue('status') == 0
                ? 'Failed'
                : row.getValue('status') == 1
                ? 'Success'
                : 'pending'
            }
          />
        </div>
      ),
    },
  ];

  return (
    <div className="mt-8">
      <p className="font-normal text-[1.2rem] mb-3">Wallet Top Up History</p>
      <DataTable
        columns={columns}
        className="min-h-[500px]"
        data={data || []}
        paginated
        pagination={pagination}
        totalItems={total}
        isLoading={isLoading || isRefetching}
        onPaginationChange={setPagination}
      />
    </div>
  );
};

export default WalletTopUpHistory;
