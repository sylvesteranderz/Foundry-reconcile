import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const KeyMetricsCards: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6", className)}>
      {/* Auto-Match Rate Card */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <h3 className="text-gray-900 font-semibold mb-4">Auto-Match Rate</h3>
        <div className="text-4xl font-bold text-gray-900 mb-4">95%</div>
        
        {/* Progress Bar */}
        <div className="mb-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm text-gray-600">Goal: 98%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-emerald-500 h-3 rounded-full transition-all duration-300" 
              style={{ width: '95%' }}
            ></div>
          </div>
        </div>
      </div>

      {/* Risk Score Card */}
      <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-lg p-6 border border-red-200 shadow-sm">
        <h3 className="text-gray-900 font-semibold mb-4">Risk Score</h3>
        <div className="text-4xl font-bold text-red-600 mb-2">Low</div>
        <div className="text-red-700 text-sm font-medium">
          Unreconciled Balance: $5,000
        </div>
      </div>
    </div>
  );
};
