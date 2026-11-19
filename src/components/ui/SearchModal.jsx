import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { ALL_PRODUCTS } from '../../data/products';
import { RITUALS } from '../../data/rituals';
import { useCart } from '../../hooks/useCart';
import { formatINR } from '../../utils/format';

export function SearchModal() {
  const { isSearchOpen, setIsSearchOpen } = useCart();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const q = query.trim().toLowerCase();
  const matchedProducts = ALL_PRODUCTS.filter(
    (p) => p.name.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q)
  );
  const matchedRituals = RITUALS.filter(
    (r) => r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search Nature's Golden Gift"
      className="fixed inset-0 z-50 bg-[#171B17]/75 backdrop-blur-sm flex items-start justify-center p-4 pt-20"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        className="bg-[#F9F6F0] rounded-3xl max-w-xl w-full p-6 border border-[#E7D6B8] shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-[#E7D6B8] pb-3">
          <Search className="w-5 h-5 text-[#C86D1F]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search turmeric packs, golden milk, rituals..."
            className="flex-1 bg-transparent text-sm sm:text-base text-[#231F20] placeholder:text-[#231F20]/45 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close search"
            className="p-1.5 rounded-full hover:bg-[#E7D6B8]/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 max-h-80 overflow-y-auto">
          <div>
            <span className="text-[11px] uppercase tracking-[0.16em] text-[#231F20]/55 block mb-2">
              Products ({matchedProducts.length})
            </span>
            <div className="space-y-2">
              {matchedProducts.map((p) => (
                <a
                  key={p.id}
                  href={`/product/${p.slug}`}
                  onClick={() => setIsSearchOpen(false)}
                  className="w-full flex items-center gap-3 p-2.5 rounded-2xl hover:bg-white border border-transparent hover:border-[#E7D6B8] text-left transition-all"
                >
                  <img src={p.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-editorial text-lg font-medium truncate">{p.name}</p>
                    <p className="text-xs text-[#231F20]/65">
                      From {formatINR(p.variants[0].price)}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {matchedRituals.length > 0 && (
            <div>
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#231F20]/55 block mb-2">
                Rituals
              </span>
              <div className="space-y-1.5">
                {matchedRituals.map((r) => (
                  <a
                    key={r.id}
                    href="#rituals"
                    onClick={() => setIsSearchOpen(false)}
                    className="block px-3 py-2 rounded-xl hover:bg-white text-sm text-[#231F20]"
                  >
                    {r.number} — {r.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
