import React from 'react';
import { SuggestedMatchHeader } from './components/SuggestedMatchHeader';
import { MatchComparisonCards } from './components/MatchComparisonCards';
import { MatchConfidencePanel } from './components/MatchConfidencePanel';
import { SignOffSection } from './components/SignOffSection';
import { AuditTrail } from './components/AuditTrail';

const SuggestedMatchDetails: React.FC = () => {
  return (
    <div className="h-full bg-gray-50 text-gray-900 overflow-auto">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <SuggestedMatchHeader />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left side - Match comparison cards and sign-off */}
          <div className="lg:col-span-2 space-y-6">
            <MatchComparisonCards />
            <SignOffSection />
            <AuditTrail />
          </div>

          {/* Right side - Match confidence panel */}
          <div className="lg:col-span-1">
            <MatchConfidencePanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedMatchDetails;

