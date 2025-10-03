import React from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const MatchConfidencePanel: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sticky top-6">
      <h3 className="text-base font-semibold text-gray-900 mb-4">Match Confidence</h3>
      
      {/* Confidence Score */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-4xl font-bold text-emerald-600">95%</span>
          <span className="text-sm text-gray-600">confidence score</span>
        </div>
        <p className="text-xs text-gray-600">
          High chance suggested match can be reconciled
        </p>
      </div>

      {/* Analysis */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Analysis</h4>
        
        <div className="space-y-3">
          {/* Match */}
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-emerald-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">Match</div>
              <div className="text-xs text-gray-600">Amounts found Match</div>
            </div>
          </div>

          {/* Discrepancy */}
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <AlertCircle className="w-3 h-3 text-amber-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">Discrepancy</div>
              <div className="text-xs text-gray-600">1 day off between dates. Banks batch</div>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-blue-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">Date</div>
              <div className="text-xs text-gray-600">Similarly recorded in the past</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
          Accept Match
        </Button>
        <Button 
          variant="outline"
          className="w-full bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Reject Match
        </Button>
        <Button 
          variant="outline"
          className="w-full bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Mark for Exception
        </Button>
      </div>
    </div>
  );
};

