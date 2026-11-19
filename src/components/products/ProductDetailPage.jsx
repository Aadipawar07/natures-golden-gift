import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { DEFAULT_PRODUCT, findProductBySlug, PDP_SUBSCRIBE_DISCOUNT_PERCENT } from '../../data/products';
import { FREE_SHIPPING_THRESHOLD, useCart } from '../../hooks/useCart';
import { formatINR } from '../../utils/format';
import { ProductBuyBox } from './ProductBuyBox';
import { ProductGallery } from './ProductGallery';
import { ProductStorySections } from './ProductStorySections';

export function ProductDetailPage({ productSlug }) {
  const product = productSlug ? findProductBySlug(productSlug) : DEFAULT_PRODUCT;
  const { addItem } = useCart();
  const addButtonRef = useRef(null);
  const [selectedVariantId, setSelectedVariantId] = useState('');
  const [purchaseType, setPurchaseType] = useState('one-time');
  const [frequency, setFrequency] = useState('30');
  const [quantity, setQuantity] = useState(1);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    if (!product) return;
    setSelectedVariantId(product.defaultVariantId || product.variants[0].id);
    setPurchaseType('one-time');
    setFrequency('30');
    setQuantity(1);
    setShowStickyBar(false);
  }, [product?.id]);

  useEffect(() => {
    const button = addButtonRef.current;
    if (!button || !product || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyBar(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );
    observer.observe(button);
    return () => observer.disconnect();
  }, [product?.id]);

  const selectedVariant = useMemo(
    () =>
      product?.variants.find((variant) => variant.id === selectedVariantId) ||
      product?.variants[0],
    [product, selectedVariantId]
  );

  if (!product) {
    return (
      <section className="min-h-[65vh] bg-[#F9F6F0] px-5 pt-36 text-center">
        <p className="text-[10px] uppercase tracking-[0.18em] text-[#C86D1F]">Product not found</p>
        <h1 className="mt-2 font-editorial text-4xl text-[#231F20]">This golden pick has moved.</h1>
        <a
          href="/shop"
          className="mt-6 inline-flex rounded-full bg-[#C86D1F] px-6 py-3 text-xs uppercase tracking-[0.12em] text-white hover:bg-[#231F20]"
        >
          Browse the collection
        </a>
      </section>
    );
  }

  if (!selectedVariant) return null;

  const isSubscription = purchaseType === 'subscribe';
  const price = isSubscription
    ? Math.round(selectedVariant.price * (1 - PDP_SUBSCRIBE_DISCOUNT_PERCENT / 100))
    : selectedVariant.price;
  const pricePer100g =
    selectedVariant.grams && selectedVariant.grams > 0
      ? Math.round((price / selectedVariant.grams) * 100)
      : null;

  const addToCart = () => {
    addItem(product, selectedVariant, purchaseType, quantity, {
      discountPercent: PDP_SUBSCRIBE_DISCOUNT_PERCENT,
      subscriptionFrequency: isSubscription ? frequency : null,
    });
  };

  return (
    <div className="bg-[#F9F6F0]">
      <section className="mx-auto max-w-7xl px-5 pb-12 pt-28 sm:px-8 sm:pt-32 lg:pb-16 lg:pt-36">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
          <ProductGallery product={product} />
          <ProductBuyBox
            product={product}
            selectedVariant={selectedVariant}
            onSelectVariant={setSelectedVariantId}
            purchaseType={purchaseType}
            onPurchaseTypeChange={setPurchaseType}
            frequency={frequency}
            onFrequencyChange={setFrequency}
            quantity={quantity}
            onQuantityChange={setQuantity}
            price={price}
            pricePer100g={pricePer100g}
            onAddToCart={addToCart}
            addButtonRef={addButtonRef}
          />
        </div>
        <p className="mt-5 text-center text-[9px] leading-relaxed text-[#231F20]/45">
          Product, sourcing, reviews, and price details are storefront preview data and should be
          confirmed before sale.
        </p>
      </section>

      <ProductStorySections product={product} />

      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E7D6B8] bg-[#F9F6F0]/95 p-3 shadow-[0_-8px_30px_rgba(35,31,32,0.12)] backdrop-blur-md"
          >
            <div className="mx-auto flex max-w-7xl items-center gap-3 px-1 sm:px-5">
              <img
                src={product.image}
                alt=""
                className="h-12 w-10 shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-editorial text-lg font-medium text-[#231F20]">
                  {product.name}
                </p>
                <p className="truncate text-[10px] text-[#231F20]/60">
                  {selectedVariant.label} · {formatINR(price)}
                  {price * quantity >= FREE_SHIPPING_THRESHOLD ? ' · Free shipping' : ''}
                </p>
              </div>
              <button
                type="button"
                onClick={addToCart}
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#C86D1F] px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#231F20] sm:px-5 sm:text-[10px]"
              >
                <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
                Add to Cart
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
