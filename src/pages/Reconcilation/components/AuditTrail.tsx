import React from 'react';
import { User, AlertTriangle } from 'lucide-react';

export const AuditTrail: React.FC = () => {
  const auditItems = [
    {
      id: 1,
      icon: 'check',
      title: 'You created this transaction.',
      description: 'Clare from unit of my other Omnibus are home captured',
      time: '3 hours ago',
    },
    {
      id: 2,
      icon: 'edit',
      title: 'You edited the Date field',
      description: 'Modified',
      time: '3 hours ago',
      badge: 'Assigned',
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <h3 className="text-base font-semibold text-gray-900 mb-4">Audit Trail</h3>
      
      <div className="space-y-4">
        {auditItems.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-gray-600" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900">{item.title}</span>
                {item.badge && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">
                    {item.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-600 mt-1">{item.description}</p>
              <span className="text-xs text-gray-500 mt-1 block">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

