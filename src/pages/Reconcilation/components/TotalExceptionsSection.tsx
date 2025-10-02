import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const TotalExceptionsSection: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("rounded-lg p-6", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-900 font-semibold mb-2">Total Exceptions</h3>
          <div className="text-4xl font-bold text-emerald-600">15</div>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm">
          View Exceptions
        </Button>
      </div>
    </div>
  );
};
