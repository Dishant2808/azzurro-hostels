// FiltersDemo.tsx
import React, { useState } from "react";
import GlobalHeader from "@/components/GlobalHeader";
import Sidebar from "@/components/Sidebar";
import FilterBar from "@/components/FilterBar";

export default function FiltersDemo() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ⬅️ Manage filter state here
  const [filters, setFilters] = useState({
    roomType: [] as string[],
    bedType: [] as string[],
    bathroomType: [] as string[],
  });

  // Example "products" that would normally come from API
  const allProducts = [
    { id: 1, name: "Red Dress", bedType: "floral", roomType: "M" },
    { id: 2, name: "Blue Shirt", bedType: "solid", roomType: "L" },
    { id: 3, name: "Black Suit", bedType: "solid", roomType: "M" },
    { id: 4, name: "Green Skirt", bedType: "plaid", roomType: "S" },
  ];

  // Filter logic
  const filteredProducts = allProducts.filter((p) => {
    // Size filter
    if (filters.roomType.length > 0 && !filters.roomType.includes(p.roomType)) return false;
    // bedType filter
    if (filters.bedType.length > 0 && !filters.bedType.includes(p.bedType)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <GlobalHeader />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="pt-16">
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Filter Component Demo
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Interactive filter dropdowns with checkboxes, view all, and clear all functionality
            </p>
          </div>
        </div>

        {/* Pass down state & updater */}
        <FilterBar filters={filters} setFilters={setFilters} />

        {/* Product Results */}
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Product Results ({filteredProducts.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 h-64 flex items-center justify-center"
                >
                  <span className="text-gray-500 dark:text-gray-400">{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
