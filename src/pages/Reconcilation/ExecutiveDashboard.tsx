import React from 'react';
import { Calendar, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { KPICards, PerformanceTrends } from './components';

const ExecutiveDashboard: React.FC = () => {
  return (
    <div className="h-full bg-gray-50 text-gray-900 overflow-auto">
      <div className="w-full h-full px-6 py-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-6 gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 mb-1">Executive Dashboard</h1>
            <p className="text-xs text-gray-600">High-level summary of reconciliation performance metrics</p>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            {/* Period Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Monthly
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border-gray-200">
                <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">Daily</DropdownMenuItem>
                <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">Weekly</DropdownMenuItem>
                <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">Monthly</DropdownMenuItem>
                <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">Quarterly</DropdownMenuItem>
                <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">Yearly</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Date Range Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Oct 1 - Oct 31, 2023
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border-gray-200">
                <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">Last 7 Days</DropdownMenuItem>
                <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">Last 30 Days</DropdownMenuItem>
                <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">Last Quarter</DropdownMenuItem>
                <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">Custom Range...</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Export Button */}
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm text-sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">Key Performance Indicators</h2>
          <KPICards className="bg-transparent" />
        </div>

        {/* Performance Trends */}
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">Performance Trends</h2>
          <PerformanceTrends className="bg-transparent" />
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;

