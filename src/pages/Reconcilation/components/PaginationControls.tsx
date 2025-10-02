import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props { className?: string }

export const PaginationControls: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="text-sm text-gray-400">
        Showing 1 to 5 of 20 results
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
          disabled
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>
        
        <div className="flex items-center gap-1">
          <Button 
            variant="outline" 
            className="bg-green-600 border-green-600 text-white hover:bg-green-700 w-8 h-8 p-0"
          >
            1
          </Button>
          <Button 
            variant="outline" 
            className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 w-8 h-8 p-0"
          >
            2
          </Button>
          <Button 
            variant="outline" 
            className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 w-8 h-8 p-0"
          >
            3
          </Button>
          <span className="text-gray-400 px-2">...</span>
          <Button 
            variant="outline" 
            className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 w-8 h-8 p-0"
          >
            4
          </Button>
        </div>
        
        <Button 
          variant="outline" 
          className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};
