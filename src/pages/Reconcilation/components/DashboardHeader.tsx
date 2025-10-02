import React from 'react';
import { Bell, Calendar, ChevronDown, Download } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export const DashboardHeader: React.FC = () => {
  return (
    <div className="bg-slate-800 border-b border-slate-700">
      <div className="px-6 py-4">
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <span className="text-xl font-semibold text-white">FinRecon</span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-blue-400 font-medium">Dashboard</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Reconciliations</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Reports</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Settings</a>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-300 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Dashboard Controls */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Executive Dashboard</h1>
            <p className="text-gray-400">High-level summary of reconciliation performance metrics</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
                  Monthly
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-700 border-slate-600">
                <DropdownMenuItem className="text-white hover:bg-slate-600">Daily</DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-slate-600">Weekly</DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-slate-600">Monthly</DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-slate-600">Quarterly</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Oct 1 - Oct 31, 2023</span>
              <span className="sm:hidden">Oct 2023</span>
            </Button>

            <Button variant="outline" className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
