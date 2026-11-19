import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Leaf, ShieldCheck, Truck } from 'lucide-react';
import { MEDIA } from '../../assets/media';
import { COLLECTION_PRODUCTS, RITUAL_BUNDLE } from '../../data/collection';
import { FREE_SHIPPING_THRESHOLD, useCart } from '../../hooks/useCart';
import { formatINR } from '../../utils/format';
import { CollectionFilterBar } from './CollectionFilterBar';
import { CollectionProductCard } from './CollectionProductCard';

export function CollectionPage() {
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [sortBy, setSortBy] = useState('featured');

  const visibleProducts = useMemo(() => {
    const filtered = COLLECTION_PRODUCTS.filter(
      (product) =>
        activeCategory === 'All Products' || product.category === activeCategory
    );

    return [...filtered].sort((a, b) => {
      const aPrice = Math.min(...a.variants.map((variant) => variant.price));
      const bPrice = Math.min(...b.variants.map((variant) => variant.price));
      if (sortBy === 'price-low') return aPrice - bPrice;
      if (sortBy === 'price-high') return bPrice - aPrice;
      if (sortBy === 'best-selling') return b.demoReviewCount - a.demoReviewCount;
      return COLLECTION_PRODUCTS.indexOf(a) - COLLECTION_PRODUCTS.indexOf(b);
    });
  }, [activeCategory, sortBy]);

  return (
    <>
      <section className="relative overflow-hidden bg-[#F9F6F0] pb-10 pt-28 sm:pt-32 lg:pb-14 lg:pt-36">
        <div className="absolute inset-0 bg-editorial-grid opacity-50" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="mb-4 flex flex-wrap items-center gap-x-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#C86D1F] sm:text-xs">
              <span>Small batch</span>
              <span className="text-[#B8A67D]" aria-hidden="true">•</span>
              <span>Single-origin</span>
              <span className="text-[#B8A67D]" aria-hidden="true">•</span>
              <span>Cold-milled</span>
            </p>
            <h1 className="max-w-3xl font-editorial text-5xl font-medium leading-[0.98] text-[#231F20] sm:text-6xl lg:text-7xl">
              The Pure Haldi Collection
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#231F20]/70 sm:text-base">
              Harvested at peak potency and packed fresh to preserve natural oils, aroma, and deep
              golden color.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 border-t border-[#E7D6B8] pt-5 text-[11px] text-[#231F20]/70 sm:gap-x-7">
              <span className="inline-flex items-center gap-1.5">
                <Leaf className="h-3.5 w-3.5 text-[#66735A]" aria-hidden="true" />
                Heirloom-root sourcing*
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-[#66735A]" aria-hidden="true" />
                Purity details by batch*
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#66735A]" aria-hidden="true" />
                FSSAI details pending verification
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5 text-[#C86D1F]" aria-hidden="true" />
                Free shipping above {formatINR(FREE_SHIPPING_THRESHOLD)}
              </span>
            </div>
            <p className="mt-3 text-[10px] leading-relaxed text-[#231F20]/50">
              *Sourcing and purity statements are sample storefront copy pending verification.
              Certification details are not yet verified.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative hidden aspect-[5/4] overflow-hidden rounded-[2rem] border border-[#E7D6B8] bg-[#E7D6B8]/30 shadow-[0_24px_60px_-32px_rgba(35,31,32,0.35)] sm:block lg:col-span-5"
          >
            <img
              src={MEDIA.rootsMacro}
              alt="Golden turmeric roots with their deep, earthy texture"
              className="h-full w-full object-cover"
            />
            <span className="absolute bottom-4 left-4 rounded-full bg-[#F9F6F0]/90 px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-[#231F20]">
              From root to ritual
            </span>
          </motion.div>
        </div>
      </section>

      <CollectionFilterBar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <section className="bg-[#F9F6F0] py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#C86D1F]">
                The small-batch edit
              </p>
              <h2 className="mt-1 font-editorial text-3xl font-medium text-[#231F20] sm:text-4xl">
                Find your golden ritual
              </h2>
            </div>
            <p className="pb-1 text-[11px] text-[#231F20]/55" aria-live="polite">
              {visibleProducts.length} {visibleProducts.length === 1 ? 'piece' : 'pieces'}
            </p>
          </div>

          <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            <AnimatePresence>
              {visibleProducts.map((product) => (
                <CollectionProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </motion.div>

          {visibleProducts.length === 0 && (
            <p className="rounded-3xl border border-[#E7D6B8] bg-white p-8 text-center text-sm text-[#231F20]/70">
              No products in this collection yet.
            </p>
          )}

          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45 }}
            className="mt-10 overflow-hidden rounded-[2rem] border border-[#E7D6B8] bg-[#262B22] text-[#F9F6F0] sm:mt-14"
          >
            <div className="grid items-center gap-6 p-6 sm:p-9 lg:grid-cols-12 lg:p-10">
              <div className="lg:col-span-8">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#F2C56B]">
                  A little more golden
                </p>
                <h2 className="mt-2 font-editorial text-3xl font-medium sm:text-4xl">
                  Build Your Custom Ritual Bundle
                </h2>
                <p className="mt-3 max-w-2xl text-xs leading-relaxed text-[#E7D6B8]/80 sm:text-sm">
                  Pair haldi powder with crushed black pepper and a brass spoon. Add the trio to your
                  kitchen for a sample 15% bundle saving.
                </p>
                <p className="mt-2 text-[10px] text-[#E7D6B8]/55">
                  Bundle contents and sample pricing are subject to confirmation.
                </p>
              </div>
              <div className="flex flex-col items-start gap-3 lg:col-span-4 lg:items-end">
                <span className="font-editorial text-3xl font-semibold text-[#F2C56B]">
                  {formatINR(RITUAL_BUNDLE.variants[0].price)}
                  <span className="ml-2 text-base font-normal text-[#E7D6B8]/50 line-through">
                    {formatINR(RITUAL_BUNDLE.variants[0].compareAt)}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => addItem(RITUAL_BUNDLE, RITUAL_BUNDLE.variants[0])}
                  className="inline-flex items-center gap-2 rounded-full bg-[#C86D1F] px-5 py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#F2C56B] hover:text-[#231F20]"
                >
                  Add the ritual bundle
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      <section className="border-t border-[#E7D6B8] bg-white py-9 sm:py-11">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#C86D1F]">
              A note on purity
            </p>
            <h2 className="mt-1 font-editorial text-2xl font-medium text-[#231F20] sm:text-3xl">
              Small-batch freshness guarantee*, with transparency at every step.
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-[#231F20]/65">
              A traditional 60-second warm-water observation may be an at-home ritual, but it is not
              a scientifically reliable way to verify purity or detect adulteration. Lab testing is
              needed for definitive quality assurance. *Guarantee terms and product claims require
              verification before launch.
            </p>
          </div>
          <ShieldCheck
            className="hidden h-10 w-10 shrink-0 text-[#B8A67D] md:block"
            aria-hidden="true"
          />
        </div>
      </section>
    </>
  );
}
