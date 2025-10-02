import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

// Simple Line Chart Component
const LineChart: React.FC = () => {
  const data = [
    { month: 'Jan', value: 75 },
    { month: 'Feb', value: 82 },
    { month: 'Mar', value: 78 },
    { month: 'Apr', value: 88 },
    { month: 'May', value: 85 },
    { month: 'Jun', value: 85 },
  ];

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;

  const points = data.map((point, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((point.value - minValue) / range) * 80; // Leave 20% margin
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="h-64 w-full">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
        
        {/* Line chart */}
        <polyline
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2"
          points={points}
        />
        
        {/* Area fill */}
        <polygon
          fill="#3B82F6"
          fillOpacity="0.2"
          points={`0,100 ${points} 100,100`}
        />
        
        {/* Data points */}
        {data.map((point, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = 100 - ((point.value - minValue) / range) * 80;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="1.5"
              fill="#3B82F6"
            />
          );
        })}
        
        {/* X-axis labels */}
        {data.map((point, index) => {
          const x = (index / (data.length - 1)) * 100;
          return (
            <text
              key={index}
              x={x}
              y="95"
              textAnchor="middle"
              fontSize="8"
              fill="#9CA3AF"
            >
              {point.month}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

// Simple Bar Chart Component
const BarChart: React.FC = () => {
  const data = [
    { department: 'Finance', value: 300 },
    { department: 'Operations', value: 450 },
    { department: 'Sales', value: 380 },
    { department: 'Marketing', value: 320 },
  ];

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="h-64 w-full">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Grid lines */}
        <defs>
          <pattern id="grid2" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid2)" />
        
        {/* Bars */}
        {data.map((item, index) => {
          const barWidth = 20;
          const barSpacing = 5;
          const x = 10 + index * (barWidth + barSpacing);
          const height = (item.value / maxValue) * 70; // Leave 30% margin
          const y = 80 - height;
          
          return (
            <g key={index}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={height}
                fill="#1E40AF"
                rx="2"
              />
              <text
                x={x + barWidth / 2}
                y="95"
                textAnchor="middle"
                fontSize="7"
                fill="#9CA3AF"
              >
                {item.department}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const PerformanceTrends: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Auto-Match Rate Over Time */}
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-900 font-semibold text-sm">Auto-Match Rate Over Time</h3>
            <div className="text-right">
              <div className="text-xl font-bold text-gray-900">85%</div>
              <div className="text-xs text-emerald-600 font-medium">+5%</div>
            </div>
          </div>
          <p className="text-gray-500 text-[10px] mb-3">Last 12 Months</p>
          <LineChart />
        </div>

        {/* Exceptions Resolved by Department */}
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-900 font-semibold text-sm">Exceptions Resolved by Department</h3>
            <div className="text-right">
              <div className="text-xl font-bold text-gray-900">1,250</div>
              <div className="text-xs text-emerald-600 font-medium">+10%</div>
            </div>
          </div>
          <p className="text-gray-500 text-[10px] mb-3">Last Quarter</p>
          <BarChart />
        </div>
      </div>
    </div>
  );
};
