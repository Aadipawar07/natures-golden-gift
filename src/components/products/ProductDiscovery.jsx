import React, { useState } from 'react';
import { Star, ShoppingBag, Eye, Repeat } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../hooks/useCart';
import { formatINR } from '../../utils/format';
import { SectionHeading } from '../ui/SectionHeading';
import { MagneticButton } from '../ui/MagneticButton';
import { PincodeChecker } from './PincodeChecker';

export function ProductDiscovery() {
  const { addItem } = useCart();
  const flagship = PRODUCTS[0];
  const [selectedVariantId, setSelectedVariantId] = useState(flagship.defaultVariantId);
  const [purchaseType, setPurchaseType] = useState('one-time');
  const [hoveredId, setHoveredId] = useState(null);

  const selectedVariant =
    flagship.variants.find((v) => v.id === selectedVariantId) || flagship.variants[1];

  const effectivePrice =
    purchaseType === 'subscribe'
      ? Math.round(selectedVariant.price * (1 - flagship.subscribeDiscountPercent / 100))
      : selectedVariant.price;

  return (
    <section id="products" className="py-24 lg:py-32 bg-[#F9F6F0] bg-editorial-grid relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="The Collection"
          title="Meet Your Everyday Gold."
          subtitle="Pure simplicity. Extraordinary possibilities. Small-batch natural turmeric in UV-protected amber glass."
        />

        {/* Featured Oversized Product Showcase */}
        <div className="mt-14 rounded-[2.25rem] bg-white border border-[#E7D6B8] p-6 sm:p-10 lg:p-12 shadow-[0_24px_60px_-24px_rgba(35,31,32,0.12)] grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <a
              href={`/product/${flagship.slug}`}
              aria-label={`View ${flagship.name}`}
              className="relative block rounded-3xl overflow-hidden aspect-[4/5] bg-[#E7D6B8]/30 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C86D1F]"
            >
              <img
                src={flagship.image}
                alt={flagship.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full glass-light text-[11px] uppercase tracking-[0.16em] font-medium text-[#231F20]">
                Signature Apothecary Jar
              </span>
            </a>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs text-[#231F20]/70">
              <div className="flex items-center text-[#C86D1F]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span>
                {flagship.demoRating} ({flagship.demoReviewCount} Demo Ratings)
              </span>
            </div>

            <div>
              <h3 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium text-[#231F20]">
                <a href={`/product/${flagship.slug}`} className="hover:text-[#C86D1F]">
                  {flagship.name}
                </a>
              </h3>
              <p className="mt-3 text-base text-[#231F20]/75 leading-relaxed">
                {flagship.longDescription}
              </p>
            </div>

            {/* Price Display */}
            <div className="flex items-baseline gap-3">
              <span className="font-editorial text-4xl font-semibold text-[#231F20]">
                {formatINR(effectivePrice)}
              </span>
              <span className="text-sm text-[#231F20]/45 line-through">
                {formatINR(selectedVariant.compareAt)}
              </span>
              <span className="text-[11px] uppercase tracking-[0.14em] px-2.5 py-1 rounded-full bg-[#E7D6B8]/60 text-[#231F20]/80">
                Sample Price
              </span>
            </div>

            {/* Pack Size Selector */}
            <div>
              <span className="block text-xs uppercase tracking-[0.16em] text-[#231F20]/70 mb-2.5">
                Select Pack Size
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {flagship.variants.map((variant) => {
                  const active = variant.id === selectedVariant.id;
                  return (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setSelectedVariantId(variant.id)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        active
                          ? 'border-[#C86D1F] bg-[#C86D1F]/8 ring-1 ring-[#C86D1F]'
                          : 'border-[#E7D6B8] hover:border-[#B8A67D]'
                      }`}
                    >
                      <span className="block text-xs font-semibold text-[#231F20]">
                        {variant.label}
                      </span>
                      <span className="block text-xs text-[#231F20]/65 mt-0.5">
                        {formatINR(variant.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Purchase Type: One-time vs Subscribe */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPurchaseType('one-time')}
                className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                  purchaseType === 'one-time'
                    ? 'border-[#231F20] bg-[#231F20] text-[#F9F6F0]'
                    : 'border-[#E7D6B8] text-[#231F20]'
                }`}
              >
                <span className="font-semibold block">One-Time Purchase</span>
                <span className="opacity-75">{formatINR(selectedVariant.price)}</span>
              </button>
              <button
                type="button"
                onClick={() => setPurchaseType('subscribe')}
                className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                  purchaseType === 'subscribe'
                    ? 'border-[#66735A] bg-[#66735A] text-white'
                    : 'border-[#E7D6B8] text-[#231F20]'
                }`}
              >
                <span className="font-semibold inline-flex items-center gap-1">
                  <Repeat className="w-3 h-3" /> Subscribe &amp; Save {flagship.subscribeDiscountPercent}%
                </span>
                <span className="block opacity-85">
                  {formatINR(
                    Math.round(selectedVariant.price * (1 - flagship.subscribeDiscountPercent / 100))
                  )}{' '}
                  / refill (UI Preview)
                </span>
              </button>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <MagneticButton
                onClick={() => addItem(flagship, selectedVariant, purchaseType, 1)}
                variant="primary"
                className="flex-1 sm:flex-initial"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag — {formatINR(effectivePrice)}</span>
              </MagneticButton>
              <MagneticButton
                href={`/product/${flagship.slug}`}
                variant="outlineDark"
              >
                <Eye className="w-4 h-4" />
                <span>Full Details</span>
              </MagneticButton>
            </div>

            <PincodeChecker />
          </div>
        </div>

        {/* Product Grid */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product) => {
            const defaultVar =
              product.variants.find((v) => v.id === product.defaultVariantId) ||
              product.variants[0];
            const isHovered = hoveredId === product.id;

            return (
              <article
                key={product.id}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group rounded-3xl bg-white border border-[#E7D6B8] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_-20px_rgba(35,31,32,0.18)]"
              >
                <div>
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#E7D6B8]/30">
                    <a
                      href={`/product/${product.slug}`}
                      aria-label={`View ${product.name}`}
                      className="block h-full w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C86D1F]"
                    >
                      <img
                        src={isHovered && product.hoverImage ? product.hoverImage : product.image}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </a>
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full glass-light text-[10px] uppercase tracking-[0.14em] font-medium text-[#231F20]">
                      {defaultVar.tag}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between text-[11px] text-[#231F20]/65 mb-1.5">
                      <span>{defaultVar.label}</span>
                      <span className="inline-flex items-center gap-1">
                        <Star className="w-3 h-3 fill-[#C86D1F] text-[#C86D1F]" />
                        {product.demoRating} (Demo)
                      </span>
                    </div>
                    <h3 className="font-editorial text-2xl font-medium text-[#231F20] leading-snug">
                      <a href={`/product/${product.slug}`} className="hover:text-[#C86D1F]">
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-2 text-xs text-[#231F20]/70 line-clamp-2 leading-relaxed">
                      {product.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 flex items-center justify-between gap-2 border-t border-[#E7D6B8]/50">
                  <div>
                    <span className="font-editorial text-2xl font-semibold text-[#231F20]">
                      {formatINR(defaultVar.price)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`/product/${product.slug}`}
                      aria-label={`View details for ${product.name}`}
                      className="inline-flex items-center justify-center p-2.5 rounded-full border border-[#E7D6B8] text-[#231F20] hover:border-[#C86D1F] hover:text-[#C86D1F] transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => addItem(product, defaultVar, 'one-time', 1)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#231F20] text-[#F9F6F0] text-xs font-medium hover:bg-[#C86D1F] transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Quick Add</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
