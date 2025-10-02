import React from 'react';
import { cn } from '@/lib/utils';

interface Props { className?: string }

export const NavigationTabs: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("border-b border-gray-200", className)}>
      <nav className="flex space-x-8">
        <button className="text-gray-500 hover:text-gray-900 py-3 px-1 border-b-2 border-transparent hover:border-gray-300 transition-colors text-sm font-medium">
          Unreconciled Items
        </button>
        <button className="text-gray-900 py-3 px-1 border-b-2 border-emerald-600 font-semibold text-sm">
          Reconciled Items
        </button>
      </nav>
    </div>
  );
};
