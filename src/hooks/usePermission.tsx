import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useMemo } from 'react';

export const usePermission = ({ roles }: { roles: string[] }) => {
  const { roles: userRoles } = useSelector(
    (state: RootState) => state['persist-slice']
  );

  const adminRoleIds = useMemo(
    () =>
      userRoles
        .filter((role) => role.name.toLowerCase().includes('admin'))
        .map((role) => role.name),
    [userRoles]
  );

  //   console.log('🚀🚀 user roles -> ', roles);
  //   console.log('🚀🚀 Is admin -> ', adminRoleIds);

  const hasPermission = useMemo(
    () => roles.some((role) => adminRoleIds.includes(role)),
    [roles, adminRoleIds]
  );

  return hasPermission;
};
