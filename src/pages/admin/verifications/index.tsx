import StatusText from '@/components/shared/status.text';
import { DataTable } from '@/components/shared/table';
import { DataTableColumnHeader } from '@/components/shared/table/data-column-header';
// import VerificationStatus from '@/components/shared/verification.status';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { queryFn } from '@/config/global.queries';
import { cn, env } from '@/utils';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import { format } from 'date-fns';
import { capitalize } from 'lodash';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const VerificationRecords = () => {
  const [tabValue, setTabValue] = useState<string>('today');

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  });

  const [total, setTotal] = useState<number>(pagination.pageSize);

  const {
    isLoading,
    isRefetching,
    data: Verifications,
    isSuccess,
  } = useQuery<any>({
    queryKey: ['list-all-verifications', Object.values(pagination)],
    queryFn: () =>
      queryFn({
        url: env().SENTINEL_API + '/sentinel/list/all',
        params: {
          start: pagination.pageIndex,
          limit: pagination.pageSize,
        },
      }),
  });

  const { data, count } = Object(Verifications?.data || {});

  useEffect(() => {
    if (isSuccess) {
      setTotal(Number(count || 0));
    }
  }, [isSuccess]);

  const handleTabChange = (value: string) => {
    setTabValue(value);
    console.log('Selected tab:', value);
  };

  interface IVerificationItem {
    verification_id: string;
    verification_type: string;
    id_number: string;
    creator: string;
    status: string;
    time_stamp: string;
    message: string;
  }

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
    {
      accessorKey: 'creator',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Creator" />
      ),
      cell: ({ row }) => <div>{row.getValue('creator')}</div>,
    },
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
    <div>
      <div className="flex items-center justify-between">
        {/* <h4 className="font-semibold text-[1.7rem]">Verifications</h4> */}
        <h4></h4>
        <Tabs
          value={tabValue}
          onValueChange={handleTabChange}
          className="w-[400px]"
        >
          <TabsList className="grid w-full grid-cols-5 h-fit gap-2">
            <TabsTrigger value="today" className="py-2 px-6">
              Today
            </TabsTrigger>
            <TabsTrigger value="this_week" className="py-2 px-6">
              This Week
            </TabsTrigger>
            <TabsTrigger value="this_month" className="py-2 px-6">
              This Month
            </TabsTrigger>
            <TabsTrigger value="this_year" className="py-2 px-6">
              This Year
            </TabsTrigger>
            <TabsTrigger value="custom" className="py-2 px-6">
              Custom
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="mt-4">
        <DataTable
          columns={columns}
          className="min-h-[750px]"
          data={data || []}
          paginated
          pagination={pagination}
          totalItems={total}
          isLoading={isLoading || isRefetching}
          onPaginationChange={setPagination}
        />
      </div>
    </div>
  );
};

export default VerificationRecords;
