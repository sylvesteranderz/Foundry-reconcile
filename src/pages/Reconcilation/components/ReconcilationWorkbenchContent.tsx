import React, { useState } from 'react';
import { Check, X, Filter, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Suggestion {
  id: string;
  transaction: string;
  description: string;
  date: string;
  amount: string;
  confidence: number;
  reason: string;
  category: string;
  account: string;
  income: string;
  referenceId: string;
}

export const ReconcilationWorkbenchContent: React.FC = () => {
  const suggestions: Suggestion[] = [
    {
      id: 'TXN12345',
      transaction: 'TXN12345',
      description: 'Payment for services',
      date: '2024-01-15',
      amount: '$600.00',
      confidence: 90,
      reason: 'Partial match on Ref. ID',
      category: 'Revenue',
      account: 'Checking Account (****1234)',
      income: 'Sales',
      referenceId: 'TXN-456-789-012',
    },
    {
      id: 'TXN67890',
      transaction: 'TXN67890',
      description: 'Refund for order',
      date: '2024-01-16',
      amount: '$250.00',
      confidence: 85,
      reason: 'Similar transaction history',
      category: 'Expense',
      account: 'Checking Account (****1234)',
      income: 'Refunds',
      referenceId: 'TXN-456-789-013',
    },
    {
      id: 'TXN11233',
      transaction: 'TXN11233',
      description: 'Invoice payment',
      date: '2024-01-17',
      amount: '$1000.00',
      confidence: 95,
      reason: 'Exact match on amount and date',
      category: 'Revenue',
      account: 'Checking Account (****1234)',
      income: 'Bank Feed',
      referenceId: 'TXN-456-789-014',
    },
    {
      id: 'TXN44556',
      transaction: 'TXN44556',
      description: 'Subscription fee',
      date: '2024-01-18',
      amount: '$75.00',
      confidence: 70,
      reason: 'Potential match on payee',
      category: 'Expense',
      account: 'Checking Account (****1234)',
      income: 'Subscriptions',
      referenceId: 'TXN-456-789-015',
    },
    {
      id: 'TXN77888',
      transaction: 'TXN77888',
      description: 'Expense reimbursement',
      date: '2024-01-19',
      amount: '$150.00',
      confidence: 80,
      reason: 'Match on reference number',
      category: 'Expense',
      account: 'Checking Account (****1234)',
      income: 'Reimbursements',
      referenceId: 'TXN-456-789-016',
    },
  ];

  const [selectedTransaction, setSelectedTransaction] = useState<Suggestion | null>(suggestions[0]);

  return (
    <div className="flex gap-6">
      {/* Main Content */}
      <div className="flex-1">
        {/* Suggestions Queue Section */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">Suggestions Queue</h2>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 text-xs"
              >
                <Filter className="w-3 h-3 mr-1.5" />
                Filter
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 text-xs"
              >
                <ArrowUpDown className="w-3 h-3 mr-1.5" />
                Sort
              </Button>
              <Button 
                size="sm"
                className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs"
              >
                <Check className="w-3 h-3 mr-1.5" />
                Approve All
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Confidence
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reason
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {suggestions.map((suggestion) => (
                  <tr 
                    key={suggestion.id} 
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedTransaction(suggestion)}
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{suggestion.id}</div>
                      <div className="text-xs text-gray-500">{suggestion.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {suggestion.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {suggestion.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        suggestion.confidence >= 90 ? 'bg-emerald-100 text-emerald-700' :
                        suggestion.confidence >= 80 ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {suggestion.confidence}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {suggestion.reason}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle approve
                          }}
                          className="p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded transition-colors"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle reject
                          }}
                          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Transaction Details Sidebar */}
      <div className="w-80 bg-white rounded-lg border border-gray-200 shadow-sm text-gray-900 flex-shrink-0">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">Transaction Details</h3>
          <button 
            onClick={() => setSelectedTransaction(suggestions[0])}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {selectedTransaction && (
          <>
            {/* Content */}
            <div className="px-6 py-4 space-y-4">
            {/* Description */}
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Description</label>
              <div className="text-sm text-gray-900 mt-1">{selectedTransaction.description}</div>
            </div>

            {/* Invoice Number */}
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Invoice #</label>
              <div className="text-sm text-gray-900 mt-1">{selectedTransaction.id}</div>
            </div>

            {/* Amount */}
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Amount</label>
              <div className="text-sm text-gray-900 mt-1">{selectedTransaction.amount}</div>
            </div>

            {/* Date */}
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Date</label>
              <div className="text-sm text-gray-900 mt-1">{selectedTransaction.date}</div>
            </div>

            {/* Account */}
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Account</label>
              <div className="text-sm text-gray-900 mt-1">{selectedTransaction.account}</div>
            </div>

            {/* Category */}
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Category</label>
              <div className="text-sm text-gray-900 mt-1">{selectedTransaction.category}</div>
            </div>

            {/* Income */}
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">Income</label>
              <div className="text-sm text-gray-900 mt-1">{selectedTransaction.income}</div>
            </div>

              {/* Reference ID */}
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wide">Reference ID</label>
                <div className="text-sm text-gray-900 mt-1">{selectedTransaction.referenceId}</div>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 py-4 border-t border-gray-200 space-y-2">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Actions</h4>
            <Button 
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white justify-start"
              size="sm"
            >
              <Check className="w-4 h-4 mr-2" />
              Approve Match
            </Button>
            <Button 
              variant="outline"
              className="w-full bg-white border-gray-300 text-gray-700 hover:bg-gray-50 justify-start"
              size="sm"
            >
              <X className="w-4 h-4 mr-2" />
              Reject Suggestion
            </Button>
              <Button 
                variant="outline"
                className="w-full bg-white border-gray-300 text-gray-700 hover:bg-gray-50 justify-start"
                size="sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Edit Transaction
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

