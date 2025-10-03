import React from 'react';
import { cn } from '@/lib/utils';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
} from 'recharts';

interface Props {
  className?: string;
}

export const PerformanceTrends: React.FC<Props> = ({ className }) => {
  // Data for Auto-Match Rate Over Time
  const autoMatchData = [
    { month: 'Jan', rate: 75, target: 80 },
    { month: 'Feb', rate: 82, target: 80 },
    { month: 'Mar', rate: 78, target: 80 },
    { month: 'Apr', rate: 88, target: 80 },
    { month: 'May', rate: 85, target: 80 },
    { month: 'Jun', rate: 92, target: 80 },
    { month: 'Jul', rate: 89, target: 80 },
    { month: 'Aug', rate: 91, target: 80 },
    { month: 'Sep', rate: 87, target: 80 },
    { month: 'Oct', rate: 93, target: 80 },
    { month: 'Nov', rate: 90, target: 80 },
    { month: 'Dec', rate: 95, target: 80 },
  ];

  // Data for Exceptions Resolved by Department
  const departmentData = [
    { department: 'Finance', resolved: 320, pending: 45 },
    { department: 'Operations', resolved: 450, pending: 60 },
    { department: 'Sales', resolved: 280, pending: 35 },
    { department: 'Marketing', resolved: 200, pending: 25 },
  ];

  // Custom tooltip for line chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-3">
          <p className="text-xs text-gray-600 mb-1">{payload[0].payload.month}</p>
          <p className="text-sm font-semibold text-emerald-600">
            Rate: {payload[0].value}%
          </p>
          {payload[1] && (
            <p className="text-xs text-gray-500">Target: {payload[1].value}%</p>
          )}
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for bar chart
  const CustomBarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-3">
          <p className="text-xs text-gray-600 mb-1">{payload[0].payload.department}</p>
          <p className="text-sm font-semibold text-blue-600">
            Resolved: {payload[0].value}
          </p>
          {payload[1] && (
            <p className="text-sm font-semibold text-amber-600">
              Pending: {payload[1].value}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={cn("", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Auto-Match Rate Over Time */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900 font-semibold text-base">Auto-Match Rate Over Time</h3>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">85%</div>
              <div className="text-xs text-emerald-600 font-medium">+5% vs last year</div>
            </div>
          </div>
          <p className="text-gray-500 text-xs mb-4">Last 12 Months Performance</p>
          
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={autoMatchData}>
              <defs>
                <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickLine={{ stroke: '#d1d5db' }}
              />
              <YAxis 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickLine={{ stroke: '#d1d5db' }}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="rate" 
                stroke="#10b981" 
                strokeWidth={3}
                fill="url(#colorRate)" 
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#f59e0b" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Exceptions Resolved by Department */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900 font-semibold text-base">Exceptions by Department</h3>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">1,250</div>
              <div className="text-xs text-emerald-600 font-medium">+10% resolution rate</div>
            </div>
          </div>
          <p className="text-gray-500 text-xs mb-4">Last Quarter Summary</p>
          
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="department" 
                tick={{ fill: '#6b7280', fontSize: 11 }}
                tickLine={{ stroke: '#d1d5db' }}
              />
              <YAxis 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickLine={{ stroke: '#d1d5db' }}
              />
              <Tooltip content={<CustomBarTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
                iconType="circle"
              />
              <Bar 
                dataKey="resolved" 
                fill="#3b82f6" 
                radius={[8, 8, 0, 0]}
                name="Resolved"
              />
              <Bar 
                dataKey="pending" 
                fill="#f59e0b" 
                radius={[8, 8, 0, 0]}
                name="Pending"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
