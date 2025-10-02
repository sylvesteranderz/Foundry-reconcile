import React from 'react';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface Props { className?: string }

export const SearchAndFilters: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("flex flex-col lg:flex-row gap-4", className)}>
      {/* Search Bar */}
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search by transaction ID, amount, or date..."
          className="pl-10 bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:ring-emerald-500"
        />
      </div>
      
      {/* Filter Dropdowns */}
      <div className="flex gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
              Date Range
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border-gray-200">
            <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">All Time</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">Last 7 Days</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">Last 30 Days</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">Last 90 Days</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">Custom Range</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
              Reconciliation Type
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border-gray-200">
            <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">All Types</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">Payment</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">Refund</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">Adjustment</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">Transfer</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
              Amount Range
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border-gray-200">
            <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">All Amounts</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">$0 - $100</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">$100 - $500</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">$500 - $1,000</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-900 hover:bg-gray-100">$1,000+</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
