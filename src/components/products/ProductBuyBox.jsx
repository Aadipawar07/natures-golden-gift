import React from 'react';
import { Repeat, ShoppingBag, Star } from 'lucide-react';
import { PDP_SUBSCRIBE_DISCOUNT_PERCENT } from '../../data/products';
import { FREE_SHIPPING_THRESHOLD } from '../../hooks/useCart';
import { formatINR } from '../../utils/format';
import { ProductDeliveryEstimator } from './ProductDeliveryEstimator';

function ProductAccordions({ product }) {
  const sections = [
    {
      title: 'Ingredients & Origin',
      content: `${product.ingredients || 'Ingredient details pending confirmation'} ${product.origin || ''}`,
    },
    {
      title: 'At-Home 60-Second Water Observation',
      content:
        'Stir a pinch into a glass of water and observe how it disperses. This traditional at-home observation is not a scientifically reliable way to verify purity or detect adulteration; laboratory testing is required for definitive quality assurance.',
    },
    {
      title: 'Storage & Shelf Life',
      content:
        product.storage ||
        'Store sealed in a cool, dry place away from direct sunlight. Refer to the final pack for best-before details.',
    },
  ];

  return (
    <div className="divide-y divide-[#E7D6B8] border-y border-[#E7D6B8]">
      {sections.map((section) => (
        <details key={section.title} className="group py-3.5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-xs font-medium text-[#231F20] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C86D1F]">
            {section.title}
            <span className="font-editorial text-xl leading-none text-[#C86D1F] transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="pt-3 text-xs leading-relaxed text-[#231F20]/65">{section.content}</p>
        </details>
      ))}
    </div>
  );
}

export function ProductBuyBox({
  product,
  selectedVariant,
  onSelectVariant,
  purchaseType,
  onPurchaseTypeChange,
  frequency,
  onFrequencyChange,
  quantity,
  onQuantityChange,
  price,
  pricePer100g,
  onAddToCart,
  addButtonRef,
}) {
  const subscribePercent = PDP_SUBSCRIBE_DISCOUNT_PERCENT;

  return (
    <div className="space-y-5">
      <nav aria-label="Breadcrumb" className="text-[10px] text-[#231F20]/55">
        <ol className="flex flex-wrap items-center gap-2">
          <li><a href="/" className="hover:text-[#C86D1F]">Home</a></li>
          <li aria-hidden="true">/</li>
          <li><a href="/shop" className="hover:text-[#C86D1F]">Shop</a></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="max-w-[13rem] truncate text-[#231F20]">
            {product.name}
          </li>
        </ol>
      </nav>

      <span className="inline-flex rounded-full border border-[#E7D6B8] bg-white/70 px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-[#66735A]">
        Single-origin · Cold-milled*
      </span>

      <div>
        <p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-[#C86D1F]">
          {product.category || product.subtitle || 'The Golden Collection'}
        </p>
        <h1 className="font-editorial text-4xl font-medium leading-[1.02] text-[#231F20] sm:text-5xl">
          {product.name}
        </h1>
      </div>

      <a
        href="#reviews"
        className="inline-flex items-center gap-2 text-xs text-[#231F20]/70 hover:text-[#C86D1F]"
        aria-label={`View demo review section, rating ${product.demoRating || 'not yet rated'} out of 5`}
      >
        <span className="flex items-center text-[#C86D1F]" aria-hidden="true">
          {Array.from({ length: 5 }, (_, index) => (
            <Star key={index} className="h-3.5 w-3.5 fill-current" />
          ))}
        </span>
        <span>
          {product.demoRating || '—'} ★ ({product.demoReviewCount || 0} Demo Reviews)
        </span>
      </a>

      <p className="text-sm leading-relaxed text-[#231F20]/75">
        {product.pdpDescription || product.longDescription || product.shortDescription}
      </p>

      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#231F20]/70">
            Choose your pack
          </span>
          <span className="text-[10px] text-[#231F20]/45">Sample pricing</span>
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          {product.variants.map((variant) => {
            const active = variant.id === selectedVariant.id;
            return (
              <button
                key={variant.id}
                type="button"
                onClick={() => onSelectVariant(variant.id)}
                aria-pressed={active}
                className={`rounded-2xl border p-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C86D1F] ${
                  active
                    ? 'border-[#C86D1F] bg-[#C86D1F]/10 ring-1 ring-[#C86D1F]'
                    : 'border-[#E7D6B8] bg-white hover:border-[#B8A67D]'
                }`}
              >
                <span className="block text-xs font-semibold text-[#231F20]">{variant.label}</span>
                <span className="mt-1 block font-editorial text-lg font-semibold text-[#231F20]">
                  {formatINR(variant.price)}
                </span>
                {variant.tag && (
                  <span className="mt-0.5 block text-[9px] uppercase tracking-[0.1em] text-[#66735A]">
                    {variant.tag}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-end justify-between gap-4 border-y border-[#E7D6B8] py-3">
        <div>
          <span className="block font-editorial text-3xl font-semibold text-[#231F20]" aria-live="polite">
            {formatINR(price)}
          </span>
          <span className="mt-0.5 block text-[10px] text-[#231F20]/55">
            {pricePer100g === null
              ? 'Per 100g: not applicable to this set'
              : `${formatINR(pricePer100g)} per 100g`}
          </span>
        </div>
        {selectedVariant.compareAt && (
          <span className="pb-1 text-xs text-[#231F20]/45 line-through">
            {formatINR(selectedVariant.compareAt)}
          </span>
        )}
      </div>

      <fieldset>
        <legend className="mb-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[#231F20]/70">
          Purchase option
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          <label
            className={`cursor-pointer rounded-2xl border p-3 text-xs transition-colors ${
              purchaseType === 'one-time'
                ? 'border-[#231F20] bg-[#231F20] text-[#F9F6F0]'
                : 'border-[#E7D6B8] bg-white text-[#231F20]'
            }`}
          >
            <input
              type="radio"
              name="purchase-type"
              value="one-time"
              checked={purchaseType === 'one-time'}
              onChange={() => onPurchaseTypeChange('one-time')}
              className="mr-2 accent-[#C86D1F]"
            />
            <span className="font-semibold">One-Time Purchase</span>
            <span className="mt-1 block pl-6">{formatINR(selectedVariant.price)}</span>
          </label>
          <label
            className={`cursor-pointer rounded-2xl border p-3 text-xs transition-colors ${
              purchaseType === 'subscribe'
                ? 'border-[#66735A] bg-[#66735A] text-white'
                : 'border-[#E7D6B8] bg-white text-[#231F20]'
            }`}
          >
            <input
              type="radio"
              name="purchase-type"
              value="subscribe"
              checked={purchaseType === 'subscribe'}
              onChange={() => onPurchaseTypeChange('subscribe')}
              className="mr-2 accent-[#C86D1F]"
            />
            <span className="inline-flex items-center gap-1 font-semibold">
              <Repeat className="h-3 w-3" aria-hidden="true" />
              Subscribe &amp; Save {subscribePercent}%
            </span>
            <span className="mt-1 block pl-6">
              {formatINR(Math.round(selectedVariant.price * (1 - subscribePercent / 100)))}
            </span>
          </label>
        </div>
      </fieldset>

      {purchaseType === 'subscribe' && (
        <label className="flex items-center justify-between gap-3 rounded-xl border border-[#E7D6B8] bg-white px-4 py-3 text-xs text-[#231F20]">
          <span>Delivery frequency</span>
          <select
            value={frequency}
            onChange={(event) => onFrequencyChange(event.target.value)}
            className="max-w-[180px] rounded-lg bg-[#F9F6F0] px-2.5 py-2 text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C86D1F]"
          >
            <option value="30">Deliver every 30 days</option>
            <option value="60">Deliver every 60 days</option>
          </select>
        </label>
      )}

      <div className="flex items-center gap-3">
        <div className="inline-flex items-center rounded-full border border-[#E7D6B8] bg-white p-1">
          <button
            type="button"
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            aria-label="Decrease quantity"
            className="rounded-full p-2 text-[#231F20] hover:text-[#C86D1F]"
          >
            −
          </button>
          <span className="min-w-8 text-center text-sm tabular-nums" aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => onQuantityChange(quantity + 1)}
            aria-label="Increase quantity"
            className="rounded-full p-2 text-[#231F20] hover:text-[#C86D1F]"
          >
            +
          </button>
        </div>
        <button
          ref={addButtonRef}
          type="button"
          onClick={onAddToCart}
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#C86D1F] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#231F20] sm:text-xs"
        >
          <ShoppingBag className="h-4 w-4" aria-hidden="true" />
          Add to Cart — {formatINR(price)}
        </button>
      </div>

      <ProductDeliveryEstimator />

      <p className="text-[10px] leading-relaxed text-[#231F20]/45">
        *Origin and processing statements are sample details pending batch verification. Subscription options are a storefront preview.
        Free shipping above {formatINR(FREE_SHIPPING_THRESHOLD)}.
      </p>

      <ProductAccordions product={product} />
    </div>
  );
}
