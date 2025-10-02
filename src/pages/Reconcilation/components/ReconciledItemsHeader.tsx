import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const ReconciledItemsHeader: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Reconciled Items</h1>
        <p className="text-sm text-gray-600">View and manage all reconciled transactions within the Reconciliation Workbench.</p>
      </div>
      
      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm">
        <Download className="w-4 h-4 mr-2" />
        Export to CSV
      </Button>
    </div>
  );
};
