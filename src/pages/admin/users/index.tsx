import { DataTable } from '@/components/shared/table';
// import DataTable from '@/components/shared/data-table/data-table';
import { DataTableColumnHeader } from '@/components/shared/table/data-column-header';
// import { Select, SelectContent, SelectItem } from '@/components/ui/select';
import useUserAndRoles from '@/hooks/useUserAndRoles';
import Button from '@/pages/_component/button';
import { RootState } from '@/store/store';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Chip, useDisclosure } from '@nextui-org/react';
// import { SelectTrigger, SelectValue } from '@radix-ui/react-select';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AddUserComponent from './_components/add-user';
import { CustomInputTextField } from '@/components/form/inputs';
import useDebounce from '@/hooks/useDebounce';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DeleteUser from './_components/delete-user';
import EditUserComponent from './_components/edit-user';

const UserManagement = () => {
  const deleteUsersModalControl = useDisclosure();
  const editUsersModalControl = useDisclosure();
  const [user, setUser] = useState<any>();
  interface IUser {
    staff: {
      fullName: string;
    };
    name: string;
    email: string;
    roles: string;
  }

  const [count, setCount] = useState<number>(0);
  const { roles: Roles } = useSelector(
    (state: RootState) => state['persist-slice']
  );

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [searchQuery, setSearchQuery] = useState<string>('');

  const columns: ColumnDef<IUser>[] = [
    {
      accessorKey: 'staff',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => {
        const { fullname } = Object(row.getValue('staff'));
        return <div className="py-2">{fullname}</div>;
      },
    },
    {
      accessorKey: 'staff',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => {
        const { email } = Object(row.getValue('staff'));
        return <div className="py-2">{email}</div>;
      },
    },
    {
      accessorKey: 'roles',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Roles" />
      ),
      cell: ({ row }) => {
        const roles = Object(row.getValue('roles'));
        return (
          <div className="py-2 max-w-[20rem] flex flex-wrap gap-1 ">
            {String(roles)
              .split(',')
              .map((role) => {
                const targetRole = Roles?.find((x: any) => x.id === role);
                const parts = String(targetRole?.name).split(':');
                return <Chip>{parts[1]}</Chip>;
              })}
          </div>
        );
      },
    },

    {
      accessorKey: 'action',
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Actions" />
      ),
      cell: ({ row }) => (
        <div className="text-black font-light grid place-items-center max-w-[100px] ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Icon icon={'hugeicons:more-vertical-square-01'} />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="">
              <DropdownMenuItem
                onClick={() => {
                  setUser(row);
                  editUsersModalControl.onOpenChange();
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setUser(row);
                  deleteUsersModalControl.onOpenChange();
                }}
                className="text-verification-error-text focus:text-verification-error-text focus:bg-verification-error-bg"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const [users] = useUserAndRoles({
    users: {
      params: {
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        search: searchQuery,
      },
      setParams: (_) => null,
      debouncedValue: useDebounce(searchQuery),
    },
  });
  useEffect(() => {
    if (users.isSuccess) {
      setCount(users?.data?.data?._count?.organizationtostaff);
    }
  }, [users?.isSuccess]);

  const addUserModalProps = useDisclosure();
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="w-96">
          <CustomInputTextField
            label=""
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          title="Add New User"
          className="px-8 py-2"
          onClick={() => {
            addUserModalProps.onOpen();
          }}
        />
      </div>
      <DataTable
        className="min-h-[750px]"
        columns={columns}
        data={users?.data?.data?.organizationtostaff || []}
        pagination={pagination}
        totalItems={count}
        isLoading={users?.isLoading || users?.isRefetching}
        onPaginationChange={setPagination}
        paginated
      />

      <AddUserComponent {...addUserModalProps} />

      <DeleteUser {...deleteUsersModalControl} user={user} />
      <EditUserComponent {...editUsersModalControl} user={user} />
    </div>
  );
};

export default UserManagement;
