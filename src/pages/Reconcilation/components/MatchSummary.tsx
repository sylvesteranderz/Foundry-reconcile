import React from 'react';
import { Button } from '@/components/ui/button';

export const MatchSummary: React.FC = () => {
  const bankTotal = 1200.00;
  const foundryTotal = 400.00;
  const variance = bankTotal - foundryTotal;

  const formatAmount = (amount: number) => {
    return `$${Math.abs(amount).toFixed(2)}`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sticky top-6">
      <h2 className="text-base font-semibold text-gray-900 mb-6">Match Summary</h2>

      <div className="space-y-4 mb-6">
        {/* Bank Transactions */}
        <div className="pb-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Bank Transactions</span>
            <span className="text-sm font-medium text-gray-900">1</span>
          </div>
          <div className="text-xs text-gray-500">Foundry Finance</div>
        </div>

        {/* Foundry Finance */}
        <div className="pb-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Foundry Finance</span>
            <span className="text-sm font-medium text-gray-900">2</span>
          </div>
        </div>

        {/* Total Bank Amount */}
        <div className="pb-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total Bank Amount</span>
            <span className="text-sm font-medium text-gray-900">{formatAmount(bankTotal)}</span>
          </div>
        </div>

        {/* Total Foundry Amount */}
        <div className="pb-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total Foundry Amount</span>
            <span className="text-sm font-medium text-gray-900">{formatAmount(foundryTotal)}</span>
          </div>
        </div>

        {/* Variance */}
        <div className="pb-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Variance</span>
            <span className={`text-sm font-bold ${variance !== 0 ? 'text-red-600' : 'text-emerald-600'}`}>
              {variance < 0 ? '-' : ''}${Math.abs(variance).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <Button 
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium"
        disabled={variance !== 0}
      >
        Confirm Match ({formatAmount(variance)})
      </Button>
    </div>
  );
};

