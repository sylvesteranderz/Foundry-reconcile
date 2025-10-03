import React from 'react';

const FinalSignOff: React.FC = () => {
  return (
    <div className="h-full bg-gray-50 text-gray-900 overflow-auto">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Final Sign-Off</h1>
          <p className="text-lg text-gray-600">
            Review the final reconciliation details and sign off to complete the process.
          </p>
        </div>

        {/* Unreconciled Balance Card */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-8 mb-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Unreconciled Balance</h2>
            <div className="text-6xl font-bold text-gray-900">$1,250.00</div>
          </div>
        </div>

        {/* Adjustments Section */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Adjustments Created by Type</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-900 font-medium">FX Difference</span>
              <span className="text-gray-600 text-lg">12</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-900 font-medium">Bank Fees</span>
              <span className="text-gray-600 text-lg">8</span>
            </div>
            
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-900 font-medium">Data Entry Errors</span>
              <span className="text-gray-600 text-lg">3</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors">
            Generate Report
          </button>
          
          <button className="px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors">
            Sign Off
          </button>
          
          <button className="px-8 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors">
            Close Period 03/2024
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalSignOff;
