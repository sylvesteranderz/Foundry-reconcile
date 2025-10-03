import React from 'react';
import { ForceMatchHeader } from './components/ForceMatchHeader';
import { TransactionLists } from './components/TransactionLists';
import { MatchSummary } from './components/MatchSummary';

const ForceMatch: React.FC = () => {
  return (
    <div className="h-full bg-gray-50 text-gray-900 overflow-auto">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left side - Transaction Lists */}
          <div className="lg:col-span-2">
            <ForceMatchHeader />
            <TransactionLists />
          </div>

          {/* Right side - Match Summary */}
          <div className="lg:col-span-1">
            <MatchSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForceMatch;

