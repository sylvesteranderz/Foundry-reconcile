import { createBrowserRouter } from 'react-router-dom';
import MainAppLayout from '../layouts/main-app.layout';
import HomePage from '../pages/home';
import AdminDashboardLayout from '@/layouts/admin.layout';
import AdminOverview from '@/pages/admin';
import VerificationRecords from '@/pages/admin/verifications';
import WalletPage from '@/pages/admin/wallet';
import UserManagement from '@/pages/admin/users';
import NotFound from '@/pages/404';
import Login from '@/pages/auth/login';
import ExecutiveDashboard from '@/pages/Reconcilation/ExecutiveDashboard';
import ReconciliationDashboard from '@/pages/Reconcilation/ReconciliationDashboard';
import ReconciledItems from '@/pages/Reconcilation/ReconciledItems';
import ReconcilationWorkbench from '@/pages/Reconcilation/ReconcilationWorkbench';
import SuggestedMatchDetails from '@/pages/Reconcilation/SuggestedMatchDetails';
import ForceMatch from '@/pages/Reconcilation/ForceMatch';
import ConfirmForceMatch from '@/pages/Reconcilation/ConfirmForceMatch';
import FinalSignOff from '@/pages/Reconcilation/FinalSignOff';
import HistoricalArchive from '@/pages/Reconcilation/HistoricalArchive';

export const router = createBrowserRouter([
  {
    path: '/reconciliation',
    element: <ReconciliationDashboard />,
  },
  {   
    path: '/',
    element: <MainAppLayout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <AdminDashboardLayout />,
    children: [
      {
        path: '',
        element: <AdminOverview />,
      },
      {
        path: 'ReconciledItems',
        element: <ReconciledItems />,
      },
      
      {
        path: 'verifications',
        element: <VerificationRecords />,
      },
      {
        path: 'wallet',
        element: <WalletPage />,
      },
      {
        path: 'users',
        element: <UserManagement />,
      },
      {
        path: 'reconciliation',
        element: <ExecutiveDashboard />,
      },
      {
        path: 'reconciliation-dashboard',
        element: <ReconciliationDashboard />,
      },
      {
        path: 'reconciled-items',
        element: <ReconciledItems />,
      },
      {
        path: 'reconciliation-workbench',
        element: <ReconcilationWorkbench />,
      },
      {
        path: 'suggested-match-details/:id',
        element: <SuggestedMatchDetails />,
      },
      {
        path: 'force-match',
        element: <ForceMatch />,
      },
      {
        path: 'confirm-force-match',
        element: <ConfirmForceMatch />,
      },
      {
        path: 'final-sign-off',
        element: <FinalSignOff />,
      },
      {
        path: 'historical-archive',
        element: <HistoricalArchive />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  // Legacy routes for backward compatibility
  {
    path: '/reconciliation-test',
    element: <ExecutiveDashboard />,
  },
  {
    path: '/reconciliation-dashboard',
    element: <ReconciliationDashboard />,
  },
  {
    path: '/reconciled-items',
    element: <ReconciledItems />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
