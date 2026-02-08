'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  category?: string;
  priceRange?: [number, number];
  sortBy?: string;
}

export function CatalogFilters({ onFilterChange }: FilterProps) {
  const [expandedFilters, setExpandedFilters] = useState<string[]>(['category']);
  const [filters, setFilters] = useState<FilterState>({});

  const toggleFilter = (filter: string) => {
    setExpandedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const handleCategoryChange = (category: string) => {
    const newFilters = { ...filters, category };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleSortChange = (sortBy: string) => {
    const newFilters = { ...filters, sortBy };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <div className="space-y-6">
      {/* Sort */}
      <div className="border-b border-border pb-6">
        <button
          onClick={() => toggleFilter('sort')}
          className="flex items-center justify-between w-full font-display font-bold text-primary"
        >
          Sort By
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              expandedFilters.includes('sort') ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedFilters.includes('sort') && (
          <div className="mt-4 space-y-3">
            {['Newest', 'Price: Low to High', 'Price: High to Low', 'Best Sellers'].map(
              (option) => (
                <label key={option} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="sort"
                    value={option}
                    onChange={() => handleSortChange(option)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-body text-foreground">{option}</span>
                </label>
              )
            )}
          </div>
        )}
      </div>

      {/* Category */}
      <div className="border-b border-border pb-6">
        <button
          onClick={() => toggleFilter('category')}
          className="flex items-center justify-between w-full font-display font-bold text-primary"
        >
          Category
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              expandedFilters.includes('category') ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedFilters.includes('category') && (
          <div className="mt-4 space-y-3">
            {['All', 'Necklaces', 'Bracelets', 'Earrings', 'Rings', 'Sets'].map(
              (category) => (
                <label key={category} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.category === category}
                    onChange={() => handleCategoryChange(category)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-body text-foreground">{category}</span>
                </label>
              )
            )}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="border-b border-border pb-6">
        <button
          onClick={() => toggleFilter('price')}
          className="flex items-center justify-between w-full font-display font-bold text-primary"
        >
          Price Range
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              expandedFilters.includes('price') ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedFilters.includes('price') && (
          <div className="mt-4 space-y-3">
            {['Under ₹500', '₹500 - ₹1000', '₹1000 - ₹5000', 'Over ₹5000'].map((range) => (
              <label key={range} className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm font-body text-foreground">{range}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Clear Filters */}
      <button className="w-full py-3 border border-primary text-primary font-body font-medium hover:bg-primary hover:text-primary-foreground transition-colors">
        Clear Filters
      </button>
    </div>
  );
}
