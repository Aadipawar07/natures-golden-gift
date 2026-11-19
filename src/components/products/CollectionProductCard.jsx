import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { formatINR } from '../../utils/format';

export function CollectionProductCard({ product }) {
  const { addItem } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState(product.defaultVariantId);
  const [added, setAdded] = useState(false);
  const selectedVariant =
    product.variants.find((variant) => variant.id === selectedVariantId) || product.variants[0];

  const handleAdd = () => {
    addItem(product, selectedVariant);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.22 }}
      className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-[#E7D6B8] bg-white transition-shadow duration-300 hover:shadow-[0_20px_45px_-22px_rgba(35,31,32,0.28)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#E7D6B8]/30">
        <a
          href={`/product/${product.slug}`}
          aria-label={`View ${product.name}`}
          className="absolute inset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C86D1F]"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.hoverImage && (
            <img
              src={product.hoverImage}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:opacity-100"
            />
          )}
        </a>
        <span className="absolute left-4 top-4 rounded-full border border-white/60 bg-[#F9F6F0]/90 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-[#231F20]">
          {product.badge}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-2 flex items-center justify-between gap-2 text-[10px] uppercase tracking-[0.12em] text-[#231F20]/50">
          <span>{product.category}</span>
          <span className="inline-flex shrink-0 items-center gap-1 normal-case tracking-normal text-[#231F20]/65">
            <Star className="h-3 w-3 fill-[#C86D1F] text-[#C86D1F]" aria-hidden="true" />
            {product.demoRating} · {product.demoReviewCount} demo reviews
          </span>
        </div>
        <h2 className="font-editorial text-[1.65rem] font-medium leading-tight text-[#231F20]">
          <a href={`/product/${product.slug}`} className="rounded-sm hover:text-[#C86D1F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C86D1F]">
            {product.name}
          </a>
        </h2>
        <p className="mt-2 min-h-10 text-xs leading-relaxed text-[#231F20]/70">
          {product.shortDescription}
        </p>

        <fieldset className="mt-5">
          <legend className="mb-2 text-[10px] uppercase tracking-[0.14em] text-[#231F20]/60">
            Choose a pack
          </legend>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant) => {
              const isSelected = variant.id === selectedVariant.id;
              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setSelectedVariantId(variant.id)}
                  aria-pressed={isSelected}
                  className={`rounded-full border px-3 py-1.5 text-[11px] transition-colors ${
                    isSelected
                      ? 'border-[#C86D1F] bg-[#C86D1F]/10 text-[#231F20]'
                      : 'border-[#E7D6B8] text-[#231F20]/70 hover:border-[#C86D1F]'
                  }`}
                >
                  {variant.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-4 flex items-baseline justify-between gap-2 border-t border-[#E7D6B8]/70 pt-4">
          <span className="font-editorial text-2xl font-semibold text-[#231F20]" aria-live="polite">
            {formatINR(selectedVariant.price)}
          </span>
          <span className="text-[10px] text-[#231F20]/45">Sample price</span>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full py-3 text-xs font-medium uppercase tracking-[0.12em] text-white transition-colors ${
            added ? 'bg-[#66735A]' : 'bg-[#C86D1F] hover:bg-[#231F20]'
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={added ? 'added' : 'add'}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="inline-flex items-center gap-2"
            >
              {added ? (
                'Added ✓'
              ) : (
                <>
                  <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
                  Add to Cart · {formatINR(selectedVariant.price)}
                </>
              )}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
    </motion.article>
  );
}
