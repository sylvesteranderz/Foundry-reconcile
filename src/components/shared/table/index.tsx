import React from 'react';
import {
  PaginationState,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
  OnChangeFn,
} from '@tanstack/react-table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Icon } from '@iconify/react';
import { Spinner, cn } from '@nextui-org/react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  className?: string;
  pagination: PaginationState;
  totalItems: number;
  onPaginationChange: OnChangeFn<PaginationState>;
  paginated?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  className,
  pagination,
  totalItems,
  onPaginationChange,
  paginated,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(totalItems / pagination.pageSize),
    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onPaginationChange: onPaginationChange,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    getPaginationRowModel: getPaginationRowModel(),
    // debugTable: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
  });
  return (
    <div className={cn('relative h-full flex flex-col', className)}>
      <Table>
        <TableHeader>
          {table?.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </tr>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={columns?.length}
                className="h-16 text-[12px] text-center"
              >
                <Spinner size="md" color="current" />
                <p>Please wait...</p>
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows?.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-[transparent]">
              <TableCell
                colSpan={columns?.length}
                className="h-24 text-center pt-6"
              >
                {/* <Icon
                    icon="gg:info"
                    className="text-[2.2rem] dark:text-gray-400 inline-flex"
                  /> */}
                <div>
                  <img
                    src="/images/table-empty.svg"
                    className="h-[50px] mx-auto "
                  />
                  <p className="dark:text-gray-400">No Data found</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {paginated && (
        <div className="w-full mt-auto">
          <div className="flex items-center justify-between px-2 w-full">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-normal">Rows per page</p>
              <Select
                value={String(table.getState().pagination.pageSize)}
                onValueChange={(value) => {
                  //   table.setPageSize(Number(value));
                  onPaginationChange({
                    ...pagination,
                    pageSize: Number(value),
                    pageIndex: 0, // Reset pageIndex on size change
                  });
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[5, 10, 15, 20, 25].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
              <div className="flex w-[100px] items-center justify-center text-sm font-normal">
                {pagination.pageIndex + 1} of{' '}
                {Math.ceil(totalItems / pagination.pageSize)}
              </div>
              <div className="flex items-center space-x-3">
                <button
                  className="disabled:text-[#9CA3AF]"
                  onClick={() =>
                    onPaginationChange({ ...pagination, pageIndex: 0 })
                  }
                  disabled={!table.getCanPreviousPage()}
                >
                  <Icon
                    icon={'fluent:arrow-next-12-filled'}
                    fontSize={18}
                    rotate={2}
                  />
                </button>
                <button
                  className="disabled:text-[#9CA3AF]"
                  onClick={() =>
                    onPaginationChange({
                      ...pagination,
                      pageIndex: Math.max(pagination.pageIndex - 1, 0),
                    })
                  }
                  disabled={!table.getCanPreviousPage()}
                >
                  <Icon icon={'grommet-icons:next'} rotate={2} fontSize={16} />
                </button>

                <p>{pagination.pageIndex + 1}</p>

                <button
                  className="disabled:text-[#9CA3AF]"
                  onClick={() =>
                    onPaginationChange({
                      ...pagination,
                      pageIndex: Math.min(
                        pagination.pageIndex + 1,
                        Math.ceil(totalItems / pagination.pageSize) - 1
                      ),
                    })
                  }
                  disabled={!table.getCanNextPage()}
                >
                  <Icon icon={'grommet-icons:next'} fontSize={16} />
                </button>
                <button
                  className="disabled:text-[#9CA3AF]"
                  onClick={() =>
                    onPaginationChange({
                      ...pagination,
                      pageIndex:
                        Math.ceil(totalItems / pagination.pageSize) - 1,
                    })
                  }
                  disabled={!table.getCanNextPage()}
                >
                  <Icon icon={'fluent:arrow-next-12-filled'} fontSize={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
