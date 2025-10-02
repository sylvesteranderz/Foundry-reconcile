import React from 'react';
import ProgressBar from '@/components/progress-bar/ProgressBar';
import {
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Timer,
  ShieldAlert,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ElementType;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, change, isPositive, icon: IconComp }) => {
  // Extract numeric value from change string (e.g., "+5%" -> 5)
  const changeValue = parseInt(change.replace(/[^0-9-]/g, ''));
  const progressValue = Math.abs(changeValue);
  
  return (
    <div className="relative rounded-lg p-4 border border-gray-200 bg-white shadow-sm transition-all duration-200 cursor-pointer group hover:shadow-md">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`grid place-items-center size-8 rounded-lg ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
            <IconComp className="w-4 h-4" />
          </div>
          <h3 className="text-gray-700 font-medium text-xs leading-tight">{title}</h3>
        </div>
        <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-gray-600 transition-all group-hover:translate-x-1" />
      </div>

      <div className="mb-2">
        <span className="text-2xl font-bold text-gray-900 tracking-tight">{value}</span>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-gray-500">vs last period</span>
          <span className={`text-[10px] font-semibold ${isPositive ? 'text-emerald-700' : 'text-rose-700'}`}>{change}</span>
        </div>
        <ProgressBar completed={progressValue} height="6px" />
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
      icon: TrendingUp,
    },
    {
      title: 'Total Exceptions Resolved',
      value: '1,250',
      change: '+10%',
      isPositive: true,
      icon: CheckCircle2,
    },
    {
      title: 'Avg. Reconciliation Time',
      value: '2.5 days',
      change: '-15%',
      isPositive: false,
      icon: Timer,
    },
    {
      title: 'Risk Exposure',
      value: '$500K',
      change: '-20%',
      isPositive: false,
      icon: ShieldAlert,
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
            icon={kpi.icon}
          />
        ))}
      </div>
    </div>
  );
};
