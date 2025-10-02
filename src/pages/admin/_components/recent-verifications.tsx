import StatusText from '@/components/shared/status.text';
import { DataTable } from '@/components/shared/table';
import { DataTableColumnHeader } from '@/components/shared/table/data-column-header';
import { queryFn } from '@/config/global.queries';
// import VerificationStatus from '@/components/shared/verification.status';
import { cn } from '@/lib/utils';
import { env } from '@/utils';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import { format } from 'date-fns';
import { capitalize } from 'lodash';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
const RecentVerification = () => {
  interface IVerificationItem {
    verification_id: string;
    verification_type: string;
    id_number: string;
    creator: string;
    status: string;
    time_stamp: string;
    message: string;
  }
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [total, setTotal] = useState<number>(pagination.pageSize);
  const {
    isLoading,
    isRefetching,
    data: Verifications,
    isSuccess,
  } = useQuery<any>({
    queryKey: ['list-all-recent-verifications', Object.values(pagination)],
    queryFn: () =>
      queryFn({
        url: env().SENTINEL_API + '/sentinel/list/all',
        params: {
          start: pagination.pageIndex,
          limit: pagination.pageSize,
        },
      }),
  });

  useEffect(() => {
    if (isSuccess) {
      const { count } = Object(Verifications?.data || {});
      setTotal(Number(count || 0));
    }
  }, [isSuccess]);

  const { data } = Object(Verifications?.data || {});

  const columns: ColumnDef<IVerificationItem>[] = [
    // {
    //   accessorKey: 'verification_id',
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="#" />
    //   ),
    //   cell: ({ row }) => (
    //     <div className="py-2">{row.getValue('verification_id')}</div>
    //   ),
    // },
    {
      accessorKey: 'type',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="TYPE" />
      ),
      cell: ({ row }) => (
        <div>
          {capitalize(String(row.getValue('type')).split('_').join(' '))}
        </div>
      ),
    },
    {
      accessorKey: 'id_number',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      cell: ({ row }) => <div>{row.getValue('id_number')}</div>,
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => (
        <div className="py-3">
          {/* <VerificationStatus status={row.getValue('status')} /> */}
          <StatusText
            text={row.getValue('status') == 0 ? 'Failed' : 'Success'}
          />
        </div>
      ),
    },
    // {
    //   accessorKey: 'creator',
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Creator" />
    //   ),
    //   cell: ({ row }) => <div>{row.getValue('creator')}</div>,
    // },
    {
      accessorKey: 'timestamp',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Timestamp" />
      ),
      cell: ({ row }) => (
        <div className="text-default-400 font-light">
          {format(new Date(row.getValue('timestamp')), "dd MMM yyyy '@'HH:mm")}
        </div>
      ),
    },

    {
      accessorKey: 'message',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Message" />
      ),
      cell: ({ row }) => (
        <div
          className={cn(
            'font-extralight',
            row.getValue('status') == 1
              ? 'text-verification-success-text'
              : 'text-verification-error-text'
          )}
        >
          {row.getValue('message')}
        </div>
      ),
    },
  ];

  return (
    <div className="mt-4">
      <DataTable
        columns={columns}
        data={data || []}
        pagination={pagination}
        onPaginationChange={setPagination}
        totalItems={total}
        isLoading={isLoading || isRefetching}
      />
    </div>
  );
};

export default RecentVerification;
