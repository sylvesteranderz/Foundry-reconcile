import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SuggestedMatchHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button 
        onClick={() => navigate('/dashboard/reconciliation-workbench')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back to Workbench</span>
      </button>
      
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Suggested Match Details</h1>
        <p className="text-sm text-gray-600 mt-1">Review and reconcile the suggested transaction match</p>
      </div>
    </div>
  );
};

