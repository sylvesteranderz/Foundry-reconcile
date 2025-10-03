import React from 'react';
import { ReconcilationWorkbenchHeader } from './components/ReconcilationWorkbenchHeader';
import { ReconcilationWorkbenchContent } from './components/ReconcilationWorkbenchContent';

const ReconcilationWorkbench: React.FC = () => {
  return (
    <div className="h-full bg-gray-50 text-gray-900 overflow-auto">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <ReconcilationWorkbenchHeader />
        <ReconcilationWorkbenchContent />
      </div>
    </div>
  );
};
    
export default ReconcilationWorkbench;