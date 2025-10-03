import React from 'react';
import { Button } from '@/components/ui/button';

const ConfirmForceMatch: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Confirm Force Match</h1>
          <p className="text-sm text-gray-600">Please review the details before finalizing the match.</p>
        </div>

        {/* Selected Bank Transactions */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Selected Bank Transactions (1)</h2>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left text-xs font-medium text-gray-600 px-4 py-3">Date</th>
                  <th className="text-left text-xs font-medium text-gray-600 px-4 py-3">Description</th>
                  <th className="text-right text-xs font-medium text-gray-600 px-4 py-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="text-sm text-gray-700 px-4 py-3">2024-07-27</td>
                  <td className="text-sm text-gray-700 px-4 py-3">Deposit - Check #8734</td>
                  <td className="text-sm text-emerald-600 px-4 py-3 text-right font-medium">$1,500.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Foundry Finance Transactions */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Selected Foundry Finance Transactions (2)</h2>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left text-xs font-medium text-gray-600 px-4 py-3">Date</th>
                  <th className="text-left text-xs font-medium text-gray-600 px-4 py-3">Description</th>
                  <th className="text-right text-xs font-medium text-gray-600 px-4 py-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="text-sm text-gray-700 px-4 py-3">2024-07-26</td>
                  <td className="text-sm text-gray-700 px-4 py-3">Invoice Payment - Client A</td>
                  <td className="text-sm text-emerald-600 px-4 py-3 text-right font-medium">$600.00</td>
                </tr>
                <tr>
                  <td className="text-sm text-gray-700 px-4 py-3">2024-07-28</td>
                  <td className="text-sm text-gray-700 px-4 py-3">ATM Withdrawal</td>
                  <td className="text-sm text-red-600 px-4 py-3 text-right font-medium">$300.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Bank Amount</span>
              <span className="text-sm font-semibold text-gray-900">$1,200.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Foundry Amount</span>
              <span className="text-sm font-semibold text-gray-900">$900.00</span>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">Variance</span>
                <span className="text-base font-bold text-red-600">$300.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reason for Force Match */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reason for Force Match (Optional)
          </label>
          <textarea
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
            rows={4}
            placeholder="e.g., Bank fee correction, timing difference"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button 
            variant="outline" 
            className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 px-6"
          >
            Cancel
          </Button>
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6"
          >
            Finalize Match
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmForceMatch;

