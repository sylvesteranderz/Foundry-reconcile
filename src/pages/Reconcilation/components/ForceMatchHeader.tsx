import React from 'react';

export const ForceMatchHeader: React.FC = () => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900">Force Match</h1>
      <p className="text-sm text-gray-600 mt-1">
        Manually match items from different sources. Drag and drop or select items to create a many-to-many match.
      </p>
    </div>
  );
};

