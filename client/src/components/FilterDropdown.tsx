import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterDropdownProps {
  title: string;
  options: FilterOption[];
  selectedOptions: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  className?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  title,
  options,
  selectedOptions,
  onSelectionChange,
  className = "",
  isOpen = false,
  onToggle
}) => {
  const [internalIsExpanded, setInternalIsExpanded] = useState(false);
  
  // Use external state if provided, otherwise use internal state
  const isExpanded = onToggle ? isOpen : internalIsExpanded;
  const handleToggle = onToggle || (() => setInternalIsExpanded(!internalIsExpanded));

  const handleOptionToggle = (optionId: string) => {
    const newSelection = selectedOptions.includes(optionId)
      ? selectedOptions.filter(id => id !== optionId)
      : [...selectedOptions, optionId];
    
    onSelectionChange(newSelection);
  };

  const handleViewAll = () => {
    onSelectionChange(options.map(option => option.id));
  };

  const handleClearAll = () => {
    onSelectionChange([]);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Filter Button */}
      <Button
        variant="outline"
        onClick={handleToggle}
        className="flex items-center gap-2 h-9 px-3 text-sm font-medium border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
      >
        {title}
        {isExpanded ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </Button>

      {/* Dropdown Content */}
      {isExpanded && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
          <div className="p-4">
            {/* Header with action buttons */}
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {title}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleViewAll}
                  className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                >
                  View All
                </button>
                <span className="text-xs text-gray-300 dark:text-gray-600">|</span>
                <button
                  onClick={handleClearAll}
                  className="text-xs text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 font-medium"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Options List */}
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {options.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center space-x-2 p-1 hover:bg-gray-50 dark:hover:bg-gray-800 rounded"
                >
                  <Checkbox
                    id={option.id}
                    checked={selectedOptions.includes(option.id)}
                    onCheckedChange={() => handleOptionToggle(option.id)}
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <label
                    htmlFor={option.id}
                    className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer flex-1 flex justify-between items-center"
                  >
                    <span>{option.label}</span>
                    {/* {option.count && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ({option.count})
                      </span>
                    )} */}
                  </label>
                </div>
              ))}
            </div>

            {/* Selected count */}
            {selectedOptions.length > 0 && (
              <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-700">
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {selectedOptions.length} selected
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;