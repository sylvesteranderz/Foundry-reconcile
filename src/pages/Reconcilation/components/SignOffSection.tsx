import React from 'react';

export const SignOffSection: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <h3 className="text-base font-semibold text-gray-900 mb-4">Sign-Off / Audit Trail</h3>
      
      <div className="mb-4">
        <label className="text-xs text-gray-500 mb-2 block">Note</label>
        <textarea 
          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
          rows={3}
          placeholder="Add a note for the audit trail (optional)"
        />
      </div>
      
      <p className="text-xs text-gray-600">
        Once matched or rejected, all actions will be recorded for audit purposes.
      </p>
    </div>
  );
};

