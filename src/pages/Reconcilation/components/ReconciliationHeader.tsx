import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const ReconciliationHeader: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("mb-6", className)}>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Reconciliation Dashboard</h1>
      <p className="text-sm text-gray-600">Current Period: July 2024</p>
    </div>
  );
};
