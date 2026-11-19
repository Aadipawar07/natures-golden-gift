import React from 'react';
import { ArrowDownUp } from 'lucide-react';
import { COLLECTION_CATEGORIES } from '../../data/collection';

export function CollectionFilterBar({
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}) {
  return (
    <div className="sticky top-16 z-30 border-y border-[#E7D6B8]/80 bg-[#F9F6F0]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div
          aria-label="Filter products by category"
          className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0"
        >
          {COLLECTION_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              aria-pressed={activeCategory === category}
              className={`shrink-0 rounded-full border px-4 py-2 text-[11px] transition-colors focus-visible:outline ${
                activeCategory === category
                  ? 'border-[#231F20] bg-[#231F20] text-[#F9F6F0]'
                  : 'border-[#E7D6B8] bg-white/70 text-[#231F20]/75 hover:border-[#C86D1F] hover:text-[#C86D1F]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <label className="inline-flex items-center gap-2 self-end lg:self-auto text-xs text-[#231F20]/70">
          <ArrowDownUp className="w-3.5 h-3.5 text-[#C86D1F]" aria-hidden="true" />
          <span className="sr-only">Sort products</span>
          <select
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value)}
            className="max-w-[190px] cursor-pointer bg-transparent py-2 text-xs text-[#231F20] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C86D1F]"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="best-selling">Best Selling</option>
          </select>
        </label>
      </div>
    </div>
  );
}
