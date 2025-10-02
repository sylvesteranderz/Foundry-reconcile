import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../../components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const RecentActivity: React.FC<Props> = ({ className }) => {
  const activities = [
    {
      title: 'Bank Statement - June 2024',
      status: 'Completed',
      statusColor: 'bg-green-600',
      icon: CheckCircle,
      iconColor: 'text-green-500',
      description: 'Completed on July 15, 2024'
    },
    {
      title: 'Credit Card - June 2024',
      status: 'Pending',
      statusColor: 'bg-orange-600',
      icon: Clock,
      iconColor: 'text-orange-500',
      description: 'Pending review'
    },
    {
      title: 'Intercompany - Q2 2024',
      status: 'Completed',
      statusColor: 'bg-green-600',
      icon: CheckCircle,
      iconColor: 'text-green-500',
      description: 'Completed on July 17, 2024'
    }
  ];

  return (
    <div className={cn("rounded-lg p-6", className)}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-gray-900 font-semibold">Recent Reconciliation Activity</h3>
          <p className="text-gray-600 text-sm">Showing the latest updates on your reconciliation tasks.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
              Date: All
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border-gray-200">
            <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">All</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">Today</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">This Week</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">This Month</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
              Status: All
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border-gray-200">
            <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">All</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">Completed</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">Pending</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">In Progress</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
              Type: All
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border-gray-200">
            <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">All</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">Bank Statement</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">Credit Card</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">Intercompany</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex gap-2 ml-auto">
          <Button variant="outline" className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
            Sort
          </Button>
          <Button variant="outline" className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
            Filter
          </Button>
        </div>
      </div>

      {/* Activity List */}
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const IconComponent = activity.icon;
          return (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full ${activity.statusColor} flex items-center justify-center`}>
                  <IconComponent className={`w-5 h-5 ${activity.iconColor}`} />
                </div>
                <div>
                  <h4 className="text-gray-900 font-medium">{activity.title}</h4>
                  <p className="text-gray-600 text-sm">{activity.description}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${activity.statusColor} text-white`}>
                {activity.status}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
