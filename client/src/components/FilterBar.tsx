import React, { useState, useEffect, useRef } from "react";
import FilterDropdown from "./FilterDropdown";
import { Grid3X3, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  filters: {
    roomType: string[];
    bedType: string[];
    bathroomType: string[];
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      roomType: string[];
      bedType: string[];
      bathroomType: string[];
    }>
  >;
};

const FilterBar: React.FC<Props> = ({ filters, setFilters }) => {
  // State to manage which filter is currently open
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  const filterBarRef = useRef<HTMLDivElement>(null);

  const handleFilterToggle = (filterName: string) => {
    setOpenFilter(openFilter === filterName ? null : filterName);
  };

  // Close filters when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterBarRef.current &&
        !filterBarRef.current.contains(event.target as Node)
      ) {
        setOpenFilter(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFilterChange = (key: keyof typeof filters, values: string[]) => {
    setFilters((prev) => ({ ...prev, [key]: values }));
  };

  // Utility to get label by id from all options
  const getFilterLabel = (id: string) => {
    const allOptions = [
      ...roomTypeOptions,
      ...bedTypeOptions,
      ...bathroomTypeOptions,
    ];
    return allOptions.find((opt) => opt.id === id)?.label || id;
  };

  // Utility to remove a filter from correct category
  const handleRemoveFilter = (filterId: string) => {
    if (filters.roomType.includes(filterId)) {
      handleFilterChange(
        "roomType",
        filters.roomType.filter((f) => f !== filterId)
      );
    } else if (filters.bedType.includes(filterId)) {
      handleFilterChange(
        "bedType",
        filters.bedType.filter((f) => f !== filterId)
      );
    } else if (filters.bathroomType.includes(filterId)) {
      handleFilterChange(
        "bathroomType",
        filters.bathroomType.filter((f) => f !== filterId)
      );
    }
  };

  const roomTypeOptions = [
    { id: "private_bedroom", label: "Private Bedroom", count: 623 },
    { id: "2_shared", label: "2 people Shared Bedroom", count: 286 },
    { id: "4_shared", label: "4 people Shared Bedroom", count: 286 },
    { id: "6_shared", label: "6 people Shared Bedroom", count: 286 },
    { id: "8_shared", label: "8 people Shared Bedroom", count: 286 },
    { id: "14_shared", label: "14 people Shared Bedroom", count: 286 },
  ];
  const bedTypeOptions = [
    { id: "double_bed", label: "Double Bed", count: 13 },
    { id: "single_bed", label: "Single Bed", count: 623 },
    { id: "bunk_bed", label: "Bunk Bed", count: 286 },
  ];
  const bathroomTypeOptions = [
    { id: "private_bathroom", label: "Private Bathrooms", count: 13 },
    { id: "shared_bathroom", label: "Shared Bathrooms", count: 623 },
  ];
  return (
    <div className="w-full bg-white dark:bg-gray-900">
      <div ref={filterBarRef} className="container mx-auto pt-4">
        {/* Filter Bar */}
        <div className="flex items-center justify-between">
          {/* Left side - Filters */}
          <div className="flex flex-col md:flex-row items-start gap-2 flex-wrap">
            <FilterDropdown
              title="Room Type"
              options={roomTypeOptions}
              selectedOptions={filters.roomType}
              onSelectionChange={(value) =>
                handleFilterChange("roomType", value)
              }
              isOpen={openFilter === "roomType"}
              onToggle={() => handleFilterToggle("roomType")}
            />

            <FilterDropdown
              title="Bed"
              options={bedTypeOptions}
              selectedOptions={filters.bedType}
              onSelectionChange={(value) =>
                handleFilterChange("bedType", value)
              }
              isOpen={openFilter === "bedType"}
              onToggle={() => handleFilterToggle("bedType")}
            />

            <FilterDropdown
              title="Bathroom"
              options={bathroomTypeOptions}
              selectedOptions={filters.bathroomType}
              onSelectionChange={(value) =>
                handleFilterChange("bathroomType", value)
              }
              isOpen={openFilter === "bathroomType"}
              onToggle={() => handleFilterToggle("bathroomType")}
            />
          </div>

          {/* Right side - View options and featured */}
          <div className="flex flex-col md:flex-row items-end gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                View:
              </span>
              <div className="flex border border-gray-300 dark:border-gray-600 rounded">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-none border-r border-gray-300 dark:border-gray-600"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-none bg-gray-100 dark:bg-gray-800"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* View All Button */}
            <Button className="bg-black dark:bg-white dark:text-black text-white hover:bg-gray-800 dark:hover:bg-gray-200 h-9 px-6">
              VIEW All
            </Button>

            <Button
              variant="ghost"
              onClick={() => {
                handleFilterChange("roomType", []);
                handleFilterChange("bedType", []);
                handleFilterChange("bathroomType", []);
                setOpenFilter(null);
              }}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Clear All
            </Button>
          </div>
        </div>

        {/* Active Filters Display */}
        {(filters.roomType.length > 0 ||
          filters.bedType.length > 0 ||
          filters.bathroomType.length > 0) && (
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Active filters:
              </span>
              {[...filters.roomType, ...filters.bedType, ...filters.bathroomType].map(
                (filter, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                  >
                    {getFilterLabel(filter)}
                    <button
                      onClick={() => handleRemoveFilter(filter)}
                      className="ml-1 hover:text-blue-600 dark:hover:text-blue-300"
                    >
                      ×
                    </button>
                  </span>
                )
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default FilterBar;
