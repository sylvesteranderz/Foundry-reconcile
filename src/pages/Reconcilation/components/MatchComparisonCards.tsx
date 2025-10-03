import React from 'react';
import { ArrowRight } from 'lucide-react';

export const MatchComparisonCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Foundry Finance Card */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Foundry Finance</h3>
          <span className="text-xs text-gray-500">Transaction</span>
        </div>
        
        <div className="space-y-2">
          <div>
            <div className="text-xs text-gray-500">Invoice</div>
            <div className="text-sm text-gray-900 font-medium">INV-003</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500">Amount</div>
            <div className="text-lg text-gray-900 font-bold">$500.00</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500">Date</div>
            <div className="text-sm text-gray-900">2024-03-15</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500">Description</div>
            <div className="text-sm text-gray-900">Payment for services</div>
          </div>
        </div>
      </div>

      {/* Arrow */}
      <div className="hidden md:flex items-center justify-center">
        <ArrowRight className="w-8 h-8 text-emerald-500" />
      </div>

      {/* Foundry Books Card */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Foundry Books</h3>
          <span className="text-xs text-gray-500">Transaction</span>
        </div>
        
        <div className="space-y-2">
          <div>
            <div className="text-xs text-gray-500">Invoice</div>
            <div className="text-sm text-gray-900 font-medium">INV-003</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500">Amount</div>
            <div className="text-lg text-gray-900 font-bold">$500.00</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500">Date</div>
            <div className="text-sm text-gray-900">2024-03-15</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500">Description</div>
            <div className="text-sm text-gray-900">Payment for services</div>
          </div>
        </div>
      </div>

      {/* BankAlomio Card */}
      <div className="bg-white rounded-lg border-2 border-emerald-500 shadow-sm p-4 md:col-span-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-gray-900">BankAlomio</h3>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-700">
              ✓ Edit
            </span>
          </div>
          <span className="text-xs text-gray-500">Bank Transaction</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-xs text-gray-500">Reference</div>
            <div className="text-sm text-gray-900 font-medium">BAI-1023</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500">Amount</div>
            <div className="text-lg text-gray-900 font-bold">$500.00</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500">Date</div>
            <div className="text-sm text-gray-900">2024-03-16</div>
          </div>
        </div>
        
        <div className="mt-3">
          <div className="text-xs text-gray-500">Description</div>
          <div className="text-sm text-gray-900">Payment for services</div>
        </div>
      </div>
    </div>
  );
};

