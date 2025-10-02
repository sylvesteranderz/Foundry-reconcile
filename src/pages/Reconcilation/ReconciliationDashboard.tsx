import React from 'react';
import { ReconciliationHeader } from './components/ReconciliationHeader';
import { KeyMetricsCards } from './components/KeyMetricsCards';
import { DataStatusSection } from './components/DataStatusSection';
import { TotalExceptionsSection } from './components/TotalExceptionsSection';
import { ReconciliationTrends } from './components/ReconciliationTrends';
import { RecentActivity } from './components/RecentActivity';

const ReconciliationDashboard: React.FC = () => {
  return (
    <div className="h-full bg-gray-50 text-gray-900 overflow-auto">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <ReconciliationHeader className="bg-transparent" />
        
        <div className="mt-6">
          <KeyMetricsCards className="bg-transparent" />
        </div>
        
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DataStatusSection className="bg-white border border-gray-200 shadow-sm" />
          <TotalExceptionsSection className="bg-white border border-gray-200 shadow-sm" />
        </div>
        
        <div className="mt-6">
          <ReconciliationTrends className="bg-transparent" />
        </div>
        
        <div className="mt-6">
          <RecentActivity className="bg-white border border-gray-200 shadow-sm" />
        </div>
      </div>
    </div>
  );
};

export default ReconciliationDashboard;
