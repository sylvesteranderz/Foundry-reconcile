import { cn } from '@/lib/utils';
import { Icon } from '@iconify/react/dist/iconify.js';
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import React, { Key, useMemo, useState } from 'react';
import LogoComponent from './Logo-Component/LogoComponent';
import { isEmpty } from 'lodash';

interface ICustomTableComponent {
  columns: Array<{ key: string; label: any } | string>;
  customColumns?: boolean;
  rows: Array<any>;
  isLoading?: boolean;
  isPaginated?: boolean;
  isFetching?: boolean;
  isStriped?: boolean;
  isHeaderSticky?: boolean;
  classNames: Partial<{
    base: string;
    table: string;
    thead: string;
    tbody: string;
    tr: string;
    th: string;
    td: string;
    tfoot: string;
    sortIcon: string;
    emptyWrapper: string;
  }>;
  selectionMode?: SelectionMode;
  onclick?: (key: Key) => void;
  onSelectionChange?: (key: any) => void;
  refetch?: () => void;
  params?: any;
  setParams?: any;
  selected?: any;
  others?: any;
  mobileFriendly?: boolean;
  mobileHeaders?: Array<{ key: string; label: any } | string>;
  mobileHeadersClassname?: string;
  bottomContentOnMoblile?: (props: any) => React.ReactNode;
}

const CustomTableComponent: React.FC<ICustomTableComponent> = ({
  columns,
  rows,
  isLoading = false,
  isFetching = false,
  classNames,
  isPaginated = false,
  isHeaderSticky = false,
  isStriped = false,
  selectionMode = 'none',
  onclick,
  params = {},
  setParams,
  refetch,
  onSelectionChange,
  selected = [],
  others = {},
  mobileFriendly = false,
  mobileHeaders = [],
  mobileHeadersClassname = '',
  bottomContentOnMoblile,
}) => {
  const headers = columns;
  const screenSize = 'desktop'; // Simplified - was using useScreenSize hook
  const display_pagination = params?.count > params?.limit && isPaginated;
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const toggleExpanded = (index: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  useMemo(() => {
    rows.forEach((row) =>
      setExpandedRows((prev) => ({
        ...prev,
        [row.id ? row.id : row?.key]: false,
      }))
    );
  }, []);
  const bottomContent =
    refetch || display_pagination ? (
      <div className="w-full flex justify-between items-center py-3 px-2 mt-auto">
        {refetch && (
          <button
            disabled={isFetching}
            onClick={() => refetch()}
            className="disabled:pointer-events-none gap-x-1 text-[23px]"
          >
            <Icon
              icon={isFetching ? 'eos-icons:loading' : 'solar:refresh-bold'}
            />
          </button>
        )}

        {display_pagination && (
          <div className="flex gap-2">
            <button
              onClick={() => setParams({ ...params, page: Math.max(1, params.page - 1) })}
              disabled={params.page <= 1}
              className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-3 py-1">
              Page {params.page} of {Math.ceil(params?.count / params?.limit)}
            </span>
            <button
              onClick={() => setParams({ ...params, page: params.page + 1 })}
              disabled={params.page >= Math.ceil(params?.count / params?.limit)}
              className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    ) : (
      <></>
    );

  if (screenSize != 'desktop' && mobileFriendly) {
    return (
      <div className="p-2 ">
        <div
          className={cn(
            ' mt-4 mb-2   p-3 cursor-pointer uppercase font-medium  text-xs rounded-none',
            mobileHeadersClassname
          )}
        >
          {mobileHeaders.map((i) => (
            <h4 key={typeof i == 'string' ? i : i.key} className="">
              {typeof i == 'string' ? i : i.label}
            </h4>
          ))}
        </div>

        <div className="grid grid-cols-1  gap-6 mt-4 mb-4">
          {isLoading || isFetching ? (
            <LogoComponent />
          ) : isEmpty(rows) ? (
            <>
              <div className="flex flex-col items-center text-xs">
                <Icon icon="gg:info" className="text-2xl" />
                <p>Nothing to show here.</p>
              </div>
            </>
          ) : (
            <>
              {rows?.map((row) => {
                const isExpanded = expandedRows[row?.id] || false;
                return (
                  <div
                    className={cn('px-3 py-4 rounded-lg relative bg-white ')}
                    onClick={() => {
                      toggleExpanded(row?.id);
                    }}
                  >
                    <div className={cn(mobileHeadersClassname, 'w-full')}>
                      {mobileHeaders?.map((header) => {
                        return (
                          <div className="px-3">
                            {getKeyValue(
                              row,
                              typeof header == 'string' ? header : header.key
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* bottom Contente */}

                    {isExpanded && (
                      <div className="bg-ash  mt-4 p-2 rounded-lg">
                        {bottomContentOnMoblile && bottomContentOnMoblile(row)}
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>
        {bottomContent}
      </div>
    );
  }

  return (
    <Table
      aria-label="custom-table"
      className="h-full relative mt-1 flex flex-col text-[8px]"
      removeWrapper
      isStriped={isStriped}
      isHeaderSticky={isHeaderSticky}
      selectionMode={selectionMode as 'none'}
      classNames={{ ...classNames, td: cn('py-3 text-sm', classNames?.td) }}
      onRowAction={onclick ? (key) => onclick(key) : undefined}
      onSelectionChange={onSelectionChange}
      selectedKeys={selected}
      checkboxesProps={{
        radius: 'none',
        classNames: {
          icon: 'text-primary-cct',
          base: 'bg-transparent after:bg-white',
          wrapper:
            'bg-transparent after:bg-transparent after:rounded-[2px] before:rounded-[2px] before:border-[1.5px] after:border-[1.5px] after:border-primary-cct',
        },
        size: 'md',
      }}
      bottomContent={bottomContent}
      {...others}
    >
      <TableHeader columns={headers}>
        {(column: any) => (
          <TableColumn
            key={column.key}
            className="uppercase font-medium !border-b text-xs rounded-none"
          >
            <p className="">{column.label}</p>
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={rows}
        emptyContent={
          !isLoading && (
            <div className="flex flex-col items-center text-xs">
              <Icon icon="gg:info" className="text-2xl" />
              <p>Nothing to show here.</p>
            </div>
          )
        }
        isLoading={isLoading}
        loadingContent={
          <div className="flex flex-col items-center mt- h-fit my-auto">
            <LogoComponent text="Foundry" />
          </div>
        }
      >
        {(row) => (
          <TableRow
            key={row.id}
            className={`hover:bg-white/5 ${onclick && 'hover:cursor-pointer'}`}
          >
            {(columnKey) => {
              return <TableCell>{getKeyValue(row, columnKey)}</TableCell>;
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CustomTableComponent;
