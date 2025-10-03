import React from 'react';
import ProgressBar from '@/components/progress-bar/ProgressBar';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, change, isPositive }) => {
  // Extract numeric value from change string (e.g., "+5%" -> 5)
  const changeValue = parseInt(change.replace(/[^0-9-]/g, ''));
  const progressValue = Math.abs(changeValue);
  
  return (
    <div className="relative rounded-lg p-4 border border-gray-200 bg-white shadow-sm transition-all duration-200 cursor-pointer group hover:shadow-md">
      <div className="mb-3">
        <h3 className="text-gray-700 font-medium text-xs leading-tight">{title}</h3>
      </div>

      <div className="mb-2">
        <span className="text-2xl font-bold text-gray-900 tracking-tight">{value}</span>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-gray-500">vs last period</span>
          <span className={`text-[10px] font-semibold ${isPositive ? 'text-emerald-700' : 'text-rose-700'}`}>{change}</span>
        </div>
        <ProgressBar completed={progressValue} height="12px" />
      </div>
    </div>
  );
};

interface KPICardsProps {
  className?: string;
}

export const KPICards: React.FC<KPICardsProps> = ({ className }) => {
  const kpiData = [
    {
      title: 'Auto-Match Rate',
      value: '85%',
      change: '+5%',
      isPositive: true,
    },
    {
      title: 'Total Exceptions Resolved',
      value: '1,250',
      change: '+10%',
      isPositive: true,
    },
    {
      title: 'Avg. Reconciliation Time',
      value: '2.5 days',
      change: '-15%',
      isPositive: false,
    },
    {
      title: 'Risk Exposure',
      value: '$500K',
      change: '-20%',
      isPositive: false,
    },
  ];

  return (
    <div className={cn("", className)}>
      <h2 className="text-xl  bg-grey-200/2 font-semibold text-white mb-6">Key Performance Indicators</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <KPICard
            key={index}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            isPositive={kpi.isPositive}
          />
        ))}
      </div>
    </div>
  );
};
