import { usePermission } from '@/hooks/usePermission';
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Login from '../pages/auth/login';
import { RootState } from '../store/store';
interface IRouteGuard {
  children: React.ReactElement;
  onlyAdminAllowed?: boolean;
}

function RouteGuard({ children, onlyAdminAllowed }: IRouteGuard) {
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth0();

  const {
    userInfo: { roles },
  } = useSelector((state: RootState) => state.auth);

  const isAdmin = usePermission({ roles: Array.from(roles || []) });

  // console.log('🚀🚀 Is admin -> ', isAdmin);

  if (!isAuthenticated) return <Login />;

  if (authByPass.includes(pathname)) return children;

  if (isAdmin && !pathname.includes('/dashboard')) {
    return <Navigate to="/dashboard" />;
  }

  if (onlyAdminAllowed && !isAdmin) {
    return <Navigate to="/" />;
  }

  return children;

  // return <Login />;
}

const authByPass: string[] = [];

export default RouteGuard
