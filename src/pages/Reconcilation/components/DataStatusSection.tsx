import React from 'react';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const DataStatusSection: React.FC<Props> = ({ className }) => {
  const dataSources = [
    {
      name: 'Foundry Finance',
      lastIngestion: '2024-07-28 10:30 AM',
      status: 'connected'
    },
    {
      name: 'Foundry Books',
      lastIngestion: '2024-07-28 10:25 AM',
      status: 'connected'
    },
    {
      name: 'Bank/Memo',
      lastIngestion: '2024-07-28 10:20 AM',
      status: 'connected'
    }
  ];

  return (
    <div className={cn("rounded-lg p-6", className)}>
      <h3 className="text-gray-900 font-semibold mb-6">Data Status</h3>
      
      <div className="space-y-4">
        {dataSources.map((source, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span className="text-gray-900 font-medium">{source.name}</span>
            </div>
            <span className="text-gray-500 text-sm">{source.lastIngestion}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
