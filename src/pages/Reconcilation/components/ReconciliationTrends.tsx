import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

// Simple Line Chart Component
const TrendLineChart: React.FC<{ data: number[]; color: string }> = ({ data, color }) => {
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - minValue) / range) * 80;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="h-16 w-full">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={points}
        />
      </svg>
    </div>
  );
};

// Simple Bar Chart Component
const TrendBarChart: React.FC<{ data: number[]; color: string }> = ({ data, color }) => {
  const maxValue = Math.max(...data);

  return (
    <div className="h-16 w-full">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {data.map((value, index) => {
          const barWidth = 15;
          const barSpacing = 5;
          const x = 10 + index * (barWidth + barSpacing);
          const height = (value / maxValue) * 70;
          const y = 80 - height;
          
          return (
            <rect
              key={index}
              x={x}
              y={y}
              width={barWidth}
              height={height}
              fill={color}
              rx="2"
            />
          );
        })}
      </svg>
    </div>
  );
};

export const ReconciliationTrends: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("", className)}>
      <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Reconciliation Trends</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Completion Rate */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h3 className="text-gray-900 font-semibold mb-4">Completion Rate</h3>
          <div className="text-3xl font-bold text-gray-900 mb-2">85%</div>
          <div className="text-emerald-600 text-sm font-medium mb-4">Up 5% from last period</div>
          <TrendLineChart data={[70, 75, 80, 82, 85]} color="#10B981" />
        </div>

        {/* Exceptions Trend */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h3 className="text-gray-900 font-semibold mb-4">Exceptions Trend</h3>
          <div className="text-3xl font-bold text-gray-900 mb-2">15</div>
          <div className="text-gray-600 text-sm font-medium mb-4">Down 2 from last period</div>
          <TrendBarChart data={[20, 18, 17, 15]} color="#F59E0B" />
        </div>

        {/* Avg. Time to Reconcile */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h3 className="text-gray-900 font-semibold mb-4">Avg. Time to Reconcile</h3>
          <div className="text-3xl font-bold text-emerald-600 mb-2">2.5 Days</div>
          <div className="text-emerald-600 text-sm font-medium mb-4">Improved by 0.5 days</div>
          <TrendLineChart data={[4, 3.5, 3, 2.5]} color="#10B981" />
        </div>
      </div>
    </div>
  );
};
