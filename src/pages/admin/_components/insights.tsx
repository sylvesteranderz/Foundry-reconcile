import { DataTable } from '@/components/shared/table';
import { DataTableColumnHeader } from '@/components/shared/table/data-column-header';
import { queryFn } from '@/config/global.queries';
import { env } from '@/utils';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import { useState } from 'react';
import { useQuery } from 'react-query';
const Insights = () => {
  const {
    data: DashboardStats,
    isLoading,
    isRefetching,
  } = useQuery<any>({
    queryKey: ['dashboard-stats'],
    queryFn: () =>
      queryFn({
        url: env().SENTINEL_API + '/sentinel/get/verification-stats',
      }),
  });

  interface IStats {
    verification_type: string;
    total: number;
    success: number;
    failed: number;
  }

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [total] = useState<number>(pagination.pageSize);
  const columns: ColumnDef<IStats>[] = [
    {
      accessorKey: 'verification_type',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Product" />
      ),
      cell: ({ row }) => <div>{row.getValue('verification_type')}</div>,
    },
    {
      accessorKey: 'total',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total Verifications" />
      ),
      cell: ({ row }) => <div>{row.getValue('total')}</div>,
    },
    {
      accessorKey: 'success',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Success" />
      ),
      cell: ({ row }) => (
        <div className="text-[green]">{row.getValue('success')}</div>
      ),
    },
    {
      accessorKey: 'failed',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Failed" />
      ),
      cell: ({ row }) => (
        <div className="text-red-500">{row.getValue('failed')}</div>
      ),
    },
  ];

  const dummy_data: IStats[] = [
    {
      verification_type: 'Ghana Card Verification',
      total: Number(DashboardStats?.data?.total || 0),
      failed: Number(DashboardStats?.data?.failed || 0),
      success: Number(DashboardStats?.data?.success || 0),
    },
    {
      verification_type: 'Ghana Passport Verification',
      total: 0,
      failed: 0,
      success: 0,
    },
    {
      verification_type: 'Voters ID Verifcation',
      total: 0,
      failed: 0,
      success: 0,
    },
  ];
  return (
    <div className="mt-4">
      <DataTable
        columns={columns}
        data={dummy_data}
        pagination={pagination}
        onPaginationChange={setPagination}
        totalItems={total}
        isLoading={isLoading || isRefetching}
      />
    </div>
  );
};

export default Insights;
